import { prismaLocal as prisma } from "@/lib/prisma"
import { Filter } from "@/types/projects"


const regions = await prisma.regions.findMany({
  select: {
    region_name: true,
    region_abbr: true
  }
})

const funds = await prisma.funds.findMany({
  select: {
    fund_name: true
  }
})

const status = [
  {
    value: 'Selección',
    label: 'Selección'
  },
  {
    value: 'Lista de Espera',
    label: 'Lista de Espera'
  },
]

const lines = await prisma.lines.findMany({
  select: {
    line_name: true
  }
})

export const filters: Filter[] = [
  {
    column: 'region',
    title: 'Región',
    options: regions.map((item) => ({ value: item.region_name, label: item.region_abbr }))
  },
  {
    column: 'fund',
    title: 'Fondo',
    options: funds.map((item) => ({ value: item.fund_name, label: item.fund_name }))
  },
  {
    column: 'line',
    title: 'Línea',
    options: lines.map((item) => ({ value: item.line_name, label: item.line_name.slice(6) }))
  },
  {
    column: 'status',
    title: 'Estado',
    options: status
  }
]