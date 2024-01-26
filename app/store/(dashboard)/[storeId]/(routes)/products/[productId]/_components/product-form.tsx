"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Category, Image, Product, Size, Store } from '@prisma/client'
import { Trash } from 'lucide-react'

import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
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
import ImageUpload from '@/components/image-upload'
import { ColorPicker } from '@/components/color-picker'
interface ProductFormData{
    initialData:Product &{
      images:Image[]
    } | null,
    categories:Category[],
    sizes:Size[]
}
 
const formSchema = z.object({
  name: z.string().min(2),
  images: z.object({url:z.string()}).array(),
  price:z.coerce.number().min(1),
  categoryId: z.string().min(1),
  color: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured:z.boolean().default(false).optional(),
  isArchived:z.boolean().default(false).optional(),

})

  
  export const ProductForm = ({initialData,sizes,categories}:ProductFormData) => {

const [open,setOpen]=useState(false)
const [isLoading,setIsLoading]=useState(false);
const params=useParams()
const router=useRouter()

const title=initialData?"Edit Product" : "Create Product"
const description=initialData?"Manage Products" : "Add a new  Product"
const toastMessage=initialData?"Product edited" : "Product created"
const action=initialData?"Save changes" : "Create"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData? {
      ...initialData,
      price:parseFloat(String(initialData?.price))
    }: {
        name:"",
        images:[],
        price:0,
        categoryId:"",
        color:"",
        sizeId:"",
        isFeatured:false,
        isArchived:false,
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
     setIsLoading(true)
      
     if(!initialData){
        const response=await axios.post(`/api/${params.storeId}/products`,values)
        console.log(response.data)
     }
     else{
        console.log(values)
        const response=await axios.patch(`/api/${params.storeId}/products/${params.productId}`,values)
     }
     router.refresh()
     router.push(`/store/${params.storeId}/products`)
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
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
      router.refresh()
      router.push(`/store/${params.storeId}/products`)
      toast.success("Product deleted")
      
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
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <ImageUpload value={field.value.map(image=>image.url)}
                onChange={(url)=>field.onChange([...field.value,{url}])}
                onRemove={(url)=>field.onChange([...field.value.filter(current=>current.url!=url)])}
                disabled={isLoading}
                
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
      
       
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name"{...field} 
                disabled={isLoading}
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type='number' placeholder="9.95"{...field} 
                disabled={isLoading}
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} 
              defaultValue={field.value}
              value={field.value}
              disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                    defaultValue={field.value}
                    placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map(category=>(
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>

                  
    )  )}
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
      <FormField
          control={form.control}
          name="sizeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <Select onValueChange={field.onChange} 
              defaultValue={field.value}
              value={field.value}
              disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                    defaultValue={field.value}
                    placeholder="Select a size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sizes?.map(size=>(
                    <SelectItem key={size.id} value={size.id}>{size.name}</SelectItem>

                  
    )  )}
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color:<span className=" border rounded-full p-2" style={{backgroundColor:field.value}}></span></FormLabel>
              <FormControl>
                
         <ColorPicker value={field.value}
            onChange={(url)=>{field.onChange(url)}}
            onCancel={()=>{}}
            
            />
               
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Featured
                </FormLabel>
                <FormDescription>
                  This product will appear on home page
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isArchived"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Archived
                </FormLabel>
                <FormDescription>
                  This product will not appear anywhere in the store
                </FormDescription>
              </div>
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
