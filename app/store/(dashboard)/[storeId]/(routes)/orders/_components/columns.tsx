"use client"

import { ColumnDef } from "@tanstack/react-table"


export type OrderColumn = {
  id: string
  phone: string
  adress: string
  isPaid: boolean
  totalPrice: string
  products: string
  createdAt: string
}

export const orderColumns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "adress ",
    header: "Adress",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },

]
