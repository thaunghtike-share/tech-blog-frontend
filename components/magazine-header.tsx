import { Button } from "@/components/ui/button"
import { Menu, Search, User } from "lucide-react"
import Link from "next/link"

export function MagazineHeader() {
  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <span>December 15, 2024</span>
            <span>•</span>
            <span>Issue #247</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/subscribe" className="hover:text-yellow-400 transition-colors">
              Subscribe
            </Link>
            <Link href="/login" className="hover:text-yellow-400 transition-colors">
              Login
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-6">
          <Link href="/" className="text-4xl font-bold tracking-tight">
            LEARN<span className="text-yellow-400">HUB</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/tech" className="text-lg hover:text-yellow-400 transition-colors">
              TECH
            </Link>
            <Link href="/design" className="text-lg hover:text-yellow-400 transition-colors">
              DESIGN
            </Link>
            <Link href="/career" className="text-lg hover:text-yellow-400 transition-colors">
              CAREER
            </Link>
            <Link href="/tutorials" className="text-lg hover:text-yellow-400 transition-colors">
              TUTORIALS
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-gray-800">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
