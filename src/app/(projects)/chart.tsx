'use client'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { Bar, BarChart } from 'recharts'

const chartRegion = [
  { region: 'Arica', amount: 18993823 },
  { region: 'Atacama', amount: 1899383 },
  { region: 'Coquimbo', amount: 2898237 },
]

const chartConfig = {
  amount: {
    label: 'Monto',
    color: '#2564eb',
  },
  total: {
    label: 'Proyectos',
    color: '#60a5fa',
  },
} satisfies ChartConfig

export const Chart = () => {
  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className='min-h-[400px] w-fit rounded-md border bg-background shadow'>
        <BarChart accessibilityLayer data={chartRegion}>
          <Bar dataKey='amount' fill='var(--color-amount)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
