/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JobsService } from './jobs.service';
import type { GetJobListReqDto, GetJobListResDto } from './dto/get-job.dto';
import { JwtAuthGuard } from '@core/guards';
import { Job } from './entities/jobs';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: GetJobListReqDto): Promise<GetJobListResDto> {
    return await this.jobsService.findAll(query);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Job> {
    return await this.jobsService.findOne(id);
  }
}
