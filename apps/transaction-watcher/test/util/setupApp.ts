import { HttpService } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import supertest from 'supertest';

import { ConfigModule } from '@nestjs/config';
import { configureApp } from '../../src/core/configureApp';

import { createAppModule } from '../../src/app.module';
import { NexoTransactionWatcherConfiguration, validate } from '@nexo-monorepo/nexo-transaction-watcher-api';
import { SetupServer } from 'msw/node';
import { setupMswServer } from '@nexo-monorepo/api';

export type SuperTestRequest = () => supertest.SuperTest<supertest.Test>;
interface CallbackParams {
  app: SuperTestRequest;
  nestApp: INestApplication;
  httpServiceMock: MockProxy<HttpService> | HttpService;
  mswServer: SetupServer;
}
type CallbackType = (params: CallbackParams) => Promise<unknown>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SuperTestResponse<T = any> = Omit<Awaited<supertest.Test>, 'body'> & { body: T };

interface MockSettings {
  shouldUseMockedHttp?: boolean;
  fixturesPath?: string;
}

const oldVariables: Record<string, string> = {};

const setupEnvVariables = async (envVariables: Partial<NexoTransactionWatcherConfiguration>): Promise<void> => {
  for (const [name, value] of Object.entries(envVariables)) {
    oldVariables[name] = String(value);
    process.env[name] = String(value);
  }
};

const resetEnvVariables = (envVariables: Partial<NexoTransactionWatcherConfiguration>) => {
  for (const name of Object.keys(envVariables)) {
    process.env[name] = oldVariables[name];
    delete oldVariables[name];
  }
};

const initNestApp = async ({ shouldUseMockedHttp = false }: MockSettings) => {
  const httpServiceMock = shouldUseMockedHttp ? mock<HttpService>() : new HttpService();

  const AppModule = createAppModule(() => process.env);

  const moduleFixture = Test.createTestingModule({
    imports: [ConfigModule.forRoot({ validate, ignoreEnvFile: true }), AppModule],
    providers: [{ provide: HttpService, useValue: httpServiceMock }],
  });

  const compiledModuleFixture = await moduleFixture.compile();

  const nestApp = compiledModuleFixture.createNestApplication();

  configureApp(nestApp);

  nestApp.useLogger(false);

  await nestApp.init();

  return {
    nestApp,
    httpServiceMock: httpServiceMock,
  };
};

const configureSupertest = (app: INestApplication): SuperTestRequest => {
  // After switching to Nodejs v20, integration tests were failing where simulateneous
  // requests were made with supertest E.g. Promise.all(supertestAssertions)
  // found a fix here https://github.com/ladjs/supertest/issues/709#issuecomment-1004883763
  app.listen(0);
  return supertest.bind(null, app.getHttpServer()) as SuperTestRequest;
};

/**
 * Prepares the app for integration tests.
 * The goal is to remove boilerplate code,
 * and ensures isolation between test cases.
 *
 * - Initializes a new instance of the application for every test case.
 * - Drops and re-creates the test database, and loads all fixtures.
 *
 * @param callback  defining the actual test case, which will receive
 *   a fully configured instance of supertest ready-to-use.
 */

export const setupApp = async (
  callback: CallbackType,
  env: Partial<NexoTransactionWatcherConfiguration> = {},
  mockSettings: MockSettings = {},
) => {
  // this needs to happen before initializing the app
  await setupEnvVariables(env);

  const { nestApp, ...mocks } = await initNestApp(mockSettings);

  const mswServer = setupMswServer();
  try {
    // set nest app and defaults for supertest
    const supertestWithConfig = configureSupertest(nestApp);

    // start test case and wait for it to finish
    await callback({
      app: supertestWithConfig,
      nestApp,
      ...mocks,
      mswServer,
    });
  } finally {
    await nestApp.close();

    mswServer.resetHandlers();
    mswServer.close();

    resetEnvVariables(env);
  }
};
