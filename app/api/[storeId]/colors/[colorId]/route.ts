import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{params}:{params:{storeId:string,colorId:string}}){
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
        if(!params.colorId){
            return new NextResponse("color is required",{status:400})
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

        const color=await prismadb.color.updateMany({
            where:{
                id:params.colorId
            },
            data:{
                name,
                value
            }
        })
        return NextResponse.json(color,{status:200})
    } catch (error) {
        console.log("[COLOR_PATCH]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}


export async function GET(req:Request,{params}:{params:{storeId:string,colorId:string}}){
    try {
        
       
        if(!params.storeId || params.colorId){
            return new NextResponse("Store and color required is required",{status:400})
        }
      
       
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

export async function DELETE(req:Request,{params}:{params:{storeId:string,colorId:string}}){
    try {
        const {userId}=auth()
       
        if(!userId){
            return new NextResponse("Unauthorized",{status:400})
        }
       
        if(!params.storeId || !params.colorId){
            return new NextResponse("Store and color required is required",{status:400})
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
        const color=await prismadb.color.deleteMany({
            where:{
                id:params.colorId
            }
        })
        return NextResponse.json(color)
    } catch (error) {
        console.log("[COLOR_DELETE]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}