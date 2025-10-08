import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import * as entities from '../models';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
dotenvConfig();

export const dataSourceOption: Omit<
  DataSourceOptions,
  keyof PostgresConnectionOptions
> = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrationsTableName: 'migrations',
  migrations: ['src/database/migrations/**'],
  entities: [...Object.values(entities)],
  synchronize: false,
  seedTracking: true,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const dataSource = new DataSource(dataSourceOption as DataSourceOptions);
export default dataSource;
