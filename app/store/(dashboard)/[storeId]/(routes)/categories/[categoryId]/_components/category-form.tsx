"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Trash } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { DeleteAlertModal } from '@/components/ui/modals/delete-alert-dialog'
import { Billboard, Category } from '@prisma/client'
interface CategoryFormData{
    initialData:Category | null,
    billboards:Billboard[]
}
 
const formSchema = z.object({
  name: z.string().min(2),
  billboardId: z.string().min(2),
})

  
  export const CategoryForm = ({initialData,billboards}:CategoryFormData) => {

const [open,setOpen]=useState(false)
const [isLoading,setIsLoading]=useState(false);
const params=useParams()
const router=useRouter()

const title=initialData?"Edit Category" : "Create Category"
const description=initialData?"Manage Categories" : "Add a new  Category"
const toastMessage=initialData?"Category edited" : "Category created"
const action=initialData?"Save changes" : "Create"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
        name:"",
        billboardId:""
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
     setIsLoading(true)
      
     if(!initialData){
        const response=await axios.post(`/api/${params.storeId}/categories`,values)
        console.log(response.data)
     }
     else{
        console.log(values)
        const response=await axios.patch(`/api/${params.storeId}/categories/${params.CategoryId}`,values)
     }
     router.refresh()
     router.push(`/store/${params.storeId}/categories`)
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
      await axios.delete(`/api/${params.storeId}/categories/${params.CategoryId}`)
      router.refresh()
      router.push(`/store/${params.storeId}/categories`)
      toast.success("Category deleted")
      
    } catch (error) {
      toast.error("Make sure you removed all products first for this Category.")
      
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
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Category Name"{...field} 
                disabled={isLoading}
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="billboardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BillBoard</FormLabel>
              <Select onValueChange={field.onChange} 
              defaultValue={field.value}
              value={field.value}
              disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                    defaultValue={field.value}
                    placeholder="Select a billboard" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {billboards?.map(billboard=>(
                    <SelectItem key={billboard.id} value={billboard.id}>{billboard.label}</SelectItem>

                  
    )  )}
                </SelectContent>
              </Select>
              
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
