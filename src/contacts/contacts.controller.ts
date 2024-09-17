import { Controller, Get } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly ContactsService: ContactsService) {}

  @Get()
  async find(){
    return this.ContactsService.find();
  }
}
