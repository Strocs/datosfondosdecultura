'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { cn } from '@/lib/utils'

const themes = {
  light: {
    value: 'light',
    label: 'Claro'
  },
  dark: {
    value: 'dark',
    label: 'Oscuro'
  },
  system: {
    value: 'system',
    label: 'Sistema'
  }
}

export function ModeToggle () {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => setTheme(themes.light.value)}
          className={cn({
            'bg-accent': theme === themes.light.value
          })}
        >
          {themes.light.label}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme(themes.dark.value)}
          className={cn({
            'bg-accent': theme === themes.dark.value
          })}
        >
          {themes.dark.label}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme(themes.system.value)}
          className={cn({
            'bg-accent': theme === themes.system.value
          })}
        >
          {themes.system.label}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
