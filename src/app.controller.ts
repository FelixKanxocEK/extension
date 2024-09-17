import { All, Controller, NotFoundException } from '@nestjs/common';

@Controller()
export class AppController {

  @All()
  getHello(): string {
    throw new NotFoundException()
  }
}
