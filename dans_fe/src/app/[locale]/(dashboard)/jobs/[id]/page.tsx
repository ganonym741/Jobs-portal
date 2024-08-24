'use client';

import Image from 'next/image';

import { useRouter } from 'next/navigation';

import { ArrowLeftIcon } from 'lucide-react';

import { useJobDetails } from '@/query/query/jobs.query';
import { decodeHtml } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const JobDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data } = useJobDetails(params.id);

  return (
    <div className="py-[30px] px-5 md:px-[50px]">
      <div className="flex flex-column h-[40px] w-full justify-start gap-1 items-center mb-8">
        <ArrowLeftIcon
          width={50}
          height={32}
          className="hover:cursor-pointer"
          onClick={() => router.back()}
        />
        <b className="hover:cursor-pointer">Back</b>
      </div>

      <div id="title" className="mb-4">
        <h1 className="text-2xl font-bold">{`${data?.company}`}</h1>
        <p className="text-sm text-gray-600">{`${data?.type} / ${data?.location}`}</p>
      </div>
      <Separator className='my-6 border' />

      <div id="content" className="flex flex-row gap-[20px] md:flex-column">
        <div id="description" className="flex-2">
          <div
            dangerouslySetInnerHTML={{
              __html: `${data?.description}`,
            }}
          />
        </div>
        <div id="summary" className="flex-1 md:max-w-[400px]">
          <Card className="border border-[5px] rounded-md text-center h-fit truncate mb-3">
            <div className="flex flex-column justify-between items-center border border-b-[3px] p-3 [&>*]:w-fit">
              <CardTitle>{data?.company}</CardTitle>
              <Badge className='hover:cursor-pointer'>{`1 Other Jobs`}</Badge>
            </div>
            <CardContent className='p-3 text-left'>
              <div className='relative w-full h-[80px] mb-3'><Image
                src={data?.company_logo ?? ''}
                alt={'company-logo'}
                fill
                className="mx-auto mb-4 bg-muted"
              /></div>
              <a
                href={data?.company_url}
                className="text-blue-500 hover:underline"
              >{`${data?.company_url}`}</a>
            </CardContent>
          </Card>
          <Card className="border border-[5px] rounded-md">
            <CardHeader className='border border-b-[3px] p-3'>
              <CardTitle>How to Apply</CardTitle>
            </CardHeader>
            <CardContent
            className='p-3 truncate text-wrap'
              dangerouslySetInnerHTML={{
                __html: decodeHtml(data?.how_to_apply ?? ''),
              }}
            ></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
