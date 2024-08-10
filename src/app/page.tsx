import { ModeToggle } from '@/components/ModeToggle'
import Link from 'next/link'

export default async function Home () {
  return (
    <>
      <header className='container py-6 flex justify-between'>
        <Link href='/' className='flex gap-1 items-center group'>
          <span className='overflow-hidden w-[1ch] group-hover:w-full text-5xl font-black transition-all duration-300 ease-in'>
            Datos
          </span>
          <p className='text-xl font-light leading-4 text-nowrap'>
            Fondos <i>de</i> <br />
            <span className='font-bold tracking-[0.175em]'>Cultura</span>
          </p>
        </Link>
        <div className='flex gap-4 items-center'>
          <nav>
            <Link href='/proyectos'>2024</Link>
          </nav>

          <ModeToggle />
        </div>
      </header>
      <main className='container h-full'>
        <section className='min-h-[60dvh] grid place-content-center'>
          <h1 className='text-center font-black text-8xl uppercase grid leading-[4.75rem] '>
            <span className='tracking-[0.15em] pl-[0.15em]'>Datos</span>
            <span className='text-4xl font-bold tracking-[0.615em] pl-[0.615em]'>
              Fondos de
            </span>
            <span className='tracking-tighter pr-[-0.05em]'>Cultura</span>
          </h1>
          <p className='text-center max-w-sm mx-auto py-2'>
            Análisis de los Fondos de Cultura del{' '}
            <strong>
              Ministerio de las Culturas, las Artes y el Patrimonio
            </strong>
          </p>
        </section>
        <section></section>
      </main>
    </>
  )
}
