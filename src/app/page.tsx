import { DataTable } from '@/components/ui/data-table/DataTable'
import { columns } from '@/components/data-table/columns'
import { APIResponse, Project } from '@/types/projects'

export default async function Home () {
  const res = await fetch(
    'https://fondart-app.vercel.app/api/v1/projects?limit=1570',
    {
      cache: 'force-cache'
    }
  )
  const { data: projects }: APIResponse<Project[]> = await res.json()

  return (
    <main className='w-full p-16 mx-auto'>
      <DataTable columns={columns} data={projects} />
    </main>
  )
}
