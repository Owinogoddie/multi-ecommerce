"use client"

import { ColumnDef } from "@tanstack/react-table"

import CellAction from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const colorColumns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell:({row})=>{
      return(

      <div className="flex items-center gap-x-2">
        {row.getValue("value")}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor:row.getValue("value")}}>

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
