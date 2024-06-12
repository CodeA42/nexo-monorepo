import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) dotenv.config();

const sharedConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
} as const;

const productionConfiguration = {
  ...sharedConfig,
  migrations: ['dist/apps/transaction-watcher/migrations/*.js'],
};

const nonProductionConfiguration = {
  ...sharedConfig,
  entities: ['apps/transaction-watcher/src/**/*.entity.ts', 'libs/nexo/**/*.entity.ts'],
  migrations: ['apps/transaction-watcher/migrations/*.ts'],
};

const configuration: DataSourceOptions = isProduction ? productionConfiguration : nonProductionConfiguration;

export const dataSource = new DataSource(configuration);
