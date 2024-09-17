import { Controller, Get } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';

@Controller('extensions')
export class ExtensionsController {
  constructor(private readonly ExtensionsService: ExtensionsService) {}

  @Get()
  async find(){
    return this.ExtensionsService.find()
  }
  // @Get('test')
  // async findtest(){
  //   return this.ExtensionsService.find()
  // }
}
