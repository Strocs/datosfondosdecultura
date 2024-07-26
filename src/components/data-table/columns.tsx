'use client'

import { Project } from '@/types/projects'
import { formatAmount } from '@/utils/formatAmount'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './DataTableColumnHeader'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'folio',
    meta: 'Folio',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Folio' />
    )
  },
  {
    accessorKey: 'year',
    meta: 'Año',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Año' />
    )
  },
  {
    accessorKey: 'projectName',
    meta: 'Nombre',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    )
  },
  {
    accessorKey: 'projectOwner',
    meta: 'Responsable',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Responsable' />
    )
  },
  {
    id: 'region',
    accessorKey: 'region.shortName',
    meta: 'Región',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Región' />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: 'type.name',
    meta: 'Fondo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fondo' />
    )
  },
  {
    accessorKey: 'line.name',
    meta: 'Línea',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Línea' />
    )
  },
  {
    accessorKey: 'line.modality',
    meta: 'Modalidad',
    header: ({ column }) => (
      <DataTableColumnHeader className='' column={column} title='Modalidad' />
    )
  },
  {
    accessorKey: 'status',
    meta: 'Estado',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Estado' />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue('status')

      return (
        <Badge
          className={cn('text-nowrap text-secondary dark:text-primary', {
            'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700':
              status === 'Selección',
            'bg-neutral-400 hover:bg-neutral-500 dark:bg-neutral-600 dark:hover:bg-neutral-700':
              status === 'Lista de Espera'
          })}
        >
          {status}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'amountAssigned',
    meta: 'Monto',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Monto' />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amountAssigned'))
      if (!amount) return <div>-</div>

      const formatted = formatAmount(amount)
      return <div>{formatted}</div>
    }
  }
]
