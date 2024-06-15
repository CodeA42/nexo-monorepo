import { DataSource, DataSourceOptions } from 'typeorm';

const configuration: DataSourceOptions = {
  type: 'mongodb',
  url: process.env.MONGO_URL,
  entities: ['apps/transaction-watcher/src/**/*.entity.ts'],
};

export const dataSource = new DataSource(configuration);
