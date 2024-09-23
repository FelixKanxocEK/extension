import { Controller, Get } from '@nestjs/common';
import { CdrService } from './cdr.service';

@Controller('cdr')
export class CdrController {
  constructor(private readonly CdrService: CdrService) {}

  @Get()
  async find() {
    const response = await this.CdrService.find();

    if(response) {
      return response;
    } else {
      return [];
    }
  } 
}
