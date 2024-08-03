import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
@Injectable()
export class TypeOrmDbConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      port: this.configService.get('Db.port'),
      host: this.configService.get('Db.host'),
      password: this.configService.get('Db.password'),
      username: this.configService.get('Db.username'),
      database: this.configService.get('Db.database'),
      synchronize: true,
    };
  }
}
