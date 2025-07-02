import Link from "next/link"

export function MinimalFooter() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-700 mt-24 border-t border-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-light tracking-wide mb-6 block text-white">
              Learn<span className="font-semibold text-blue-100">DevOps</span>
            </Link>
            <p className="text-blue-100 font-light leading-relaxed mb-8 max-w-md">
              Expert insights on DevOps, AI/ML, MLOps, and cloud technologies. Written by practitioners, curated for
              engineers building the future of software delivery.
            </p>
            <div className="flex space-x-6">
              <Link href="/twitter" className="text-blue-200 hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="/github" className="text-blue-200 hover:text-white transition-colors">
                GitHub
              </Link>
              <Link href="/linkedin" className="text-blue-200 hover:text-white transition-colors">
                LinkedIn
              </Link>
              <Link href="/rss" className="text-blue-200 hover:text-white transition-colors">
                RSS
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-6 text-white">Explore</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/articles" className="text-blue-100 hover:text-white transition-colors font-light">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-blue-100 hover:text-white transition-colors font-light">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-blue-100 hover:text-white transition-colors font-light">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-100 hover:text-white transition-colors font-light">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-6 text-white">Connect</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/newsletter" className="text-blue-100 hover:text-white transition-colors font-light">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-white transition-colors font-light">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-blue-100 hover:text-white transition-colors font-light">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-blue-100 hover:text-white transition-colors font-light">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-blue-500/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white font-light text-sm">© 2025 LearnDevOps. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}