import { DataTable } from '@/components/data-table/DataTable'
import { ModeToggle } from '@/components/ModeToggle'
import { columns } from './columns'
import { filters } from './filters'
import { getProjects } from '@/services/projectService'

export default async function ProjectsPage () {
  const { projects: data } = await getProjects()
  return (
    <main className='container mx-auto border my-16 py-6 px-4 md:px-6 rounded-xl'>
      <header className='flex justify-between'>
        <div>
          <h2 className='font-bold text-2xl'>Lista de Proyectos</h2>
          <p className='text-muted-foreground'>
            Fondart Regional y Nacional - Año 2024
          </p>
        </div>
        <ModeToggle />
      </header>
      <DataTable columns={columns} data={data} filters={filters} />
    </main>
  )
}
