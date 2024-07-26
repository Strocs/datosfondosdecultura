'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/data-table/DataTableViewOptions'
import { DataTableFacetedFilter } from '@/components/data-table/DataTableFacetedFilter'

const regions = [
  {
    value: 'Arica y Parinacota',
    label: 'Arica'
  },
  {
    value: 'Tarapacá',
    label: 'Tarapacá'
  },
  {
    value: 'Atacama',
    label: 'Atacama'
  },
  {
    value: 'Antofagasta',
    label: 'Antofagasta'
  },
  {
    value: 'Coquimbo',
    label: 'Coquimbo'
  },
  {
    value: 'Valparaíso',
    label: 'Valparaíso'
  },
  {
    value: 'Metropolitana de Santiago',
    label: 'Santiago'
  },
  {
    value: "Del Libertador Gral. Bernardo O'Higgins",
    label: "O'higgins"
  },
  {
    value: 'Maule',
    label: 'Maule'
  },
  {
    value: 'Ñuble',
    label: 'Ñuble'
  },
  {
    value: 'Biobío',
    label: 'Biobío'
  },
  {
    value: 'La Araucanía',
    label: 'Araucanía'
  },
  {
    value: 'Los Ríos',
    label: 'Los Ríos'
  },
  {
    value: 'Los Lagos',
    label: 'Los Lagos'
  },
  {
    value: 'Aysén',
    label: 'Aysén'
  },
  {
    value: 'Magallanes y de la Antártica Chilena',
    label: 'Magallanes'
  }
]

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData> ({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between py-4'>
      <div className='flex flex-1 flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2'>
        <Input
          placeholder='Buscar proyecto'
          value={
            (table.getColumn('projectName')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('projectName')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <div className='flex flex-1 items-center space-x-2'>
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('region')}
              title='Región'
              options={regions}
            />
          )}
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
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
