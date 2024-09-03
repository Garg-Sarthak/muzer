import { prismaClient } from "@/app/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
// const YT_REGEX = new RegExp("^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$");

const YT_REGEX = new RegExp(
    "^((https?:)?\\/\\/)?((www|m)\\.)?(youtube\\.com|youtu.be)\\/(watch\\?v=|embed\\/|v\\/|playlist\\?list=|channel\\/|user\\/|\\S+)?([\\w\\-]+)(\\S+)?$"
);
const createStreamSchema = z.object({
    url : z.string()
})

export async function POST(req : NextRequest){
    const clerkUser = await currentUser(); // clerk here
    
    if (!clerkUser){
        return NextResponse.json({
            message : "Unauthenticated"
        },{
            status : 403
        })
    }

    try{
        const data = createStreamSchema.parse(await req.json());
        const isYt = YT_REGEX.test(data.url);
        
        if (!isYt){
            return NextResponse.json({
                message : "Wrong URL format"
            },{
                status : 411
            })
        }

        const extractedId = data.url.split("?v=")[1] ;


        const stream = await prismaClient.stream.create({
            data : {
                userId : clerkUser.id,
                extractedId,
                url : data.url,
                type : "Youtube"
            }
        })
        return NextResponse.json({
            message : "Added Stream",
            id : stream.id
        },{
            status : 200
        })
    }catch(e){
        return NextResponse.json({
            message : "error while adding a stream"
        },{
            status : 411
        })
    }
}

export async function GET(req : NextRequest){
    const creatorId = await req.nextUrl.searchParams.get("creatorId");

    try{
        const streams = prismaClient.stream.findMany({
            where : {
                userId : creatorId ?? ""
            }
        })
        return NextResponse.json({
            streams
        })
    }catch(e){
        return NextResponse.json({
            message :  "No stream with given ID found"
        })
    }
}