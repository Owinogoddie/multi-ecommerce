import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
    try {
        const body=await req.json()
        const {name}=body
        const user=auth()
        const {userId}=user

        if(!userId){
            return new NextResponse("Unauthorized",{status:500})
        }
        console.log(userId)
        if(!name){
            return new NextResponse("Name is required",{status:500})
        }

        const store=await prismadb.store.create({
            data:{
                name,
                userId
            }
        })

        return NextResponse.json(store,{status:200})

        
    } catch (error) {
        console.log("[STORES_POST]",error)
        return new NextResponse("Internal server error",{status:500})
        
    }
    
}