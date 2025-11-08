import type { Metadata } from 'next'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { Geist, Geist_Mono } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

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
          geist.variable,
          geistMono.variable,
          'relative px-2 font-sans md:px-0',
        )}>
        {children}
      </body>
    </html>
  )
}
