import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import { NavRoutes } from './nav-routes'
import { StoreSwitcher } from './store-switcher'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import { ModeToggle } from './theme-toggle'

export const Navbar = async() => {
    const {userId}=auth()
    if(!userId){
        redirect("/store")
    }

    const stores=await prismadb.store.findMany({
        where:{
            userId
        }
    })
  return (
    <div className="border-b">
        <div className="flex h-16 items-center px-4">
            <StoreSwitcher items={stores}/>

            <div>
                <NavRoutes className='ml-6'/>
            </div>
            <div className="ml-auto flex items-center space-x-4">
                <UserButton afterSignOutUrl='/store'/>

            </div>
            <ModeToggle/>

        </div>
        
    </div>
  )
}
