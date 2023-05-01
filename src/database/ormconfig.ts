import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import * as allEntities from '@root/entities';

const entities = Object.values(allEntities).filter((entity) => entity);
const getDbSource = () => {
  const { DB_CONNECTION_NAME } = process.env;

  switch (DB_CONNECTION_NAME) {
    case 'test':
      return {
        type: 'sqlite',
        database: './db.sql',
        keepConnectionAlive: true,
        entities,
        migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
        cli: {
          migrationsDir: 'src/database/migrations',
        },
      } as SqliteConnectionOptions;
    case 'gcp':
      return {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as number,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        keepConnectionAlive: true,
        entities,
        migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
        migrationsRun: true,
        cli: {
          migrationsDir: 'src/database/migrations',
        },
        extra: {
          max: 10,
        },
      } as PostgresConnectionOptions;
    default:
      return {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        // @ts-ignore
        port: process.env.DB_PORT as number,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        keepConnectionAlive: true,
        entities,
        migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
        cli: {
          migrationsDir: 'src/database/migrations',
        },
      } as PostgresConnectionOptions;
  }
};

export default new DataSource(getDbSource());
