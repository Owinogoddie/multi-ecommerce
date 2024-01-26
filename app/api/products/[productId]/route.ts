import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function GET(req:Request,{params}:{params:{productId:string}}){
    try {
        
       
        const product=await prismadb.product.findUnique({
            where:{
                id:params.productId
            },
            include:{
                images:true,
                category:true,
                size:true
            }
        })
        return NextResponse.json(product,{status:200})
    } catch (error) {
        console.log("[PRODUCT_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}

export async function DELETE(req:Request,{params}:{params:{storeId:string,productId:string}}){
    try {
        const {userId}=auth()
       
        if(!userId){
            return new NextResponse("Unauthorized",{status:400})
        }
       
        if(!params.storeId || !params.productId){
            return new NextResponse("Store and product required is required",{status:400})
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
        const product=await prismadb.product.deleteMany({
            where:{
                id:params.productId
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log("[PRODUCT_DELETE]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}