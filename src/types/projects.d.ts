export interface DB<T> {
  lastUpdate: string
  data: T
}

export interface Project {
  id: number,
  region: Region,
  year: number,
  folio: number,
  line: Line,
  projectName: string,
  projectOwner: string,
  amountAssigned: number,
  status: string,
  type: Type
}

export interface Type {
  id: string,
  name: string
}

export interface Line {
  id: string,
  name: string,
  modality: string
}

export interface Region {
  id: string,
  shortName: string,
  name: string
  abbr?: string
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