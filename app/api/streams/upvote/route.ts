import { prismaClient } from "@/app/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server"
import { json } from "stream/consumers";
import {z} from "zod";

const UpvoteSchema = z.object({
    streamId : z.string()
})

export async function POST(req : NextRequest){
    const clerkUser = await currentUser();
    
    if (!clerkUser){
        return NextResponse.json({
            message : "Unauthenticated"
        },{
            status : 403
        })
    }


    try{
        const data = UpvoteSchema.parse(await req.json());
        const upvote = await prismaClient.upvote.create({
            data : {
                userId : clerkUser.id,
                streamId : data.streamId
            }
        })
        return NextResponse.json({
            message : "Stream Upvoted",
            id : upvote.id 
        },{
            status : 200
        })

    }catch(e){
        return NextResponse.json({
            message : "Error while upvoting"
        },{
            status : 411
        })
    }
}