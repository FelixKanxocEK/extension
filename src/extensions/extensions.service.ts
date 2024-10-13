import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extensions } from 'pixi.js';
import { CdrService } from 'src/cdr/cdr.service';
import { OmbuExtensions } from 'src/entity/ombutel_extensions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExtensionsService {
    constructor(
        @InjectRepository(OmbuExtensions, 'ombutel') private readonly OmbuExtensionsRepository: Repository<OmbuExtensions>,
        private readonly CdrService: CdrService
    ){}

    async find(){
        try {
            const extensions = await this.OmbuExtensionsRepository.find({relations: { contact: true }});

            const cdr = await this.CdrService.find();

            return {
                extensions,
                cdr,
            }
        } catch (error) {
            return {
                extensions: [],
                cdr: [],
            }
        }
    }
}
