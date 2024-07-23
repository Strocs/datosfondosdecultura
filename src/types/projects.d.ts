export interface DB<T> {
  id: string
  lastUpdate: string
  length: number
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
  short_name: string,
  alt_name?: string
  name: string
}

export interface ProjectResponse {
  length: number,
  page: number,
  limit: number,
  data: Project[],
  next?: string,
  prev?: string
}