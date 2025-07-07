import Link from "next/link"
import { Facebook, Github, Linkedin, Mail, Twitter, BookOpen, Code2, Terminal, Layers, FileText } from "lucide-react"

export function MinimalFooter() {
  return (
    <footer className="bg-gradient-to-r from-slate-100 to-stone-100 mt-24 border-t border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-wide mb-6 flex items-center">
              <Terminal className="w-6 h-6 mr-2 text-indigo-600" />
              learn
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent ml-1">
                DevOps
              </span>
            </Link>

            <p className="text-slate-600 font-light leading-relaxed mb-6 max-w-md">
              Expert content on DevOps, AI/ML, and automation — written by engineers, for engineers.
            </p>
            
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-black/90 hover:bg-black text-white text-sm px-4 py-2 rounded-lg shadow transition-all"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-700/90 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow transition-all"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>

              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-700/90 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow transition-all"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-800 flex items-center">
              <Layers className="w-4 h-4 mr-2 text-indigo-500" />
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/articles" className="text-slate-600 hover:text-blue-600 flex items-center transition-colors">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-slate-600 hover:text-blue-600 flex items-center transition-colors">
                  <Code2 className="w-4 h-4 mr-2" />
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-600 hover:text-blue-600 flex items-center transition-colors">
                  <Terminal className="w-4 h-4 mr-2" />
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/cheatsheets" className="text-slate-600 hover:text-blue-600 flex items-center transition-colors">
                  <FileText className="w-4 h-4 mr-2" />
                  Cheatsheets
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-slate-800 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-indigo-500" />
              Connect
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-blue-600 transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-200/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone-500 font-light text-sm flex items-center">
            <span>© {new Date().getFullYear()} LearnDevOps. All rights reserved.</span>
          </p>
          <p className="text-stone-500 font-light text-sm mt-4 md:mt-0">
            Crafted with <span className="text-red-500">❤</span> by{" "}
            <a 
              href="https://linkedin.com/in/thaunghtikeoo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Thaung Htike Oo
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}