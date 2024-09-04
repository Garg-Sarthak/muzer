import { Button } from "@/components/ui/button"
import { MusicIcon } from "lucide-react"

export default function Btn() {
  return (
    <Button
      variant="outline"
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <MusicIcon className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  )
}