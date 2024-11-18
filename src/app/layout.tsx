import type { Metadata } from 'next'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const metadata: Metadata = {
  title: 'Datos Fondos de Cultura',
  description:
    'Plataforma de análisis, comparación y búsqueda de proyectos seleccionados y en lista de espera de los Fondos de Cultura del Gobierno de Chile',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          'relative px-2 font-sans md:px-0',
        )}>
        {/* <div className='fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_6rem]'></div> */}
        {children}
      </body>
    </html>
  )
}
