import { LogoLink } from './LogoLink'
import { ModeToggle } from './ModeToggle'

export const Header = () => {
  return (
    <header className='px-4 h-24 flex justify-between'>
      <LogoLink />
      <div className='flex gap-4 items-center'>
        <ModeToggle />
      </div>
    </header>
  )
}
