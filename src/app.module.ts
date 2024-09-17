import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm'
import { APP_FILTER } from '@nestjs/core';
import { EntityModule } from './entity/entity.module';
import { extensions } from 'pixi.js';
import { ExtensionsModule } from './extensions/extensions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '.development.env',
      isGlobal: true,
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,  //Carga las entidades automaticamente desde los .module        
        synchronize: false,               //Evita que la bd se modifique en base a los .entity       
        dateformat: 'yyyy-MM-dd HH:mm',
        dateStrings: true,
        connectTimeout: 30000,
        extra: {
          connectionLimit: 10,
          connectTimeout: 30000
        }
      }),
      inject: [ConfigService]
    }),
    EntityModule,
    ExtensionsModule
  ],
  controllers:[AppController],
  providers: [
    
  ]
})
export class AppModule { }
