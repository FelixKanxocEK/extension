import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { EntityModule } from 'src/entity/entity.module';

@Module({
  imports: [EntityModule],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
