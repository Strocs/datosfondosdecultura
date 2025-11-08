import { DataTable } from '@/components/data-table/data-table'
import { columns } from './columns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Chart } from './chart'
import { Chile } from '@/components/Chile'
import { Header } from '@/components/Header'
import { getByQuery } from '@/lib/db'

export default async function ProjectsPage() {
  const { rows: data } = await getByQuery('SELECT * FROM projects')

  const year = data[0].project_year

  return (
    <>
      <Header />
      <main className='mx-auto pb-96'>
        {/* SIDEBAR */}
        {/* <aside className='sticky top-4 h-[calc(100dvh-2rem)] w-full max-w-xs rounded-xl border bg-background'></aside> */}

        <div className='fixed top-0 right-0 z-10 py-[--padding-y] pr-20 [--padding-y:1rem]'>
          <Chile className='h-[calc(100vh-(var(--padding-y)*2))]' />
        </div>
        <div className='w-9/12 p-4'>
          {/* CHARTS */}
          <section className='flex gap-4'>
            <Card className='max-w-fit text-center'>
              <CardHeader>
                <CardTitle>Monto Total</CardTitle>
                <CardDescription>Para proyectos seleccionados</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-xl font-bold'>'mucho'</p>
              </CardContent>
            </Card>
            <Chart />
          </section>

          {/* DATA TABLE */}
          <DataTable columns={columns} data={data} />
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}
