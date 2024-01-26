import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"



export async function GET(req:Request){
    try {       
       
       const colors=await prismadb.color.findMany()
        return NextResponse.json(colors,{status:200})
    } catch (error) {
        console.log("[COLORSS_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}