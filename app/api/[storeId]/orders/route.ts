import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req:Request,{params}:{params:{storeId:string}}){
    try {
        const {userId}=auth()
        const body=await req.json()
        const {label,imageUrl}=body
        if(!userId){
            return new NextResponse("Unauthorized",{status:400})
        }
        if(!label || !imageUrl){
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
        const billboard=await prismadb.billboard.create({
          
            data:{
                label,
                imageUrl,
                storeId:params.storeId
            }
        })
        return NextResponse.json(billboard,{status:200})
    } catch (error) {
        console.log("[BILLBOARD_POST]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}


export async function GET(req:Request,{params}:{params:{storeId:string}}){
    try {
        
       
        if(!params.storeId){
            return new NextResponse("Store is required",{status:400})
        }
       const billboards=await prismadb.billboard.findMany({
        where:{
            storeId:params.storeId
        }
       })
        return NextResponse.json(billboards,{status:200})
    } catch (error) {
        console.log("[BILLBOARDS_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}