import { LogoLink } from './LogoLink'

export const Header = () => {
  return (
    <header className='flex h-24 w-10/12 justify-between px-4'>
      <LogoLink />
      <div className='flex items-center gap-4'></div>
    </header>
  )
}
