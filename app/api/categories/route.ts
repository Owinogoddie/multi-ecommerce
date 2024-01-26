import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"


export async function GET(req:Request){
    try {
        
       const categories=await prismadb.category.findMany({
        include:{
            billboard:true
        }
       })
        return NextResponse.json(categories,{status:200})
    } catch (error) {
        console.log("[CATEGORIES_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}