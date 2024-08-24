'use client';
import * as z from 'zod';

import type { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

const formSchema = z.object({
  description_inc: z.string().optional(),
  job_type: z.boolean().optional(),
  location: z.string().optional(),
});

export type JobsFilter = z.infer<typeof formSchema>;

export type JobsFilterFormProps = {
  onSubmit: () => void;
  formJobFilter: UseFormReturn<JobsFilter>;
};

export default function JobsFilterForm({
  onSubmit,
  formJobFilter,
}: JobsFilterFormProps) {
  const {
    handleSubmit,
    setValue,
  } = formJobFilter;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={'w-full h-full flex flex-row md:flex-column gap-4 py-3 items-end'}
    >
      <div className='w-full'>
        <Label>Job Description</Label>
        <Input type="text" onChange={(e) => {
          setValue("description_inc", e.target.value)
        }} placeholder='Filter by Title, Benefits, Companise, or Expertise' />
      </div>
      <div className='w-full'>
        <Label>Location</Label>
        <Input type="text" onChange={(e) => {
          setValue("location", e.target.value)
        }} placeholder='Filter by City, State, Zip Code, or Country' />
      </div>
      <div className='flex flex-column items-center w-1/2 pb-1'>
        <input type='checkbox' onChange={(e) => setValue("job_type", e.target.checked)} className='w-[18px] h-[18px]'/>
        <label className='ml-3'>Full Time Only</label>
      </div>
      <Button className='w-1/2' type="submit">Search</Button>
    </form>
  );
}
