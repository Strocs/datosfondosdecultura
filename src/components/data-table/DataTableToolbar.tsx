'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/data-table/DataTableViewOptions'
import { DataTableFacetedFilter } from '@/components/data-table/DataTableFacetedFilter'

const regions = [
  {
    value: 'Región de Arica Y Parinacota',
    label: 'Arica'
  },
  {
    value: 'Región de Tarapacá',
    label: 'Tarapacá'
  },
  {
    value: 'Región de Atacama',
    label: 'Atacama'
  },
  {
    value: 'Región de Antofagasta',
    label: 'Antofagasta'
  },
  {
    value: 'Región de Coquimbo',
    label: 'Coquimbo'
  },
  {
    value: 'Región de Valparaíso',
    label: 'Valparaíso'
  },
  {
    value: 'Región Metropolitana de Santiago',
    label: 'Santiago'
  },
  {
    value: "Región del Libertador General Bernardo O'Higgins",
    label: "O'higgins"
  },
  {
    value: 'Región del Maule',
    label: 'Maule'
  },
  {
    value: 'Región de Ñuble',
    label: 'Ñuble'
  },
  {
    value: 'Región del Biobío',
    label: 'Biobío'
  },
  {
    value: 'Región de La Araucanía',
    label: 'Araucanía'
  },
  {
    value: 'Región de Los Ríos',
    label: 'Los Ríos'
  },
  {
    value: 'Región de Los Lagos',
    label: 'Los Lagos'
  },
  {
    value: 'Región de Aysén',
    label: 'Aysén'
  },
  {
    value: 'Región de Magallanes y de la Antártica Chilena',
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
      <div className='flex flex-1 items-center space-x-2'>
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
      <DataTableViewOptions table={table} />
    </div>
  )
}
