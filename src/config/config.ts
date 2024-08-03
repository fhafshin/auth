import { registerAs } from '@nestjs/config';

export enum ConfigKeys {
  App = 'App',
  Db = 'Db',
}

const AppConfig = registerAs(ConfigKeys.App, () => ({
  port: 3000,
}));

const DbConfig = registerAs(ConfigKeys.Db, () => ({
  port: 5432,
  host: 'localhost',
  username: 'postgres',
  password: '123456',
  database: 'auth',
}));

export const configurations = [AppConfig, DbConfig];
