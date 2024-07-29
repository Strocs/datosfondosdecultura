import { ModeToggle } from '@/components/ModeToggle'
import { GeneralDataTable } from './components/data-table/MainDataTable'

export default async function Home () {
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
      <GeneralDataTable />
    </main>
  )
}
