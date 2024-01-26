import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"

interface CellActionProps{
    data:SizeColumn
}
import { useParams, useRouter } from "next/navigation"
import {SizeColumn } from './columns'
import axios from 'axios'
import { DeleteAlertModal } from '@/components/ui/modals/delete-alert-dialog'

const CellAction = ({data}:CellActionProps) => {
    const router=useRouter()
    const params=useParams()
    
const [open,setOpen]=useState(false)
const [isLoading,setIsLoading]=useState(false);

const onConfirm=async ()=>{
    try {
      setIsLoading(true)
      await axios.delete(`/api/${params.storeId}/sizes/${data.id}`)
      router.refresh()
      toast.success("Size deleted")
      
    } catch (error) {
      toast.error("An Error occured.")
      
    }finally{
      setOpen(false)
      setIsLoading(false)
    }
   }
     
    const onClose=()=>{
        setOpen(false)
       }
  return (
    <>    
    
    <DeleteAlertModal disabled={isLoading} isOpen={open} onClose={onClose} onSubmit={onConfirm}/>
    
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => router.push(`/store/${params.storeId}/sizes/${data.id}`)}
            >
              <Edit className="h-4 w-4"/> 
              Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={
                () => {
                    navigator.clipboard.writeText(data.id);
                    toast.success("Id copied")
                }
              }
            >
              <Copy className="h-4 w-4"/> 
              Copy Id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={
                () => {
                    setOpen(true)
                }}
            >
              <Trash className="h-4 w-4"/> 
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            
          </DropdownMenuContent>
        </DropdownMenu>
        </>
  )
}

export default CellAction