export const Title = () => {
  return (
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
        <strong>Ministerio de las Culturas, las Artes y el Patrimonio</strong>
      </p>
    </section>
  )
}
