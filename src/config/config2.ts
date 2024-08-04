import { registerAs } from '@nestjs/config';

export enum configKeys {
  App = 'App',
  Db = 'Db',
}

const AppConfig = registerAs(configKeys.App, () => ({
  port: 3000,
}));

const DbConfig = registerAs(configKeys.Db, () => ({
  port: 5432,
  type: 'postgres',
  username: 'postgres',
  password: '123456',
  host: 'localhost',
  database: 'auth',
  entities: ['dist/**/**/**/*.entity.{ts,js}', 'dist/**/**/*.entity.{ts,js}'],
}));

export const configurations = [AppConfig, DbConfig];
