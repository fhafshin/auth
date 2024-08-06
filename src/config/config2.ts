import { registerAs } from '@nestjs/config';

export enum configKeys {
  App = 'App',
  Db = 'Db',
  Jwt = 'Jwt',
}

const AppConfig = registerAs(configKeys.App, () => ({
  port: 3000,
}));

const JwtConfig = registerAs(configKeys.Jwt, () => ({
  accessTokenJwt: '2c5c2b5dacee8986547f7a5aaa2798befb2a1e86',
  refreshTokenJwt: '02ed1ecab86fa88ec25ad65d048f8c4b59208b8f',
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

export const configurations = [AppConfig, DbConfig, JwtConfig];
