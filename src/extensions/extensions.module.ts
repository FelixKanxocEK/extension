import { Module } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { ExtensionsController } from './extensions.controller';
import { EntityModule } from 'src/entity/entity.module';

@Module({
  imports: [EntityModule],
  controllers: [ExtensionsController],
  providers: [ExtensionsService],
})
export class ExtensionsModule {}
