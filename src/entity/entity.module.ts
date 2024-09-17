import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OmbuExtensions } from './ombutel_extensions.entity';

@Global()
@Module({
    imports:[
        TypeOrmModule.forFeature([
            OmbuExtensions
        ])
    ],
    exports: [TypeOrmModule]
})
export class EntityModule {}
