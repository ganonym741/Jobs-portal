import { ApiProperty } from '@nestjs/swagger';

import type { Job } from '../entities/jobs';
import type { Meta } from '@core/type/global.type';
import { JOB_TYPE } from '../entities/jobs';

export class GetJobListReqDto {
  @ApiProperty({ type: JOB_TYPE, example: 'Fulltime' })
  job_type?: JOB_TYPE;

  @ApiProperty({ example: 'ruby / java' })
  description_inc?: string;

  @ApiProperty({ example: 'Jakarta, 12770' })
  location?: string;

  @ApiProperty({ example: 1 })
  page?: number;

  @ApiProperty({ example: 10 })
  per_page?: number;
}

export class GetJobListResDto {
  @ApiProperty({ example: {} })
  data: Job[];

  @ApiProperty({ example: 10 })
  meta: Meta;
}
