import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OmbuContacts } from 'src/entity/ombutel_contacts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(OmbuContacts) private readonly OmbuContacsRepository: Repository<OmbuContacts>
    ){}

    async find(){
        try {
            return await this.OmbuContacsRepository.find();
        } catch (error) {
            return[]
        }
    }
}
