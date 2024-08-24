import type { UUID } from "crypto";

import type { ApiResponse } from "@/types";

export enum JOB_TYPE {
  fulltime = 'Full Time',
  parttime = 'Part Time',
}

export interface Job {
  id: UUID;
  type: JOB_TYPE;
  url: string;
  company: string;
  company_url?: string;
  location?: string;
  title: string;
  description?: string;
  how_to_apply: string;
  company_logo?: string;
  created_at: Date;
}

export interface GetManyJobsReqDto {
  page?: number;
  per_page?: number;
  description_inc?: string;
  location?: string;
  job_type?: JOB_TYPE;
}

export interface GetManyJobsResDto extends ApiResponse<Job[]> {}