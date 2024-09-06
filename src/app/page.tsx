import Link from 'next/link'
import { GoPlus } from 'react-icons/go'
import { FaReact } from 'react-icons/fa'
import { BiLogoMongodb } from 'react-icons/bi'
import { TbBrandNextjs } from 'react-icons/tb'
import { SiPrisma, SiTailwindcss } from 'react-icons/si'
import { IoLogoGithub, IoLogoVercel } from 'react-icons/io5'

import { Button } from '@/components/ui/button'
import UserDropdown from '../components/layout/UserDropdown'
import UserForm from '../components/user/UserForm'
import { prisma } from '../lib/prisma'

export default async function Page() {
  const users = await prisma.user.findMany({
    select: { username: true } // only select the username field
  })
  return (
    <>
      <section className='space-y-6 pb-8 py-8 md:py-16 lg:py-20 '>
        <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto'>
          <h1 className='font-bold leading-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
            Welcome to RA-naattori
          </h1>
          <UserDropdown users={users} />
          <UserForm />
        </div>
      </section>
    </>
  )
}
