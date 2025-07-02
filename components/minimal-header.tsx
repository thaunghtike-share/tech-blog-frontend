import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"

export function MinimalHeader() {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-light tracking-wide text-gray-900">
            Learn<span className="font-semibold text-blue-600">DevOps</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-light">
              Home
            </Link>
            <Link href="/articles" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
              Articles
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors font-light">
              Categories
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-light">
              Contact
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-light">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="hidden sm:inline-flex bg-white hover:bg-blue-50 border-blue-200 backdrop-blur-sm text-gray-700 hover:text-blue-600"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
