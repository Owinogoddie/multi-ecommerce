"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Store } from '@prisma/client'
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
interface settingsFormData{
    initialData:Store
}
 
const formSchema = z.object({
  name: z.string().min(2).max(50),
})

  
  export const SettingsForm = ({initialData}:settingsFormData) => {

  const [open,setOpen]=useState(false)
const [isLoading,setIsLoading]=useState(false);
const params=useParams()
const router=useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
     setIsLoading(true)
      
     const response=await axios.patch(`/api/stores/${params.storeId}`,values)
     router.refresh()
     toast.success("Store updated")
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
      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push("/")
      toast.success("Store deleted")
      
    } catch (error) {
      toast.error("Make sure you removed all products and categories first.")
      
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
        title="Settings"
        description="Manage your store"
        />
        <Button variant="destructive"
        size="icon"
        onClick={()=>{setOpen(true)}}
        disabled={isLoading}
        >
            <Trash className='h-4 w-4'/>

        </Button>
    </div>
    <Separator/>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <div className="grid grid-cols-3 gap-8">
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
       </div>
        <Button type="submit"
        className='ml-auto' 
        disabled={isLoading}
        >Submit</Button>
      </form>
    </Form>
    </>
  )
}
