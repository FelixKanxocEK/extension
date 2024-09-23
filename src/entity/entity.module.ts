import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OmbuExtensions } from './ombutel_extensions.entity';
import { CdrAsterisk } from './cdr.entity';
@Global()
@Module({
    imports:[
        TypeOrmModule.forFeature([
            OmbuExtensions
        ], 'ombutel'),
        TypeOrmModule.forFeature([
            CdrAsterisk
        ], 'asterisk')
    ],
    exports: [TypeOrmModule]
})
export class EntityModule {}
