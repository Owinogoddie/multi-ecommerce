import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"


export async function GET(req:Request,{params}:{params:{categoryId:string}}){
    try {
               
        const category=await prismadb.category.findUnique({
            where:{
                id:params.categoryId
            },
            include:{
                billboard:true
            }
        })
        return NextResponse.json(category,{status:200})
    } catch (error) {
        console.log("[CATEGORY_GET]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
}