'use client'
import { DataTable } from '@/components/data-table'
import Heading from '@/components/heading'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { OrderColumn,orderColumns } from './columns'

interface OrdersClientProps{
  data:OrderColumn[]
}

const OrdersClient = ({data}:OrdersClientProps) => {
    const router=useRouter()
    const params=useParams()

  return (
   <>
   
   <div className="flex items-center justify-between">
        <Heading
        description='Orders for your store'
        title={`Orders (${data?.length})`}
        />
    </div>
    <Separator/>
    <DataTable 
    columns={orderColumns} 
    data={data}
    searchKey='products'
    />
   </>
  )
}

export default OrdersClient