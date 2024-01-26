import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import ColorClient from './_components/color-client'

const BillboardPage = async ({params}:{params:{storeId:string}}) => {
  const {userId}=auth()
  if(!userId){
    redirect("/store")
  }
  const store=await prismadb.store.findFirst({
    where:{
      userId,
      id:params.storeId
    }
  })
  if(!store){
    redirect("/store")
  }
  const colors=await prismadb.color.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={colors}/>

      </div>
    </div>
  )
}

export default BillboardPage