import { Controller, Get } from '@nestjs/common';
import { SipasswordService } from './sipassword.service';

@Controller('sipassword')
export class SipasswordController {
  constructor(private readonly SipasswordService: SipasswordService) {}

  @Get()
  async find(){
    return this.SipasswordService.find()
  }
  
}
