import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import ProductClient from './_components/product-client'
import { ProductColumn } from './_components/columns'
import { format } from 'date-fns'
import { priceFormatter } from '@/lib/priceFormatter'

const ProductPage = async ({params}:{params:{storeId:string}}) => {
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
  const products=await prismadb.product.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      category:true,
      size:true,
      images:true
    },
    orderBy:{
      createdAt:"desc"
    }
  })

 
  const formattedItems:ProductColumn[]=products.map(item=>({
    id:item.id,
    name:item.name,
    isFeatured:item.isFeatured,
    isArchived:item.isArchived,
    size:item.size.name,
    images:item.images.map(image=>image.url),
    color:item.color,
    price:priceFormatter.format(item.price.toNumber()),
    category:item.category.name,
    createdAt:format(item.createdAt,"MMM do, yyyy")
  }))
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedItems}/>

      </div>
    </div>
  )
}

export default ProductPage