// import { Button } from "@/components/ui/button"
// import { Music, Play, Users } from "lucide-react"
// import Link from "next/link"
// import { Input } from "@/components/ui/input"
// import { SignedOut, SignInButton, UserButton, SignedIn } from "@clerk/nextjs"


// export default function LandingPage() {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
//       <header className="px-4 lg:px-6 h-14 flex items-center">
//         <Link className="flex items-center justify-center" href="#">
//           <Music className="h-6 w-6 mr-2" />
//           <span className="font-bold">FanTunes</span>
//         </Link>
//         <nav className="ml-auto flex gap-4 sm:gap-6">
//           <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
//             About
//           </Link>
//           <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
//             Contact
//           </Link>
//           <SignedOut>
//               <SignInButton />
//           </SignedOut>
//           <SignedIn>
//               <UserButton />
//           </SignedIn>
//         </nav>
//       </header>
//       <main className="flex-1">
//         <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
//                   Connect Through Music
//                 </h1>
//                 <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
//                   FanTunes lets your audience shape your streaming playlist in real-time.
//                 </p>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="flex items-center space-x-2">
//                   <Play className="text-primary" />
//                   <span>Fan-Driven Playlists</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Users className="text-primary" />
//                   <span>Community Engagement</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center space-y-4 text-center">
//               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
//               <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
//                 Start your stream, share your unique FanTunes link, and let your audience vote on the next song. 
//                 It's that simple to create a collaborative music experience.
//               </p>
//               <Button size="lg">Try FanTunes</Button>
//             </div>
//           </div>
//         </section>



//       </main>
//       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
//         <p className="text-xs text-gray-400">FanTunes - A project for music lovers</p>
//         <nav className="sm:ml-auto flex gap-4 sm:gap-6">
//           <Link className="text-xs hover:underline underline-offset-4" href="#">
//             GitHub
//           </Link>
//         </nav>
//       </footer>
//     </div>
//   )
// }

import { Button } from "@/components/ui/button"
import { Music, Play, Users } from "lucide-react"
import Link from "next/link"
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs"
import Appbar from "./components/Appbar"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Music className="h-6 w-6 mr-2" />
          <span className="font-bold">FanTunes</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
          <Appbar/>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connect Through Music
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  FanTunes lets your audience shape your streaming playlist in real-time.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Play className="text-primary" />
                  <span>Fan-Driven Playlists</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="text-primary" />
                  <span>Community Engagement</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
              <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                Start your stream, share your unique FanTunes link, and let your audience vote on the next song. 
                It's that simple to create a collaborative music experience.
              </p>
              <SignedOut>
                <SignUpButton mode="modal" forceRedirectUrl="/dasboard">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Join FanTunes
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Welcome to FanTunes
                  </Button>
              </SignedIn>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">FanTunes - A project for music lovers</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            GitHub
          </Link>
        </nav>
      </footer>
    </div>
  )
}