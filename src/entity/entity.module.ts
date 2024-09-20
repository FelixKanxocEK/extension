import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OmbuExtensions } from './ombutel_extensions.entity';
import { OmbuContacts } from './ombutel_contacts.entity';
import { SipAssword } from './ombutel_sip_devices.entity';

@Global()
@Module({
    imports:[
        TypeOrmModule.forFeature([
            OmbuExtensions,
            OmbuContacts,
            SipAssword,
        ])
    ],
    exports: [TypeOrmModule]
})
export class EntityModule {}
