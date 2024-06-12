import { Module, Logger, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createCoreModule } from './core.module';
import { HttpLoggerMiddleware } from './http-module/http-logger.middleware';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createAppModule(getEnv: () => unknown) {
  @Module({
    imports: [createCoreModule(getEnv), ConfigModule],
    controllers: [],
    providers: [Logger],
  })
  class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
      consumer.apply(HttpLoggerMiddleware).forRoutes('*');
    }
  }

  return AppModule;
}
