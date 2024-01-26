import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"



export async function GET(req:Request,{params}:{params:{storeId:string}}){
    try {
        
       const billboards=await prismadb.billboard.findMany()
        return NextResponse.json(billboards,{status:200})
    } catch (error) {
        console.log("[BILLBOARDS_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}