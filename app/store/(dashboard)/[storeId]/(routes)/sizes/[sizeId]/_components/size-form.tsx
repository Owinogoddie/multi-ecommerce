"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Size, Store } from '@prisma/client'
import { Trash } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { DeleteAlertModal } from '@/components/ui/modals/delete-alert-dialog'
import ImageUpload from '@/components/image-upload'
interface SizeFormData{
    initialData:Size | null
}
 
const formSchema = z.object({
  name: z.string().min(2),
  value: z.string().min(1),
})

  
  export const SizeForm = ({initialData}:SizeFormData) => {

const [open,setOpen]=useState(false)
const [isLoading,setIsLoading]=useState(false);
const params=useParams()
const router=useRouter()

const title=initialData?"Edit size" : "Create size"
const description=initialData?"Manage sizes" : "Add a new  size"
const toastMessage=initialData?"size edited" : "size created"
const action=initialData?"Save changes" : "Create"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
        name:"",
        value:""
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
     setIsLoading(true)
      
     if(!initialData){
        const response=await axios.post(`/api/${params.storeId}/sizes`,values)
        // console.log(response.data)
     }
     else{
        console.log(values)
        const response=await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`,values)
     }
     router.refresh()
     router.push(`/store/${params.storeId}/sizes`)
     toast.success(toastMessage)
    } catch (error) {
     console.log(error)
     setIsLoading(false)
     
    }finally{
     setIsLoading(false)
    }
   }
   const onClose=()=>{
    setOpen(false)
   }
   const onConfirm=async ()=>{
    try {
      setIsLoading(true)
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
      router.refresh()
      router.push(`/store/${params.storeId}/sizes`)
      toast.success("size deleted")
      
    } catch (error) {
      toast.error("An error occured.")
      
    }finally{
      setOpen(false)
      setIsLoading(false)
    }
   }
  
  return (
    <>
    <DeleteAlertModal disabled={isLoading} isOpen={open} onClose={onClose} onSubmit={onConfirm}/>
    <div className="flex items-center justify-between">
        <Heading 
        title={title}
        description={description}
        />
      {
        initialData &&(
            <Button variant="destructive"
            size="icon"
            onClick={()=>{setOpen(true)}}
            disabled={isLoading}
            >
                <Trash className='h-4 w-4'/>
    
            </Button>
        )
      }
    </div>
    <Separator/>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     
      <div className="grid md:grid-cols-3 gap-8">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name"{...field} 
                disabled={isLoading}
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input placeholder="value"{...field} 
                disabled={isLoading}
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
        <Button type="submit"
        className='ml-auto' 
        disabled={isLoading}
        >{action}</Button>
      </form>
    </Form>
    </>
  )
}
