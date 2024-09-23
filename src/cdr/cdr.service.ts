import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CdrAsterisk } from 'src/entity/cdr.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CdrService {
    constructor(
        @InjectRepository(CdrAsterisk, 'asterisk') private readonly CdrAsteriskRepository: Repository<CdrAsterisk>
    ){}

    async find() {
        return await this.CdrAsteriskRepository.find({take: 10, order: {calldate: 'DESC'}}); 
    }
}
