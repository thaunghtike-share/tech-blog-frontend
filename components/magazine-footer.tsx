import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export function MagazineFooter() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-black mb-4">
              LEARN<span className="text-yellow-400">HUB</span>
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              The premier destination for developers, designers, and tech enthusiasts seeking cutting-edge insights and
              practical knowledge.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black mb-4">SECTIONS</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tech" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  TECH
                </Link>
              </li>
              <li>
                <Link href="/design" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  DESIGN
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  CAREER
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  TUTORIALS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-black mb-4">COMPANY</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  ABOUT
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  CONTACT
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  CAREERS
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  ADVERTISE
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">© 2024 LEARNHUB MAGAZINE. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  )
}
