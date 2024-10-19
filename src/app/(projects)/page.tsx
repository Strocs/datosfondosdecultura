import { DataTable } from '@/components/data-table/data-table'
import { columns } from './columns'
import { filters } from './filters'
import { getProjects } from '@/services/projectService'

export default async function ProjectsPage() {
  const { projects: data } = await getProjects()
  return (
    <>
      <main className='flex gap-x-4 p-4 mx-auto pb-96'>
        {/* SIDEBAR */}
        <aside className='w-full bg-background sticky border rounded-xl top-4 h-[calc(100dvh-2rem)] max-w-xs'></aside>

        <div className='pt-96'>
          {/* CHARTS */}

          {/* DATA TABLE */}
          <DataTable columns={columns} data={data} filters={filters} />
        </div>
      </main>
    </>
  )
}
