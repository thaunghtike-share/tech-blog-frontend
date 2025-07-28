import Link from "next/link";
import { Facebook, Linkedin, Youtube, Github, Mail } from "lucide-react";

export function MinimalFooter() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-700 py-8 md:py-12 relative z-10 border-t border-gray-200">
      {/* Subtle background pattern - moved to be a sibling of the content container */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm36 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 pb-6 md:pb-8">
          {/* Logo + Description - Full width on mobile */}
          <div className="col-span-2 md:col-span-2 order-1">
            <Link href="/" className="inline-block mb-3 md:mb-4">
              <div className="flex items-center -mt-10 md:-mt-8">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-29 md:h-32 w-auto md:mr-3"
                />
              </div>
            </Link>
            <p className="text-sm md:text-sm text-gray-600 -mt-8 md:-mt-10">
              Your go-to resource for mastering DevOps, cloud-native
              technologies, and automation. Practical guides, tutorials, and
              real-world projects.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3 md:space-x-4 mt-7 md:mt-8">
              <a
                href="https://www.linkedin.com/in/thaung-htike-oo-6672781b1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="h-5 w-5 md:h-5 md:w-5" />
              </a>
              <a
                href="https://github.com/thaunghtike-share"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <Github className="h-5 w-5 md:h-5 md:w-5" />
              </a>
              <a
                href="https://www.facebook.com/learndevopsnowbytho"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700 transition-colors"
              >
                <Facebook className="h-5 w-5 md:h-5 md:w-5" />
              </a>
              <a
                href="mailto:thaunghtikeoo.tho1234@gmail.com"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Mail className="h-5 w-5 md:h-5 md:w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Stacked on mobile */}
          <div className="order-2 md:order-3">
            <h3 className="text-sm md:text-sm font-semibold text-gray-800 uppercase tracking-wider mb-2 md:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-1 md:space-y-3">
              <li>
                <Link
                  href="/articles"
                  className="text-sm md:text-sm hover:text-blue-600 transition-colors block"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm md:text-sm hover:text-blue-600 transition-colors block"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/authors"
                  className="text-sm md:text-sm hover:text-blue-600 transition-colors block"
                >
                  Authors
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm md:text-sm hover:text-blue-600 transition-colors block"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Resources - Stacked on mobile */}
          <div className="order-4">
            <h3 className="text-sm md:text-sm font-semibold text-gray-800 uppercase tracking-wider mb-2 md:mb-4">
              Resources
            </h3>
            <ul className="space-y-1 md:space-y-3">
              <li>
                <Link
                  href="/learn-devops-on-youtube"
                  className="text-sm md:text-sm hover:text-blue-600 transition-colors block"
                >
                  YouTube Playlists
                </Link>
              </li>
              <li>
                <Link
                  href="/learn-devops-on-udemy"
                  className="text-sm md:text-sm hover:text-blue-600 transition-colors block"
                >
                  Udemy Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/recommended-paid-courses"
                  className="text-sm md:text-sm hover:text-blue-600 transition-colors block"
                >
                  Paid Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/free-labs"
                  className="text-sm md:text-sm hover:text-blue-600 transition-colors block"
                >
                  Free Labs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Full width on mobile */}
          <div className="col-span-2 md:col-span-1 order-5 mt-4 md:mt-0">
            <h3 className="text-sm md:text-sm font-semibold text-gray-800 uppercase tracking-wider mb-2 md:mb-4">
              Contact
            </h3>
            <ul className="space-y-1 md:space-y-3">
              <li className="text-sm md:text-sm">
                thaunghtikeoo.tho1234@gmail.com
              </li>
              <li className="text-sm md:text-sm">+95 9952492359</li>
              <li className="text-sm md:text-sm">Yangon, Myanmar</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Learn DevOps Now. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
