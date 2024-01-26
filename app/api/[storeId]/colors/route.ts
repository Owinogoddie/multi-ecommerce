import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req:Request,{params}:{params:{storeId:string}}){
    try {
        const {userId}=auth()
        const body=await req.json()
        const {name,value}=body
        if(!userId){
            return new NextResponse("Unauthorized",{status:400})
        }
        if(!name || !value){
            return new NextResponse("all fields required",{status:400})
        }
        if(!params.storeId){
            return new NextResponse("Store is required",{status:400})
        }
        const storeByUser=await prismadb.store.findFirst({
            where:{
                userId,
                id:params.storeId
            }
        })

        if(!storeByUser){
            return new NextResponse("Unauthorized",{status:400})
        }
        const color=await prismadb.color.create({
          
            data:{
                name,
                value,
                storeId:params.storeId
            }
        })
        return NextResponse.json(color,{status:200})
    } catch (error) {
        console.log("[COLORS_POST]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}


export async function GET(req:Request,{params}:{params:{storeId:string}}){
    try {
        
       
        if(!params.storeId){
            return new NextResponse("Store is required",{status:400})
        }
       const colors=await prismadb.color.findMany({
        where:{
            storeId:params.storeId
        }
       })
        return NextResponse.json(colors,{status:200})
    } catch (error) {
        console.log("[COLORSS_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}