import Link from "next/link"

export function MinimalFooter() {
  return (
    <footer className="bg-white mt-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-light tracking-wide mb-6 block text-gray-900">
              Learn<span className="font-semibold text-blue-600">DevOps</span>
            </Link>
            <p className="text-gray-600 font-light leading-relaxed mb-8 max-w-md">
              Expert insights on DevOps, AI/ML, MLOps, and cloud technologies. Written by practitioners, curated for
              engineers building the future of software delivery.
            </p>
            <div className="flex space-x-6">
              <Link href="/twitter" className="text-gray-500 hover:text-blue-600 transition-colors">
                Twitter
              </Link>
              <Link href="/github" className="text-gray-500 hover:text-blue-600 transition-colors">
                GitHub
              </Link>
              <Link href="/linkedin" className="text-gray-500 hover:text-blue-600 transition-colors">
                LinkedIn
              </Link>
              <Link href="/rss" className="text-gray-500 hover:text-blue-600 transition-colors">
                RSS
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-6 text-gray-900">Explore</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/articles" className="text-gray-600 hover:text-blue-600 transition-colors font-light">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors font-light">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-gray-600 hover:text-blue-600 transition-colors font-light">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-light">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-6 text-gray-900">Connect</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/newsletter" className="text-gray-600 hover:text-blue-600 transition-colors font-light">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-light">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors font-light">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors font-light">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 font-light text-sm">© 2025 LearnDevOps. All rights reserved.</p>
          <p className="text-gray-500 font-light text-sm mt-4 md:mt-0">Made with care for the learning community.</p>
        </div>
      </div>
    </footer>
  )
}