import { Regions } from "@prisma/client"

export interface JSONDatabase<T> {
  lastUpdate: string
  data: T
}

export type Project = Omit<Prisma.ProjectsGetPayload<{
  include: {
    fund: { select: { fund_name: true } },
    region: { select: { region_name: true } },
    line: { select: { line_name: true } },
  }
}>, 'fund_id' | 'region_id' | 'line_id'>;

export interface Region extends Regions {
  region_alt1?: string
  region_alt2?: string
}

export interface APIResponse<T> {
  data: T,
  pagination?: {
    total: number
    items_per_page: number,
    current_page: number,
    total_pages: number
    next_url: string | null,
    prev_url: string | null
  }
}

export interface Filter {
  column: string
  title: string
  options: {
    label: string
    value: string
    icon?: ComponentType<{ className?: string }>
  }[]
}