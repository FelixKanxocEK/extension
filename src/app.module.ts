import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm'
import { ExtensionsModule } from './extensions/extensions.module';
import { OmbuExtensions } from './entity/ombutel_extensions.entity';
import { CdrAsterisk } from './entity/cdr.entity';
import { CdrModule } from './cdr/cdr.module';
import { EntityModule } from './entity/entity.module';

const configService = new ConfigService;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '.development.env',
      isGlobal: true,
      expandVariables: true
    }),
    TypeOrmModule.forRoot({
      name: 'ombutel',
      type: 'mysql',
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),   
      host: configService.get<string>('DB_HOST'),
      dateStrings: true,
      synchronize: false,
      entities: [
        OmbuExtensions,
      ]
    }),
    TypeOrmModule.forRoot({
      name: 'asterisk',
      type: 'mysql',
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE_2'),   
      host: configService.get<string>('DB_HOST'),
      dateStrings: true,
      synchronize: false,
      entities: [
        CdrAsterisk,
      ]
    }),
    EntityModule,
    ExtensionsModule,
    CdrModule
  ],
  controllers:[AppController],
  providers: [
    
  ]
})
export class AppModule { }
