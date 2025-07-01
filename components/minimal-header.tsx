import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"

export function MinimalHeader() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-light tracking-wide">
            Learn<span className="font-semibold">Blog</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors font-light">
              Articles
            </Link>
            <Link href="/topics" className="text-slate-600 hover:text-slate-900 transition-colors font-light">
              Topics
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors font-light">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="hidden sm:inline-flex bg-white/50 hover:bg-white/80 border-white/50 backdrop-blur-sm"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
