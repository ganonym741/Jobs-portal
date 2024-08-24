import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { CoreService } from '@core/service/core.service';
import { RedisCacheService } from '@/@core/service/cache.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30000,
    }),
  ],
  controllers: [JobsController],
  providers: [JobsService, CoreService, RedisCacheService],
})
export class JobsModule {}
