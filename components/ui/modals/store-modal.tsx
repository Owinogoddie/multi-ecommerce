'use client'
import React, { useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { Modal } from '../modal'
import { useModalStore } from '@/hooks/use-store-modal'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from 'react-hot-toast'
 
const formSchema = z.object({
  name: z.string().min(2),
})


const StoreModal = () => {
    const [isLoading,setIsloading]=useState(false)
    const storeModal=useModalStore()
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
        },
      })
     
      async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsloading(true)
            const response=await axios.post("/api/stores",values)
            toast.success("Store created")
            window.location.assign(`/store/${response.data.id}`)
        } catch (error) {
            toast.error("Something went wrong")
            
        }finally{
            setIsloading(false)
        }
        
      }
  return (
    <Modal 
    title='Create store'
    description='Add a new store to manage products and categories'
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
    >
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input placeholder="store name" {...field} 
                disabled={isLoading }
                />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
        <Button type="button" variant="outline"
        disabled={isLoading }
        >Cancel</Button>
        <Button type="submit"
        disabled={isLoading }
        >Save</Button>
        </div>
      </form>
    </Form>
    </Modal>
  )
}

export default StoreModal