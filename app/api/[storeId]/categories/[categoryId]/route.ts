import { Category } from '@prisma/client';
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{params}:{params:{storeId:string,categoryId:string}}){
    try {
        const {userId}=auth()
        const body=await req.json()
        const {name,billboardId}=body
        if(!userId){
            return new NextResponse("Unauthorized",{status:400})
        }
        if(!name || !billboardId){
            return new NextResponse("All fields are equired",{status:400})
        }
        if(!params.categoryId){
            return new NextResponse("Category is required",{status:400})
        }
        const store=await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })
        if(!store){
            return new NextResponse("Unauthorized",{status:400})
        }

        const category=await prismadb.category.updateMany({
            where:{
                id:params.categoryId
            },
            data:{
                name,
                billboardId
            }
        })
        return NextResponse.json(category,{status:200})
    } catch (error) {
        console.log("[CATEGORY_PATCH]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}


export async function GET(req:Request,{params}:{params:{storeId:string,categoryId:string}}){
    try {
        
       
        if(!params.storeId || params.categoryId){
            return new NextResponse("Store and category required is required",{status:400})
        }
      
       
        const category=await prismadb.category.findUnique({
            where:{
                id:params.categoryId
            }
        })
        return NextResponse.json(category,{status:200})
    } catch (error) {
        console.log("[CATEGORY_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}

export async function DELETE(req:Request,{params}:{params:{storeId:string,categoryId:string}}){
    try {
        const {userId}=auth()
       
        if(!userId){
            return new NextResponse("Unauthorized",{status:400})
        }
       
        if(!params.storeId || !params.categoryId){
            return new NextResponse("Store and category required is required",{status:400})
        }
        const store=await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })
        if(!store){
            return new NextResponse("Unauthorized",{status:400})
        }
        const category=await prismadb.category.deleteMany({
            where:{
                id:params.categoryId
            }
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log("[CATEGORY_DELETE]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}