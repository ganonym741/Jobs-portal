import request from '../base/axios';
import type { GetManyJobsReqDto, GetManyJobsResDto, Job } from '../dto/jobs.dto';

const Jobs = {
  getManyJobs: (params?: GetManyJobsReqDto):Promise<GetManyJobsResDto> => {
    const queryParams = [
      params?.page ? `page=${params.page}` : '',
      params?.per_page ? `per_page=${params.per_page}` : '',
      params?.description_inc
        ? `description_inc=${params.description_inc}`
        : '',
      params?.job_type ? `job_type=${params.job_type}` : '',
      params?.location ? `location=${params.location}` : '',
    ]
      .filter(Boolean)
      .join('&');

    return request.get(`/jobs${queryParams ? `?${queryParams}` : ''}`).then((res) => res);
  },
  getDetailJob: (id: string): Promise<Job> => request.get(`/jobs/${id}`).then((res) =>{ console.log(res);

return res.data}),
};

export default Jobs;
