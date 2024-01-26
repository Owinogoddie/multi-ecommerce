import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"



export async function GET(req:Request){
    try {

        const {searchParams}=new URL(req.url)
        const categoryId=searchParams.get("categoryId") || undefined
        const color=searchParams.get("color") || undefined
        const sizeId=searchParams.get("sizeId") || undefined
        const isFeatured=searchParams.get("isFeatured") || undefined
        
       
       
       const products=await prismadb.product.findMany({
        where:{
            categoryId,
            color,
            sizeId,
            isFeatured:isFeatured? true :undefined,
            isArchived:false
        },
        include:{
            images:true,
            category:true,
            size:true
        },
        orderBy:{
            createdAt:"desc"
        }
       })
        return NextResponse.json(products,{status:200})
    } catch (error) {
        console.log("[PRODUCTSS_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}