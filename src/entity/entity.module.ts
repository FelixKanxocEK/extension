import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OmbuExtensions } from './ombutel_extensions.entity';
import { OmbuContacts } from './ombutel_contacts.entity';

@Global()
@Module({
    imports:[
        TypeOrmModule.forFeature([
            OmbuExtensions,
            OmbuContacts
        ])
    ],
    exports: [TypeOrmModule]
})
export class EntityModule {}
