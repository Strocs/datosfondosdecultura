import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ModeToggle'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Datos Fondos de Cultura',
  description:
    'Plataforma de análisis, comparación y búsqueda de proyectos seleccionados y en lista de espera de los Fondos de Cultura del Gobierno de Chile'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={cn(inter.className, 'px-2 md:px-0')}>
        <header className='container py-6 flex justify-between'>
          <h1 className='text-xl'>
            Datos <br />
            <strong className='text-3xl font-bold'>Fondos de Culturas</strong>
          </h1>
          <div className='flex items-center space-x-4'>
            <Button variant='link'>
              <Link href='/'>Inicio</Link>
            </Button>
            <Button variant='link'>
              <Link href='/proyectos'>Proyectos 2024</Link>
            </Button>
            <ModeToggle />
          </div>
        </header>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
