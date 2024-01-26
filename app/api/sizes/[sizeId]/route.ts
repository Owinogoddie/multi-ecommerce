import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{params}:{params:{storeId:string,sizeId:string}}){
    try {
        const {userId}=auth()
        const body=await req.json()
        const {name,value}=body
        if(!userId){
            return new NextResponse("Unauthorized",{status:400})
        }
        if(!name || !value){
            return new NextResponse("All fields are equired",{status:400})
        }
        if(!params.sizeId){
            return new NextResponse("SIZE is required",{status:400})
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

        const size=await prismadb.size.updateMany({
            where:{
                id:params.sizeId
            },
            data:{
                name,
                value
            }
        })
        return NextResponse.json(size,{status:200})
    } catch (error) {
        console.log("[SIZE_PATCH]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}


export async function GET(req:Request,{params}:{params:{storeId:string,sizeId:string}}){
    try {
        
       
        if(!params.storeId || params.sizeId){
            return new NextResponse("Store and Size required is required",{status:400})
        }
      
       
        const size=await prismadb.size.findUnique({
            where:{
                id:params.sizeId
            }
        })
        return NextResponse.json(size,{status:200})
    } catch (error) {
        console.log("[SIZE_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}

export async function DELETE(req:Request,{params}:{params:{storeId:string,sizeId:string}}){
    try {
        const {userId}=auth()
       
        if(!userId){
            return new NextResponse("Unauthorized",{status:400})
        }
       
        if(!params.storeId || !params.sizeId){
            return new NextResponse("Store and SIZE required is required",{status:400})
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
        const SIZE=await prismadb.size.deleteMany({
            where:{
                id:params.sizeId
            }
        })
        return NextResponse.json(SIZE)
    } catch (error) {
        console.log("[SIZE_DELETE]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}