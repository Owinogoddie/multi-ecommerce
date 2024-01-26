import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { OrderColumn } from './_components/columns'
import { priceFormatter } from '@/lib/priceFormatter'
import { format } from 'date-fns'
import OrdersClient from './_components/orders-client'
import { getStoreOrders } from '@/actions/store/get-orders'

const OrdersPage = async ({params}:{params:{storeId:string}}) => {
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
  const orders=await getStoreOrders(params.storeId)

 if(!orders){
  return
 }
 const formattedOrders:OrderColumn[]=orders.map(item=>({
  id:item.id,
  phone:item.phone,
  adress:item.address,
  products:item.orderItems.map(orderItem=>orderItem.product.name).join(', '),
  totalPrice:priceFormatter.format(item.orderItems.reduce((total,item)=>{
    return total+Number(item.product.price)
  },0)),
  isPaid:item.isPaid,
  createdAt:format(item.createdAt,"MMMM do, yyyy")
}))
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersClient data={formattedOrders}/>

      </div>
    </div>
  )
}

export default OrdersPage