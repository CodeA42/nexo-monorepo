import { INestApplication, LoggerService } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'body-parser';
import helmet from 'helmet';
import * as basicAuth from 'express-basic-auth';

import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { name, version } from 'package.json';

type level = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

const ALLOWED_LOG_LEVELS: level[] = ['error', 'warn', 'info', 'debug'];

const BODY_JSON_LIMIT = '50mb';

const getLogLevel = (): level => {
  const logLevel = process.env.DD_LOG_LEVEL;

  const level = ALLOWED_LOG_LEVELS.find((level) => {
    return level === logLevel;
  });

  return level || 'info';
};

export const setupLogger = (): LoggerService => {
  const consoleLogFormat =
    process.env.NODE_ENV === 'development'
      ? winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike(),
        )
      : winston.format.combine(winston.format.uncolorize(), winston.format.timestamp(), winston.format.ms());

  return WinstonModule.createLogger({
    level: getLogLevel(),
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({
        format: consoleLogFormat,
      }),
    ],
  });
};

const setupSwaggerDocGeneration = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(`${name} API documentation`)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);
};

const setupCors = (app: INestApplication): void => {
  const origin =
    process.env.NODE_ENV === 'production' ? [/\.nexoprod\.com$/] : [/localhost:\d{4}$/, /127.0.0.1:\d{4}$/];

  app.enableCors({
    origin,
    exposedHeaders: ['Content-Disposition'],
  });
};

const setupHelmet = (app: INestApplication): void => {
  app.use(helmet());
};

const setupJSONBodyParser = (app: INestApplication): void => {
  app.use(json({ limit: BODY_JSON_LIMIT }));
};

export const configureApp = (app: INestApplication): void => {
  setupHelmet(app);
  setupCors(app);
  app.setGlobalPrefix('/api');
  app.use(
    ['/docs'],
    basicAuth.default({
      challenge: true,
      users: {
        [process.env.SWAGGER_USERNAME as string]: process.env.SWAGGER_PASSWORD as string,
      },
    }),
  );
  setupSwaggerDocGeneration(app);
  setupJSONBodyParser(app);
};
