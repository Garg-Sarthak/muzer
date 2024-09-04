import { SignedOut, SignInButton, UserButton, SignedIn, SignIn } from "@clerk/nextjs";
import Btn from "./Btn";

export default function Appbar(){
    return(
        <>
        <SignedOut>
              <SignInButton forceRedirectUrl={"/dashboard"}>
                <Btn/>
              </SignInButton>

            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </>
    )
}