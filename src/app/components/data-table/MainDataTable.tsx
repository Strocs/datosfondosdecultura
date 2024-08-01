import { DataTable } from '@/components/data-table/DataTable'
import { columns } from '@/app/components/data-table/columns'
import { filters } from '@/app/components/data-table/filters'
import { getProjects } from '@/services/projectService'

export async function GeneralDataTable () {
  // let origin = getBaseUrl()
  // const res = await fetch(`${origin}/api/v1/projects`, {
  //   cache: 'force-cache'
  // })

  // const { data }: APIResponse<Project[]> = await res.json()

  const { projects: data } = await getProjects()

  return <DataTable columns={columns} data={data} filters={filters} />
}
