import { prismaClient } from "@/app/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server"
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
        const downvote = await prismaClient.upvote.delete({
            where : {
                userId_streamId : {
                    userId : clerkUser.id ?? "",
                    streamId : data.streamId
                }
            }
        })
        return NextResponse.json({
            message : "Upvote removed",
            id : downvote.id 
        },{
            status : 200
        })

    }catch(e){
        return NextResponse.json({
            message : "Can't remove upvote"
        },{
            status : 411
        })
    }
}