'use client'

import { Project } from '@/types/projects'
import { formatAmount } from '@/utils/formatAmount'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '../ui/data-table/DataTableColumnHeader'

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
    accessorKey: 'region.name',
    meta: 'Región',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Región' />
    )
  },
  {
    accessorKey: 'type.name',
    meta: 'Tipo de Fondo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tipo de Fondo' />
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
    meta: 'Modalidad / Submodalidad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Modalidad / Submodalidad' />
    )
  },
  {
    accessorKey: 'status',
    meta: 'Estatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Estatus' />
    )
  },
  {
    accessorKey: 'amountAssigned',
    meta: 'Monto Asignado',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Monto Asignado' />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amountAssigned'))
      const formatted = formatAmount(amount)

      return <div>{formatted}</div>
    }
  }
]
