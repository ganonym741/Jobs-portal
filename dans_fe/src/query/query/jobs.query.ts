import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import type { GetManyJobsReqDto } from "../dto/jobs.dto";
import Jobs from "../service/jobs.service";

export const useInfiniteJobsList = (params: GetManyJobsReqDto) => {
  const {description_inc, job_type, location, per_page} = params;

  return useInfiniteQuery({
    queryKey: ['job-list', {description_inc, job_type, location, per_page}],
    queryFn: async ({pageParam=1}) => await Jobs.getManyJobs({...params, page: pageParam}),
    getNextPageParam: (lastPage, allPages) => (
      (lastPage.meta?.totalPage.toString() !== lastPage.meta?.currentPage) ? allPages.length + 1 : undefined
    ),
    initialPageParam: 1,
  });
};


export const useJobDetails = (id: string) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: async () => await Jobs.getDetailJob(id),
    staleTime: 60 * 60 * 3,
  });
};