import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
@Injectable()
export class TypeOrmDbConfig2 implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      port: this.configService.get('Db.port'),
      host: this.configService.get('Db.host'),
      database: this.configService.get('Db.database'),
      username: this.configService.get('Db.username'),
      password: this.configService.get('Db.password'),
      synchronize: this.configService.get('Db.synchronize'),
    };
  }
}
