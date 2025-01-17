import { DataTable } from '@/components/data-table/data-table'
import { columns } from './columns'
import { filters } from './filters'
import { getProjects } from '@/services/projectService'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatAmount } from '@/utils/formatAmount'
import { Chart } from './chart'
import { Chile } from '@/components/Chile'
import { Header } from '@/components/Header'

export default async function ProjectsPage() {
  const { projects: data } = await getProjects()

  const year = data[0].project_year
  const totalAmmount = data.reduce((acc, curr) => {
    return acc! + curr.amount_assigned!
  }, data[0].amount_assigned)

  return (
    <>
      <Header />
      <main className='mx-auto pb-96'>
        {/* SIDEBAR */}
        {/* <aside className='sticky top-4 h-[calc(100dvh-2rem)] w-full max-w-xs rounded-xl border bg-background'></aside> */}

        <div className='fixed right-0 top-0 z-10 py-[--padding-y] pr-20 [--padding-y:1rem]'>
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
                <p className='text-xl font-bold'>
                  {formatAmount(totalAmmount!)}
                </p>
              </CardContent>
            </Card>
            <Chart />
          </section>

          {/* DATA TABLE */}
          <DataTable columns={columns} data={data} filters={filters} />
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}
