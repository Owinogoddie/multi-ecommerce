import { Navbar } from '@/components/navbar';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const DasboardLayout = async({children,params}:{children:React.ReactNode;
 params:{storeId:string}}) => {
    const {userId}=auth()

    if(!userId){
        redirect("/store")
    }
    const store=await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    })

    if(!store){
        return redirect("/store")
    }
  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}

export default DasboardLayout