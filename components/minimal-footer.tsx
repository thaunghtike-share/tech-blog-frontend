import Link from "next/link"

export function MinimalFooter() {
  return (
    <footer className="bg-gradient-to-r from-slate-100 to-stone-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-light tracking-wide mb-6 block">
              Learn<span className="font-semibold text-green-600">Blog</span>
            </Link>
            <p className="text-slate-600 font-light leading-relaxed mb-8 max-w-md">
              Expert insights on DevOps, AI/ML, MLOps, and cloud technologies. Written by practitioners, curated for
              engineers building the future of software delivery.
            </p>
            <div className="flex space-x-6">
              <Link href="/twitter" className="text-stone-400 hover:text-slate-900 transition-colors">
                Twitter
              </Link>
              <Link href="/github" className="text-stone-400 hover:text-slate-900 transition-colors">
                GitHub
              </Link>
              <Link href="/linkedin" className="text-stone-400 hover:text-slate-900 transition-colors">
                LinkedIn
              </Link>
              <Link href="/rss" className="text-stone-400 hover:text-slate-900 transition-colors">
                RSS
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-6">Explore</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/articles" className="text-slate-600 hover:text-emerald-600 transition-colors font-light">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-600 hover:text-emerald-600 transition-colors font-light">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-slate-600 hover:text-emerald-600 transition-colors font-light">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-emerald-600 transition-colors font-light">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-6">Connect</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/newsletter" className="text-slate-600 hover:text-emerald-600 transition-colors font-light">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-emerald-600 transition-colors font-light">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-emerald-600 transition-colors font-light">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-emerald-600 transition-colors font-light">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone-400 font-light text-sm">© 2024 LearnBlog. All rights reserved.</p>
          <p className="text-stone-400 font-light text-sm mt-4 md:mt-0">Made with care for the learning community.</p>
        </div>
      </div>
    </footer>
  )
}