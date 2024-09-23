import { Module } from '@nestjs/common';
import { CdrService } from './cdr.service';
import { CdrController } from './cdr.controller';

@Module({
  controllers: [CdrController],
  providers: [CdrService],
})
export class CdrModule {}
