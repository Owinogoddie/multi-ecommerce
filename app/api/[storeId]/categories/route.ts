import { Category } from '@prisma/client';
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req:Request,{params}:{params:{storeId:string}}){
    try {
        const {userId}=auth()
        const body=await req.json()
        const {name,billboardId}=body
        if(!userId){
            return new NextResponse("Unauthorized",{status:400})
        }
        if(!name || !billboardId){
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
        const category=await prismadb.category.create({
          
            data:{
                name,
                billboardId,
                storeId:params.storeId
            }
        })
        return NextResponse.json(category,{status:200})
    } catch (error) {
        console.log("[CATEGORY_POST]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}


export async function GET(req:Request,{params}:{params:{storeId:string}}){
    try {
        
       
        if(!params.storeId){
            return new NextResponse("Store is required",{status:400})
        }
       const categories=await prismadb.category.findMany({
        where:{
            storeId:params.storeId
        }
       })
        return NextResponse.json(categories,{status:200})
    } catch (error) {
        console.log("[CATEGORIES_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}