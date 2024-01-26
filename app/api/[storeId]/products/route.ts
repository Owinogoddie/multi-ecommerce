import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req:Request,{params}:{params:{storeId:string}}){
    try {
        const {userId}=auth()
        const body=await req.json()
        const {name,price,categoryId,color,sizeId,images,isFeatured,isArchived}=body
        if(!userId){
            return new NextResponse("Unauthorized",{status:400})
        }
        if(!name || !price || !categoryId || !color ||!sizeId || !images){
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
        const product=await prismadb.product.create({
          
            data:{
                name,
                isFeatured,
                isArchived,
                color,
                sizeId,
                categoryId,
                price,
                storeId:params.storeId,
                images:{
                    createMany:{
                        data:[
                            ...images.map((image:{url:string})=>image)
                        ]
                    }
                }
            }
        })
        return NextResponse.json(product,{status:200})
    } catch (error) {
        console.log("[PRODUCT_POST]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}


export async function GET(req:Request,{params}:{params:{storeId:string}}){
    try {

        const {searchParams}=new URL(req.url)
        const categoryId=searchParams.get("categoryId") || undefined
        const color=searchParams.get("color") || undefined
        const sizeId=searchParams.get("sizeId") || undefined
        const isFeatured=searchParams.get("isFeatured") || undefined
        
       
        if(!params.storeId){
            return new NextResponse("Store is required",{status:400})
        }
       const products=await prismadb.product.findMany({
        where:{
            storeId:params.storeId,
            categoryId,
            color,
            sizeId,
            isFeatured:isFeatured? true :undefined,
            isArchived:false
        },
        include:{
            images:true,
            category:true,
            size:true
        },
        orderBy:{
            createdAt:"desc"
        }
       })
        return NextResponse.json(products,{status:200})
    } catch (error) {
        console.log("[PRODUCTSS_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}