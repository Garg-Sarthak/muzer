"use client"
import { useUser } from "@clerk/clerk-react"
import { useRouter } from "next/navigation";
import { useSession } from '@clerk/clerk-react'
// import { currentUser } from "@clerk/nextjs/server";

// import Redirect from "../components/Redirect";
import {useEffect} from "react"

export default function main(){
    const { user } = useUser();
    const { isLoaded, session, isSignedIn } = useSession()
    const router = useRouter();
    console.log(isSignedIn?.valueOf());
    
    useEffect(() => {
        // Ensure session is loaded before making a decision
        if (isLoaded) {
            if (!isSignedIn) {
                // Redirect to sign-in page if not signed in
                router.push("/");
            }
        }
    }, [isLoaded, isSignedIn, router]);


    return (
        <div>
            {/* hello */}
            {user?.emailAddresses[0].emailAddress}
            {isSignedIn?.toString()}
            
        </div>
    )
}