import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{params}:{params:{storeId:string,billboardId:string}}){
    try {
        const {userId}=auth()
        const body=await req.json()
        const {label,imageUrl}=body
        if(!userId){
            return new NextResponse("Unauthorized",{status:400})
        }
        if(!label || !imageUrl){
            return new NextResponse("All fields are equired",{status:400})
        }
        if(!params.billboardId){
            return new NextResponse("Billboard is required",{status:400})
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

        const billboard=await prismadb.billboard.updateMany({
            where:{
                id:params.billboardId
            },
            data:{
                label,
                imageUrl
            }
        })
        return NextResponse.json(billboard,{status:200})
    } catch (error) {
        console.log("[STORE_PATCH]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}


export async function GET(req:Request,{params}:{params:{storeId:string,billboardId:string}}){
    try {
        
       
        if(!params.storeId || params.billboardId){
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

export async function DELETE(req:Request,{params}:{params:{storeId:string,billboardId:string}}){
    try {
        const {userId}=auth()
       
        if(!userId){
            return new NextResponse("Unauthorized",{status:400})
        }
       
        if(!params.storeId || !params.billboardId){
            return new NextResponse("Store and billboard required is required",{status:400})
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
        const billboard=await prismadb.billboard.deleteMany({
            where:{
                id:params.billboardId
            }
        })
        return NextResponse.json(billboard)
    } catch (error) {
        console.log("[BILLBOARD_DELETE]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}