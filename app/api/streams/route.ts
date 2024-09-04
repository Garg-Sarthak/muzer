import { prismaClient } from "@/app/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";
import {z} from "zod";

const YT_REGEX = new RegExp(
    "^((https?:)?\\/\\/)?((www|m)\\.)?(youtube\\.com|youtu.be)\\/(watch\\?v=|embed\\/|v\\/|playlist\\?list=|channel\\/|user\\/|\\S+)?([\\w\\-]+)(\\S+)?$"
);
const createStreamSchema = z.object({
    url : z.string()
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

        const res = await youtubesearchapi.GetVideoDetails(extractedId);

        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: {width: number}, b: {width: number}) => a.width < b.width ? -1 : 1);

        const stream = await prismaClient.stream.create({
            data : {
                userId : clerkUser.id,
                extractedId,
                url : data.url,
                type : "Youtube",
                title : res.title ?? "video unavailable",
                smallImg : thumbnails[0].url ?? "https://plus.unsplash.com/premium_photo-1682310096066-20c267e20605?q=80&w=912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                bigImg : thumbnails[thumbnails.length - 1].url ?? "https://plus.unsplash.com/premium_photo-1682310096066-20c267e20605?q=80&w=912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    console.log(creatorId);

    try{
        const streams = await prismaClient.stream.findMany({
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