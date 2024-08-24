import type { UUID } from 'crypto';

import { ApiProperty } from '@nestjs/swagger';

export enum JOB_TYPE {
  fulltime = 'Full Time',
  parttime = 'Part Time',
}

export class Job {
  @ApiProperty({ example: 'uuid' })
  id: UUID;

  @ApiProperty({ example: 'Fulltype' })
  type: JOB_TYPE;

  @ApiProperty({ example: 'http://...' })
  url: string;

  @ApiProperty({ example: 'PT.Dans...' })
  company: string;

  @ApiProperty({ example: 'http://...' })
  company_url?: string;

  @ApiProperty({ example: 'Jakarta, 12770' })
  location?: string;

  @ApiProperty({ example: 'Backend Engineer' })
  title: string;

  @ApiProperty({ example: 'Description' })
  description?: string;

  @ApiProperty({ example: 'Text how to apply' })
  how_to_apply: string;

  @ApiProperty({ example: 'http://...' })
  company_logo?: string;

  @ApiProperty({ example: '2024-12-12T00:00:00.000Z' })
  created_at: Date;
}
