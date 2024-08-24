/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { GetJobListReqDto, GetJobListResDto } from './dto/get-job.dto';
import type { Job } from './entities/jobs';
import { CoreService } from '@core/service/core.service';
import { RedisCacheService } from '@core/service/cache.service';

@Injectable()
export class JobsService {
  constructor(
    private readonly coreService: CoreService,
    private readonly cacheService: RedisCacheService
  ) {}

  async findAll(params: GetJobListReqDto): Promise<GetJobListResDto> {
    const {
      description_inc,
      job_type,
      location,
      page = 1,
      per_page = 7,
    } = params;
    let result: Job[] = [];

    const isExistData = await this.cacheService.getValue(
      `jobs:${page}-${per_page}:${job_type}-${location}-${description_inc}`
    );

    if (isExistData) return JSON.parse(isExistData);

    result = await this.coreService.jobsLookup();

    result = result.filter((item) => {
      if (
        description_inc &&
        !`${item.description}+${item.title}+${item.company}`
          ?.toLowerCase()
          .includes(description_inc.toLowerCase())
      ) {
        return;
      }

      if (job_type && !(item.type === job_type)) {
        return;
      }

      if (
        location &&
        !item.location?.toLowerCase().includes(location.toLowerCase())
      ) {
        return;
      }

      delete item.description;
      delete item.how_to_apply;
      delete item.company_logo;

      return item;
    });

    if (result.length === 0) {
      throw new NotFoundException('Pekerjaan yang anda cari tidak tersedia.');
    }

    if (page * per_page - per_page > result.length) {
      throw new BadRequestException('Halaman melewati batas maksimal data.');
    }

    const data: GetJobListResDto = {
      data: result.slice(
        page * per_page - per_page,
        page * per_page < result.length ? page * per_page : result.length
      ),
      meta: {
        currentPage: page,
        pageSize: per_page,
        total: result.length,
        totalPage: Math.ceil(result.length / per_page),
      },
    };

    await this.cacheService.save(
      `jobs:${page}-${per_page}:${job_type}-${location}-${description_inc}`,
      JSON.stringify(data),
      2 * 60 * 60 * 1000
    );

    return data;
  }

  async findOne(id: string): Promise<Job> {
    return await this.coreService.jobsDetail(id);
  }
}
