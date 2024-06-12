import { patchNestJsSwagger } from 'nestjs-zod';
import { LoggerService } from '@nestjs/common';
import { configureApp, setupLogger } from './core/configureApp';
import { createApp } from './core/createApp';

const setUnhandledRejectionHandler = (logger: LoggerService): void => {
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled rejection: ${reason}`, promise);
  });
};

// Extending swagger to work with zod schemas
patchNestJsSwagger();

async function bootstrap(port: number): Promise<void> {
  const logger = setupLogger();
  const app = await createApp(logger);

  configureApp(app);

  await app.listen(port);
  setUnhandledRejectionHandler(logger);
}

const DEFAULT_PORT = 4000;

bootstrap(Number(process.env.NEXO_TRANSACTION_WATCHER_PORT) || DEFAULT_PORT);
