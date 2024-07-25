import { ModeToggle } from '@/components/ModeToggle'
import { DataTable } from '@/components/data-table/DataTable'
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
    <main className='container mx-auto border my-16 py-6 rounded-xl'>
      <header className='flex justify-between'>
        <div>
          <h2 className='font-bold text-2xl'>Lista de Proyectos</h2>
          <p className='text-muted-foreground'>
            Fondart Regional y Nacional - Año 2024
          </p>
        </div>
        <ModeToggle />
      </header>
      <DataTable columns={columns} data={projects} />
    </main>
  )
}
