// "use client"
// // import { SignedIn } from "@clerk/nextjs"
// // import { currentUser, User } from "@clerk/nextjs/server"
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react"

// export default async function Redirect({session}: any){
//     const Router = useRouter();
//     const { isSignedIn, user, isLoaded } = useUser()

//     useEffect(() => {
//         if (!isSignedIn){
//             Router.push('/');
//         }else{
//             Router.push('/dashboard')
//         }
//     },[])

//     return null
// }