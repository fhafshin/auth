import { Module } from '@nestjs/common';
import { CustomConfigsModule2 } from './modules/config/config2.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbConfig2 } from './config/typeorm2.config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CustomConfigsModule2,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDbConfig2,
      inject: [TypeOrmDbConfig2],
    }),
    UserModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [],
  providers: [TypeOrmDbConfig2],
})
export class AppModule {}
