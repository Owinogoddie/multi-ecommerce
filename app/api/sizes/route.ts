import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function GET(req:Request){
    try {
        
       const sizes=await prismadb.size.findMany()
        return NextResponse.json(sizes,{status:200})
    } catch (error) {
        console.log("[SIZES_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}