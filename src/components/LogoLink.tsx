'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

export const LogoLink = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href='/'
      className='group flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-md'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className='overflow-hidden relative text-5xl'
        initial={{ width: '1.1ch' }}
        animate={{ width: isHovered ? 'auto' : '1.1ch' }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        <span
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #1a202c,
              #1a202c 1px,
              transparent 1px,
              transparent 2px
            )`,
            backgroundSize: '3px 3px',
          }}
          className='block font-black relative bg-clip-text text-transparent z-10 whitespace-nowrap'
        >
          Datos
        </span>
      </motion.div>
      <div>
        <p className='text-xl font-light leading-4 text-nowrap'>
          Fondos <i className='text-lg leading-none'>de</i> <br />
          <motion.span
            className='font-bold inline-block text-primary'
            animate={{ letterSpacing: isHovered ? '0.2em' : '0.05em' }}
            transition={{ duration: 0.5 }}
          >
            Cultura
          </motion.span>
        </p>
      </div>
    </Link>
  )
}
