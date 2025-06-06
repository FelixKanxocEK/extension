import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SipAssword } from 'src/entity/ombutel_sip_devices.entity';
import { Repository } from 'typeorm';


@Injectable()
export class SipasswordService {
    constructor(
        @InjectRepository(SipAssword) private readonly OmbuSipserviceRepository: Repository<SipAssword> 
    ){}
    async find(){
        try{
            return await this.OmbuSipserviceRepository.find();
        }catch (error){
            return []
        }
    }
}
