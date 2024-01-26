"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Color } from '@prisma/client'
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
import { ColorPicker } from '@/components/color-picker'
interface ColorFormData{
    initialData:Color | null
}
 
const formSchema = z.object({
  name: z.string().min(2),
  value: z.string().min(2),
})

  
  export const ColorForm = ({initialData}:ColorFormData) => {

const [open,setOpen]=useState(false)
const [isLoading,setIsLoading]=useState(false);
const [showColor,setShowColor]=useState(false);
const params=useParams()
const router=useRouter()

const title=initialData?"Edit Color" : "Create Color"
const description=initialData?"Manage Colors" : "Add a new  Color"
const toastMessage=initialData?"Color edited" : "Color created"
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
        const response=await axios.post(`/api/${params.storeId}/colors`,values)
        console.log(response.data)
     }
     else{
        console.log(values)
        const response=await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`,values)
     }
     router.refresh()
     router.push(`/store/${params.storeId}/colors`)
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
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
      router.refresh()
      router.push(`/store/${params.storeId}/colors`)
      toast.success("Color deleted")
      
    } catch (error) {
      toast.error("Something went wrong")
      
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
            
           <>
           
           <FormItem>
              <FormLabel>Color:<span className=" border rounded-full p-2" style={{backgroundColor:field.value}}></span></FormLabel>
              <FormControl>
                
         <ColorPicker value={field.value}
            onChange={(url)=>{field.onChange(url)}}
            onCancel={()=>{setShowColor(false)}}
            
            />
               
              </FormControl>
              
              <FormMessage />
            </FormItem>
           </>
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
