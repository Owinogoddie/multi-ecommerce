'use client'
import { DataTable } from '@/components/data-table'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {  Color } from '@prisma/client'
import {format} from 'date-fns'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ColorColumn, colorColumns } from './columns'

interface ColorClientProps{
  data:Color[]
}

const ColorClient = ({data}:ColorClientProps) => {
    const router=useRouter()
    const params=useParams()

    const formattedItems:ColorColumn[]=data.map(item=>({
      id:item.id,
      name:item.name,
      value:item.value,
      createdAt:format(item.createdAt,"MMM do, yyyy")
    }))
  return (
   <>
   
   <div className="flex items-center justify-between">
        <Heading
        description='Colors for your store'
        title={`Colors (${data?.length})`}
        />
        <Button
        onClick={()=>{router.push(`/store/${params.storeId}/colors/new`)}}
        >
            <Plus className="mr-2 h-4 w-4"/>
            Add New
        </Button>
    </div>
    <Separator/>
    <DataTable 
    columns={colorColumns} 
    data={formattedItems}
    searchKey='name'
    />
   </>
  )
}

export default ColorClient