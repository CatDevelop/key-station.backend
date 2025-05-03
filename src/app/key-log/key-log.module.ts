import { Module } from '@nestjs/common';
import { KeyLogService } from './key-log.service';
import { KeyLogController } from './key-log.controller';

@Module({
  controllers: [KeyLogController],
  providers: [KeyLogService],
})
export class KeyLogModule {}
