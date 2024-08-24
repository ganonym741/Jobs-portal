'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { formatDistanceToNow } from 'date-fns';

import { useForm } from 'react-hook-form';

import { Card } from '@/components/ui/card';
import { JOB_TYPE, type GetManyJobsReqDto } from '@/query/dto/jobs.dto';
import { useInfiniteJobsList } from '@/query/query/jobs.query';
import { Skeleton } from '@/components/ui/skeleton';
import type { JobsFilter } from '@/components/forms/filter-jobs';
import JobsFilterForm from '@/components/forms/filter-jobs';

const JobListPage = () => {
  const router = useRouter();

  const jobsForm = useForm<JobsFilter>();

  const [filter, setFilter] = useState<GetManyJobsReqDto>({
    page: 1,
    per_page: 7,
  });

  const { data, ...jobQueries } = useInfiniteJobsList(filter);

  const onFilter = () => {
    const { description_inc, job_type, location } = jobsForm.getValues();

    setFilter({
      page: 1,
      per_page: 7,
      description_inc: description_inc ?? undefined,
      job_type: job_type ? JOB_TYPE.fulltime : undefined,
      location: location ?? undefined,
    });
  };

  useEffect(() => {
    jobQueries.refetch();
  }, [filter]);

  return (
    <div className="py-[30px] px-5 md:px-[50px]">
      <div id="filter" className="flex flex-row md:flex-col ">
        <JobsFilterForm formJobFilter={jobsForm} onSubmit={onFilter} />
      </div>
      <div id="lists" className="border border-[5px] rounded-md py-4 px-[20px]">
        <div id="title" className="font-bold text-[24px] mb-[20px]">
          Job List
        </div>
        <ul className="mb-[20px]">
          {data?.pages
            .flatMap((jobs) => jobs.data)
            .map((job, index) => (
              <li
                key={index}
                className="py-2"
                onClick={() => router.push(`/jobs/${job?.id}`)}
              >
                <Card className="py-3 px-5 hover:bg-muted hover:cursor-pointer">
                  <div className="flex justify-between items-center h-full w-full">
                    <div>
                      <h2 className="font-bold text-secondary">{job?.title}</h2>
                      <p className="text-muted-foreground">
                        {job?.company} –{' '}
                        <span className="text-ring font-bold">{job?.type}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground font-semibold">
                        {job?.location}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {job?.created_at &&
                          formatDistanceToNow(new Date(job?.created_at), {
                            addSuffix: true,
                          })}
                      </p>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
        </ul>
        {jobQueries.isFetching ? (
          <Skeleton className="h-[30px] w-full" />
        ) : jobQueries.hasNextPage ? (
          <button
            onClick={() => jobQueries.fetchNextPage()}
            className="bg-primary w-full h-[40px] text-white font-semibold rounded-[8px]"
            disabled={jobQueries.isFetchingNextPage}
          >
            {'Load More'}
          </button>
        ) : (
          <center>Anda sudah sampai pada list terakhir</center>
        )}
      </div>
    </div>
  );
};

export default JobListPage;
