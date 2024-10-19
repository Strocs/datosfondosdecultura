import type { Metadata } from 'next'
import '@/styles/globals.css'
import { ThemeProvider } from '@/context/ThemeProvider'
import { cn } from '@/lib/utils'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Header } from '@/components/Header'

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
          'px-2 md:px-0 font-sans'
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div class='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_6rem]'></div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
