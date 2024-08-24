'use client';

import * as React from 'react';

import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import type { DateRange, SelectRangeEventHandler } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateRangePickerProps
  extends React.ComponentPropsWithoutRef<typeof PopoverContent> {
    
  /**
   * Default value range date.
   * @default undefined
   * @type DateRange
   * @example { from: new Date(), to: new Date() }
   */
  defaultRange?: DateRange;

  /**
   * The number of days to display in the date range picker.
   * @default undefined
   * @type number
   * @example 7
   */
  dayCount?: number;

  /**
   * The placeholder text of the calendar trigger button.
   * @default "Pick a date"
   * @type string | undefined
   */
  placeholder?: string;

  /**
   * The variant of the calendar trigger button.
   * @default "outline"
   * @type "default" | "outline" | "secondary" | "ghost"
   */
  triggerVariant?: Exclude<ButtonProps['variant'], 'destructive' | 'link'>;

  /**
   * The size of the calendar trigger button.
   * @default "default"
   * @type "default" | "sm" | "lg"
   */
  triggerSize?: Exclude<ButtonProps['size'], 'icon'>;

  /**
   * The class name of the calendar trigger button.
   * @default undefined
   * @type string
   */
  triggerClassName?: string;

  /**
   * The class name of the calendar trigger button.
   * @default undefined
   * @type Date
   */
  min?: Date;

  /**
   * The class name of the calendar trigger button.
   * @default undefined
   * @type Date
   */
  max?: Date;

  /**
   * The class name of the calendar trigger button.
   * @default undefined
   * @type (DatePicker) => void
   */
  onSelectRange?: SelectRangeEventHandler;
}

export function DateRangePicker({
  defaultRange = {
    from: addDays(new Date(), -2),
    to: new Date(),
  },
  placeholder = 'Pick a date',
  triggerVariant = 'outline',
  triggerSize = 'default',
  triggerClassName,
  className,
  onSelectRange,
  min,
  max,
  ...props
}: DateRangePickerProps) {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={cn(
              'w-full justify-start truncate text-left font-normal',
              !defaultRange && 'text-muted-foreground',
              triggerClassName
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {defaultRange?.from ? (
              defaultRange.to ? (
                <>
                  {format(defaultRange.from, 'LLL dd, y')} -{' '}
                  {format(defaultRange.to, 'LLL dd, y')}
                </>
              ) : (
                format(defaultRange.from, 'LLL dd, y')
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-auto p-0', className)} {...props}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={defaultRange?.from}
            selected={defaultRange}
            onSelect={onSelectRange}
            numberOfMonths={2}
            fromDate={min}
            toDate={max}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
