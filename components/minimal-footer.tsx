import Link from "next/link"
import { Facebook, Linkedin, Youtube, Github, Mail } from "lucide-react"

export function MinimalFooter() {
  return (
    <footer className="bg-gray-50 text-gray-700 py-10 md:py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm36 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-200 pb-8 mb-8 items-start">
          {/* Logo + tagline in first column, spans 2 columns on mobile */}
          <div className="flex flex-col col-span-2 md:col-span-1 pr-4">
            <Link href="/" className="inline-block mb-4">
              <img src="/logo.png" alt="Logo" className="h-20 w-auto" />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your go-to resource for mastering DevOps, cloud-native technologies, and automation. We provide practical
              guides, tutorials, and real-world projects.
            </p>
          </div>

          {/* Quick Links column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/articles" className="hover:text-blue-600 transition-colors font-medium">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-blue-600 transition-colors font-medium">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/authors" className="hover:text-blue-600 transition-colors font-medium">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/free-labs" className="hover:text-blue-600 transition-colors font-medium">
                  Free Labs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors font-medium">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/learn-devops-on-youtube" className="hover:text-blue-600 transition-colors font-medium">
                  YouTube Playlists
                </Link>
              </li>
              <li>
                <Link href="/learn-devops-on-udemy" className="hover:text-blue-600 transition-colors font-medium">
                  Udemy Free Courses
                </Link>
              </li>
              <li>
                <Link href="/recommended-paid-courses" className="hover:text-blue-600 transition-colors font-medium">
                  Recommended Paid Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                <a
                  href="mailto:thaunghtike.tho1234@gmail.com"
                  className="hover:text-blue-600 transition-colors font-medium"
                >
                  Email Us
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="https://www.linkedin.com/in/thaung-htike-oo-devops/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-600 transition-colors font-medium"
                >
                  <Linkedin className="h-5 w-5 mr-2 text-blue-600" />
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="https://www.youtube.com/@learndevopsnowbytho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-600 transition-colors font-medium"
                >
                  <Youtube className="h-5 w-5 mr-2 text-red-600" />
                  YouTube
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="https://github.com/thaunghtikeoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-600 transition-colors font-medium"
                >
                  <Github className="h-5 w-5 mr-2 text-gray-700" />
                  GitHub
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="https://www.facebook.com/learndevopsnowbytho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-600 transition-colors font-medium"
                >
                  <Facebook className="h-5 w-5 mr-2 text-blue-700" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Learn DevOps Now. All rights reserved.
        </div>
      </div>
    </footer>
  )
}