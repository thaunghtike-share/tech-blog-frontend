import Link from "next/link";
import { Facebook, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";

export function MinimalFooter() {
  return (
    <footer className="bg-gradient-to-r from-gray-50 via-white to-gray-100 py-16 md:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-12 pb-12">
          {/* Logo + Description */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-32 w-32 transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            <p className="text-base text-gray-800 leading-relaxed max-w-md font-medium">
              Your go-to resource for mastering DevOps, cloud-native
              technologies, and automation. Practical guides, tutorials, and
              real-world projects.
            </p>

            <div className="flex space-x-3 pt-4">
              <a
                href="https://www.linkedin.com/in/thaung-htike-oo-6672781b1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/thaunghtike-share"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-gray-400"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/learndevopsnowbytho"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:thaunghtikeoo.tho1234@gmail.com"
                className="p-3 bg-white rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 border border-gray-200 hover:border-red-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/articles", label: "Articles" },
                { href: "/categories", label: "Categories" },
                { href: "/authors", label: "Authors" },
                { href: "/about", label: "About Me" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 transition-all duration-300 block font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Resources</h3>
            <ul className="space-y-3">
              {[
                {
                  href: "/learn-devops-on-youtube",
                  label: "YouTube Tutorials",
                },
                {
                  href: "/learn-devops-on-udemy",
                  label: "Free Online Courses",
                },
                { href: "/free-labs", label: "Free DevOps Playgrounds" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 transition-all duration-300 block font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                { href: "/services/cloud-migration", label: "Cloud Migration" },
                {
                  href: "/services/infrastructure-automation",
                  label: "Infrastructure as Code",
                },
                {
                  href: "/services/part-time-devops-support",
                  label: "DevOps Support",
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 transition-all duration-300 block font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:thaunghtikeoo.tho1234@gmail.com"
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 flex items-center font-medium"
                >
                  <Mail className="h-4 w-4 mr-3 text-blue-500" />
                  <span>Email Me</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+959952492359"
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 flex items-center font-medium"
                >
                  <Phone className="h-4 w-4 mr-3 text-green-500" />
                  <span>+95 9952492359</span>
                </a>
              </li>
              <li className="text-gray-700 flex items-center font-medium">
                <MapPin className="h-4 w-4 mr-3 text-red-500" />
                <span>Yangon, Myanmar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-800 text-center md:text-left font-medium">
            &copy; {new Date().getFullYear()} Learn DevOps Now. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
