'use client'
import { DataTable } from '@/components/data-table'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Product } from '@prisma/client'
import {format} from 'date-fns'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ProductColumn, productColumns } from './columns'

interface ProductClientProps{
  data:ProductColumn[]
}

const ProductClient = ({data}:ProductClientProps) => {
    const router=useRouter()
    const params=useParams()

    
  return (
   <>
   
   <div className="flex items-center justify-between">
        <Heading
        description='Products for your store'
        title={`Products (${data?.length})`}
        />
        <Button
        onClick={()=>{router.push(`/store/${params.storeId}/products/new`)}}
        >
            <Plus className="mr-2 h-4 w-4"/>
            Add New
        </Button>
    </div>
    <Separator/>
    <DataTable 
    columns={productColumns} 
    data={data}
    searchKey='name'
    />
   </>
  )
}

export default ProductClient