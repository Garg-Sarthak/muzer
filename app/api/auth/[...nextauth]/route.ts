import { NextResponse } from "next/server";
import nextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google"

const handler = nextAuth({
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ]
})


// export function GET(){
//     return NextResponse.json({
//         message : "hi there"
//     })
// }

export {handler as GET, handler as POST}