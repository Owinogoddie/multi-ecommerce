import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{params}:{params:{storeId:string,productId:string}}){
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
        if(!params.productId){
            return new NextResponse("product is required",{status:400})
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

        await prismadb.product.update({
            where:{
                id:params.productId
            },
            data:{
                name,
                isFeatured,
                isArchived,
                color,
                sizeId,
                categoryId,
                price,
                images:{
                    deleteMany:{}
                }
            }
        })

        const product=await prismadb.product.update({
            where:{
                id:params.productId
            },
            data:{
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
        console.log("[PRODUCT_PATCH]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}


export async function GET(req:Request,{params}:{params:{storeId:string,productId:string}}){
    try {
        
       
        if(!params.storeId || !params.productId){
            return new NextResponse("Store and product required is required",{status:400})
        }
      
       
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