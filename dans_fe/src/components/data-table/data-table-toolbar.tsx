'use client';

import * as React from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';

import type { DataTableFilterField } from '@/types/data-table';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface DataTableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  filterFields?: DataTableFilterField<TData>[];
}

export function DataTableToolbar<TData>({
  table,
  filterFields = [],
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    };
  }, [filterFields]);

  const [activeSearch, setActiveSearch] = React.useState<
    DataTableFilterField<TData>
  >(searchableColumns[0]);

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between space-x-2 overflow-auto p-1',
        className
      )}
      {...props}
    >
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length && (
          <div className="flex flex-row align-center justify-center gap-2 p-1 border border-1 rounded-[5px] bg-white dark:bg-gray h-8 w-45 lg:w-72">
            <Select
              value={activeSearch.value as string}
              onValueChange={(value: string) =>
                setActiveSearch(
                  searchableColumns.filter((item) => item.value === value)[0]
                )
              }
            >
              <SelectTrigger className={'h-full w-fit'}>
                <SelectValue placeholder="Search by:" />
              </SelectTrigger>
              <SelectContent>
                {searchableColumns.length > 0 &&
                  searchableColumns.map((searchItem) => (
                    <SelectItem
                      key={searchItem.value as string}
                      value={searchItem.value as string}
                    >
                      {searchItem.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Input
              key={String(activeSearch.value)}
              placeholder={activeSearch.placeholder}
              value={
                (table
                  .getColumn(String(activeSearch.value))
                  ?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table
                  .getColumn(String(activeSearch.value))
                  ?.setFilterValue(event.target.value)
              }
              className="w-full h-full border-none outline-none truncate"
            />
          </div>
        )}

        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.value ? String(column.value) : '') && (
                <DataTableFacetedFilter
                  key={String(column.value)}
                  column={table.getColumn(
                    column.value ? String(column.value) : ''
                  )}
                  title={column.label}
                  options={column.options ?? []}
                />
              )
          )}

        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <Cross2Icon className="ml-2 size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
