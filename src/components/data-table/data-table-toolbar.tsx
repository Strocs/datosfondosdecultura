import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'
import { Filter } from '@/types/projects'
import { DataTableViewOptions } from './data-table-view-Ootions'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filters?: Filter[]
}

export function DataTableToolbar<TData>({
  table,
  filters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-start justify-between py-4'>
      {' '}
      <div className='flex flex-1 flex-col md:flex-row md:items-start space-y-2 md:space-y-0 md:space-x-2'>
        <Input
          placeholder='Buscar proyecto'
          value={
            (table.getColumn('project_name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('project_name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        {filters && (
          <div className='flex flex-1 items-center gap-2 flex-wrap'>
            {filters.map((filter) => {
              return (
                table.getColumn(filter.column) && (
                  <DataTableFacetedFilter
                    key={filter.column}
                    column={table.getColumn(filter.column)}
                    title={filter.title}
                    options={filter.options}
                  />
                )
              )
            })}
            {isFiltered && (
              <Button
                variant='ghost'
                onClick={() => table.resetColumnFilters()}
                className='h-8 px-2 lg:px-3'
              >
                Reset
                <Cross2Icon className='ml-2 h-4 w-4' />
              </Button>
            )}
          </div>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
