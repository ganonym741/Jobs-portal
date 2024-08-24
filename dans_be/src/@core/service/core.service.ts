/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  Injectable,
  InternalServerErrorException,
  Scope,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

import { RedisCacheService } from './cache.service';
import type { Job } from '@/jobs/entities/jobs';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class CoreService {
  private api: string = process.env.CORE_API;

  constructor(
    private readonly cacheService: RedisCacheService,
    private httpService: HttpService
  ) {}

  async jobsLookup(): Promise<Job[]> {
    const existingData = await this.cacheService.getValue('dans:job-list');

    if (existingData) return JSON.parse(existingData);

    const { data } = await firstValueFrom(
      this.httpService
        .get<Job[]>(`${this.api}/recruitment/positions.json`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new InternalServerErrorException(error.message);
          })
        )
    );

    const sortedJobList = data.sort((a, b) => a.id.localeCompare(b.id));

    await this.cacheService.save(
      'dans:job-list',
      JSON.stringify(sortedJobList),
      2 * 60 * 60 * 1000
    );

    return sortedJobList;
  }

  async jobsDetail(id: string): Promise<Job> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Job>(`${this.api}/recruitment/positions/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new InternalServerErrorException(error.message);
          })
        )
    );

    return data;
  }
}
