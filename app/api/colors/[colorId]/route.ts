import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"



export async function GET(req:Request,{params}:{params:{colorId:string}}){
    try {
        
        const color=await prismadb.color.findUnique({
            where:{
                id:params.colorId
            }
        })
        return NextResponse.json(color,{status:200})
    } catch (error) {
        console.log("[COLOR_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}
