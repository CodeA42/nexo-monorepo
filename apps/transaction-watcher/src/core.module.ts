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
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createCoreModule(getEnv: () => unknown) {
  @Global()
  @Module({
    imports: [
      ConfigModule.forRoot({
        load: [getEnv as ConfigFactory],
        validate: validate,
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        imports: [ConfigModule],
        useFactory: (configService: ConfigService<NexoTransactionWatcherConfiguration>) => ({
          type: 'postgres',
          database: configService.get('DATABASE_NAME'),
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          ssl: configService.get('DATABASE_SSL'),
          keepConnectionAlive: true,
          // if you want to run the migrations locally, please use npx nx migration:run transaction-watcher
          migrations: [path.join(__dirname, 'migrations/*.js')],
          // if you want to run the migrations locally, please use npx nx migration:run transaction-watcher
          migrationsRun: configService.get('DATABASE_MIGRATION_RUN') || false,
          synchronize: false,
          autoLoadEntities: true,
          logging: configService.get('DATABASE_LOGGING') || false,
        }),
      }),
      HttpModule,
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
