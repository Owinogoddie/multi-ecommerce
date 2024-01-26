'use client'
import { DataTable } from '@/components/data-table'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Billboard } from '@prisma/client'
import {format} from 'date-fns'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { BillboardColumn, billboardColumns } from './columns'

interface BillboardClientProps{
  data:Billboard[]
}

const BillboardClient = ({data}:BillboardClientProps) => {
    const router=useRouter()
    const params=useParams()

    const formattedItems:BillboardColumn[]=data.map(item=>({
      id:item.id,
      label:item.label,
      createdAt:format(item.createdAt,"MMM do, yyyy")
    }))
  return (
   <>
   
   <div className="flex items-center justify-between">
        <Heading
        description='Billboards for your store'
        title={`Billboards (${data?.length})`}
        />
        <Button
        onClick={()=>{router.push(`/store/${params.storeId}/billboards/new`)}}
        >
            <Plus className="mr-2 h-4 w-4"/>
            Add New
        </Button>
    </div>
    <Separator/>
    <DataTable 
    columns={billboardColumns} 
    data={formattedItems}
    searchKey='label'
    />
   </>
  )
}

export default BillboardClient