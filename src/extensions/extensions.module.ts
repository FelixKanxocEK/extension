import { Module } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { ExtensionsController } from './extensions.controller';
import { EntityModule } from 'src/entity/entity.module';
import { CdrService } from 'src/cdr/cdr.service';

@Module({
  imports: [EntityModule],
  controllers: [ExtensionsController],
  providers: [ExtensionsService, CdrService],
})
export class ExtensionsModule {}
