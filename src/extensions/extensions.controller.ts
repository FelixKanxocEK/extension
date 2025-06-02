import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { DtoGetGeneralReportExit } from './dto/get_general_report_exit.dto';

@Controller('extensions')
export class ExtensionsController {
  constructor(private readonly ExtensionsService: ExtensionsService) {}

  @Get()
  async find(){
    return this.ExtensionsService.find()
  }

  @Post('/general_report_exit')
  async getGeneralReportExit(@Body() data: DtoGetGeneralReportExit) {
    return await this.ExtensionsService.getGeneralReportExit(data);
  }

  // @Get('test')
  // async findtest(){
  //   return this.ExtensionsService.find()
  // }
}
