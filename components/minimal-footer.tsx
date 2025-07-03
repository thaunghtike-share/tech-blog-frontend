import Link from "next/link"
import { Facebook, Github, Linkedin } from "lucide-react"

export function MinimalFooter() {
  return (
    <footer className="bg-gradient-to-r from-slate-100 to-stone-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand & Description */}
          <div>
            <Link href="/" className="text-2xl font-light tracking-wide mb-6 block">
              Learn
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                DevOps
              </span>
            </Link>

            <p className="text-slate-600 font-light leading-relaxed mb-6 max-w-sm">
              Expert content on DevOps, AI/ML, and automation — written by engineers, for engineers.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-black hover:bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md shadow"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-700 hover:bg-blue-800 text-white text-sm px-3 py-1.5 rounded-md shadow"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Facebook Block */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-800">Follow Us</h3>
            <p className="text-slate-600 font-light text-sm mb-4">
              Stay updated with new articles and tips on our Facebook page.
            </p>
            <a
              href="https://facebook.com/thaunghtikeoo.devops"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md shadow"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Follow on Facebook
            </a>
          </div>

          {/* Legal / Support */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-800">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-emerald-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-emerald-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-emerald-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-emerald-600">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone-400 font-light text-sm"> © {new Date().getFullYear()} LearnDevOps. All rights reserved.</p>
          <p className="text-stone-400 font-light text-sm mt-4 md:mt-0"> Built with 💻 by{" "}
            <a href="https://linkedin.com/in/thaunghtikeoo" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors">
              Thaung Htike Oo
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}