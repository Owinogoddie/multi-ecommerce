'use client'
import { DataTable } from '@/components/data-table'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Billboard, Size } from '@prisma/client'
import {format} from 'date-fns'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import {  SizeColumn, sizeColumns,  } from './columns'

interface SizeClientProps{
  data:Size[]
}

const SizeClient = ({data}:SizeClientProps) => {
    const router=useRouter()
    const params=useParams()

    const formattedItems:SizeColumn[]=data.map(item=>({
      id:item.id,
      name:item.name,
      value:item.value,
      createdAt:format(item.createdAt,"MMM do, yyyy")
    }))
  return (
   <>
   
   <div className="flex items-center justify-between">
        <Heading
        description='Sizes for your store'
        title={`Sizes (${data?.length})`}
        />
        <Button
        onClick={()=>{router.push(`/store/${params.storeId}/sizes/new`)}}
        >
            <Plus className="mr-2 h-4 w-4"/>
            Add New
        </Button>
    </div>
    <Separator/>
    <DataTable 
    columns={sizeColumns} 
    data={formattedItems}
    searchKey='name'
    />
   </>
  )
}

export default SizeClient