import { Module } from '@nestjs/common';
import { SipasswordService } from './sipassword.service';
import { SipasswordController } from './sipassword.controller';
import { EntityModule } from 'src/entity/entity.module';

@Module({
  imports: [EntityModule],
  controllers: [SipasswordController],
  providers: [SipasswordService],
})
export class SipasswordModule {}
