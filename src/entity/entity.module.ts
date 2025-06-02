import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OmbuExtensions } from './ombutel_extensions.entity';
import { OmbuContacts } from './ombutel_contacts.entity';
import { SipAssword } from './ombutel_sip_devices.entity';
import { OmbutelCosts } from './ombutel_costs.entity';

@Global()
@Module({
    imports:[
        TypeOrmModule.forFeature([
            OmbuExtensions,
            OmbuContacts,
            SipAssword,
            OmbutelCosts,
        ])
    ],
    exports: [TypeOrmModule]
})
export class EntityModule {}
