'use client'

import { formatAmount } from '@/utils/formatAmount'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '../../../components/data-table/DataTableColumnHeader'
import { Badge } from '../../../components/ui/badge'
import { cn } from '@/lib/utils'
import { Project } from '@/types/projects'

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'project_id',
    meta: 'Folio',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Folio' />
    )
  },
  {
    accessorKey: 'project_year',
    meta: 'Año',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Año' />
    )
  },
  {
    accessorKey: 'project_name',
    meta: 'Nombre',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre' />
    )
  },
  {
    accessorKey: 'project_owner',
    meta: 'Responsable',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Responsable' />
    )
  },
  {
    id: 'region',
    accessorKey: 'region.region_name',
    meta: 'Región',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Región' />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    id: 'fund',
    accessorKey: 'fund.fund_name',
    meta: 'Fondo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fondo' />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    id: 'line',
    accessorKey: 'line.line_name',
    meta: 'Línea',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Línea' />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: 'modality',
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
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: 'amount_assigned',
    meta: 'Monto',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Monto' />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount_assigned'))
      if (!amount) return <div>-</div>

      const formatted = formatAmount(amount)
      return <div>{formatted}</div>
    }
  }
]
