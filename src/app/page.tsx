import { ModeToggle } from '@/components/ModeToggle'
import { DataTable } from '@/components/data-table/DataTable'
import { columns } from '@/components/data-table/columns'
import { APIResponse, Project } from '@/types/projects'
import { getBaseUrl } from '@/utils/getBaseUrl'

export default async function Home () {
  let origin = getBaseUrl()
  const res = await fetch(`${origin}/api/v1/projects`, {
    cache: 'force-cache'
  })

  const { data }: APIResponse<Project[]> = await res.json()

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
      <DataTable columns={columns} data={data} />
    </main>
  )
}
