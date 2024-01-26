"use client"

import { ColumnDef } from "@tanstack/react-table"

import CellAction from "./cell-action"
import Image from "next/image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  name: string
  price: string
  size: string
  category: string
  color: string
  isFeatured: boolean
  isArchived: boolean
  images:string[]
  createdAt: string
}

export const productColumns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "images",
    header: "Images",
    cell:({row})=>{
      return(
        <div className="flex items-center gap-x-1">
          {
            row.original.images.map(image=>(
              <Image src={image} height={50} width={50} alt="image" className="rounded-full"/>
            ))
          }

        </div>
      )
    }
  },
  {
    accessorKey: "color",
    header: "Color",
        cell:({row})=>{
      return(

      <div className="flex items-center gap-x-2">
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor:row.original.color}}>

        </div>
        </div>
      )
      
      
    }
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original
 
      return (
        <CellAction data={data}/>
      )
    },
  },
]
