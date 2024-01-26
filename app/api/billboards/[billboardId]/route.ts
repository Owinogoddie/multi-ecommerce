import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"



export async function GET(req:Request,{params}:{params:{billboardId:string}}){
    try {
        console.log("...............................")
        
       
        if( !params.billboardId){
            return new NextResponse("Store and billboard required is required",{status:400})
        }
      
       
        const billboard=await prismadb.billboard.findUnique({
            where:{
                id:params.billboardId
            }
        })
        return NextResponse.json(billboard,{status:200})
    } catch (error) {
        console.log("[BILLBOARD_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}