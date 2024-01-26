'use client'
import { DataTable } from '@/components/data-table'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { CategoryColumn, categoryColumns } from './columns'

interface CategoryClientProps{
  data:CategoryColumn[]
  
}

const CategoryClient = ({data}:CategoryClientProps) => {
    const router=useRouter()
    const params=useParams()

   return (
   <>
   
   <div className="flex items-center justify-between">
        <Heading
        description='Categories for your store'
        title={`Categories (${data?.length})`}
        />
        <Button
        onClick={()=>{router.push(`/store/${params.storeId}/categories/new`)}}
        >
            <Plus className="mr-2 h-4 w-4"/>
            Add New
        </Button>
    </div>
    <Separator/>
    <DataTable 
    columns={categoryColumns} 
    data={data}
    searchKey='name'
    />
   </>
  )
}

export default CategoryClient