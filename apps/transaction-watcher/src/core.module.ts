import { Global, Module } from '@nestjs/common';
import { ConfigFactory, ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpModule } from './http-module/http-module';
import {
  ExceptionFilter,
  NexoTransactionWatcherConfiguration,
  validate,
} from '@nexo-monorepo/nexo-transaction-watcher-api';
import { ZodValidationExceptionFilter } from '@nexo-monorepo/json-api-standard-api';
import { WatcherModule } from './watcher/watcher.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createCoreModule(getEnv: () => unknown) {
  @Global()
  @Module({
    imports: [
      ConfigModule.forRoot({
        load: [getEnv as ConfigFactory],
        validate: validate,
      }),
      HttpModule,
      WatcherModule,
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        imports: [ConfigModule],
        useFactory: (configService: ConfigService<NexoTransactionWatcherConfiguration>) => ({
          type: 'mongodb',
          url: configService.get('MONGO_URL'),
          autoLoadEntities: true,
        }),
      }),
    ],
    providers: [
      {
        provide: APP_FILTER,
        useClass: ExceptionFilter,
      },
      {
        provide: APP_FILTER,
        useValue: new ZodValidationExceptionFilter(),
      },
    ],
    exports: [],
  })
  class CoreModule {}

  return CoreModule;
}
