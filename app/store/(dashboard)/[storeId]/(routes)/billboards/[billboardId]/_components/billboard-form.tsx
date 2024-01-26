"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Billboard, Store } from '@prisma/client'
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
interface BillboardFormData{
    initialData:Billboard | null
}
 
const formSchema = z.object({
  label: z.string().min(2),
  imageUrl: z.string().min(2),
})

  
  export const BillboardForm = ({initialData}:BillboardFormData) => {

const [open,setOpen]=useState(false)
const [isLoading,setIsLoading]=useState(false);
const params=useParams()
const router=useRouter()

const title=initialData?"Edit billboard" : "Create Billboard"
const description=initialData?"Manage BIllboards" : "Add a new  Billboard"
const toastMessage=initialData?"Billboard edited" : "Billboard created"
const action=initialData?"Save changes" : "Create"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
        label:"",
        imageUrl:""
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
     setIsLoading(true)
      
     if(!initialData){
        const response=await axios.post(`/api/${params.storeId}/billboards`,values)
        console.log(response.data)
     }
     else{
        console.log(values)
        const response=await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`,values)
     }
     router.refresh()
     router.push(`/store/${params.storeId}/billboards`)
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
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
      router.refresh()
      router.push(`/store/${params.storeId}/billboards`)
      toast.success("Billboard deleted")
      
    } catch (error) {
      toast.error("Make sure you removed all categories first for this billboard.")
      
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
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Background Image</FormLabel>
              <FormControl>
                <ImageUpload value={field.value? [field.value]:[]}
                onChange={(url)=>{field.onChange(url)}}
                onRemove={()=>{field.onChange("")}}
                disabled={isLoading}
                
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
      
       </div>
      <div className="grid md:grid-cols-3">
      <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="label"{...field} 
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
