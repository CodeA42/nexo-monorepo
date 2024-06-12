import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { createAppModule } from '../app.module';

export const createApp = async (logger: NestApplicationOptions['logger']): Promise<INestApplication> => {
  const AppModule = createAppModule(() => process.env);

  return await NestFactory.create(AppModule, {
    logger,
  });
};
