'use client'
import Link from 'next/link'
import { BrowserOnly } from 'react-kuh'

import { ThemeToggle, AuthButton } from '@/components/layout'
import UserDropdown from './UserDropdown'

export default function Navbar() {
  const user = localStorage.getItem('selectedUser')
  const logout = () => {
    localStorage.removeItem('selectedUser')
    window.location.reload()
  }
  return (
    <header className='border-b border-opacity-10 backdrop-blur-lg bg-opacity-70 sticky top-0 z-50'>
      <div className='max-w-screen-2xl mx-auto flex items-center justify-between py-2 px-6 md:px-8'>
        <div className='space-x-3'>
          <Link className='font-bold text-lg w-16 h-auto' href={'/'}>
            NEXT.JS
          </Link>
          <Link href='/movies'>Movies</Link>
        </div>
        <h3>Logged in as: {user}</h3>
        {/* logout */}
        <button onClick={logout}>Logout</button>
        <div className='flex items-center gap-x-2'>
          <AuthButton />
          <BrowserOnly>
            <ThemeToggle />
          </BrowserOnly>
        </div>
      </div>
    </header>
  )
}
