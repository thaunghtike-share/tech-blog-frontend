import Link from "next/link"
import { Facebook, Linkedin, Youtube, Github, Mail } from "lucide-react"

export function MinimalFooter() {
  return (
    <footer className="bg-gray-50 text-gray-700 py-10 md:py-12 relative z-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-200 pb-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-full md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <img src="/logo.png" alt="Logo" className="h-28 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-gray-600">
              Your go-to resource for mastering DevOps, cloud-native technologies, and automation. We provide practical
              guides, tutorials, and real-world projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articles" className="hover:text-blue-600 transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-blue-600 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/authors" className="hover:text-blue-600 transition-colors">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/free-labs" className="hover:text-blue-600 transition-colors">
                  Free Labs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn-devops-on-youtube" className="hover:text-blue-600 transition-colors">
                  YouTube Playlists
                </Link>
              </li>
              <li>
                <Link href="/learn-devops-on-udemy" className="hover:text-blue-600 transition-colors">
                  Udemy Free Courses
                </Link>
              </li>
              <li>
                <Link href="/recommended-paid-courses" className="hover:text-blue-600 transition-colors">
                  Recommended Paid Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <a href="mailto:thaunghtike.tho1234@gmail.com" className="hover:text-blue-600 transition-colors">
                  Email Us
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="https://www.linkedin.com/in/thaung-htike-oo-devops/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="h-4 w-4 mr-2 text-gray-500" />
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="https://www.youtube.com/@learndevopsnowbytho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-600 transition-colors"
                >
                  <Youtube className="h-4 w-4 mr-2 text-gray-500" />
                  YouTube
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="https://github.com/thaunghtikeoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-600 transition-colors"
                >
                  <Github className="h-4 w-4 mr-2 text-gray-500" />
                  GitHub
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="https://www.facebook.com/learndevopsnowbytho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-600 transition-colors"
                >
                  <Facebook className="h-4 w-4 mr-2 text-gray-500" />
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
