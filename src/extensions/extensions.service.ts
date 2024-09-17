import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OmbuExtensions } from 'src/entity/ombutel_extensions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExtensionsService {
    constructor(
        @InjectRepository(OmbuExtensions) private readonly OmbuExtensionsRepository: Repository<OmbuExtensions>
    ){}

    async find(){
        try {
            return await this.OmbuExtensionsRepository.find()
        } catch (error) {
            return[]
        }
    }
}
