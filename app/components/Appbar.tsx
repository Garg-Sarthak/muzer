import { SignedOut, SignInButton, UserButton, SignedIn } from "@clerk/nextjs";

export default function Appbar(){
    return(
        <>
        <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </>
    )
}