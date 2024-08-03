import { Module } from '@nestjs/common';
import { CustomConfigsModule2 } from './modules/config/config2.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbConfig2 } from './config/typeorm2.config';

@Module({
  imports: [
    CustomConfigsModule2,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDbConfig2,
      inject: [TypeOrmDbConfig2],
    }),
  ],
  controllers: [],
  providers: [TypeOrmDbConfig2],
})
export class AppModule {}
