import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import BillboardClient from './_components/category-client'
import { CategoryColumn } from './_components/columns'
import { format } from 'date-fns'

const CategoriesPage = async ({params}:{params:{storeId:string}}) => {
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
  const categories=await prismadb.category.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      billboard:true,
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  const formattedItems:CategoryColumn[]=categories.map(item=>({
    id:item.id,
    name:item.name,
    billboardLabel:item.billboard.label,
    createdAt:format(item.createdAt,"MMM do, yyyy")
  }))
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedItems}/>

      </div>
    </div>
  )
}

export default CategoriesPage