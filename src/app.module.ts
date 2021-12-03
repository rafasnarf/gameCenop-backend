import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ItemsModule } from './modules/items/items.module';

import ormconfig = require('./config/ormconfig');

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig[0]),
    UsersModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
