import Link from "next/link";
import { Facebook, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";

export function MinimalFooter() {
  return (
    <footer className="bg-white/95 py-16 md:py-20 relative z-10">
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

            {/* Social Media with colored backgrounds */}
            <div className="flex space-x-3 pt-4">
              <a
                href="https://www.linkedin.com/in/thaung-htike-oo-6672781b1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-xl text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all duration-300 border border-gray-200 hover:border-[#0077B5] shadow-sm hover:shadow-md hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/thaunghtike-share"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-xl text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 border border-gray-200 hover:border-gray-800 shadow-sm hover:shadow-md hover:scale-110"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/learndevopsnowbytho"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-xl text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300 border border-gray-200 hover:border-[#1877F2] shadow-sm hover:shadow-md hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:thaunghtikeoo.tho1234@gmail.com"
                className="p-3 bg-white rounded-xl text-[#EA4335] hover:bg-[#EA4335] hover:text-white transition-all duration-300 border border-gray-200 hover:border-[#EA4335] shadow-sm hover:shadow-md hover:scale-110"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/articles", label: "Articles" },
                { href: "/categories", label: "Categories" },
                { href: "/about", label: "About Me" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-black hover:text-blue-700 transition-all duration-300 block font-medium hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                {
                  href: "/learn-devops-on-youtube",
                  label: "YouTube Tutorials",
                },
                {
                  href: "/learn-devops-on-udemy",
                  label: "Online Courses",
                },
                { href: "/free-labs", label: "DevOps Playgrounds" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-black hover:text-green-700 transition-all duration-300 block font-medium hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Services
            </h3>
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
                    className="text-black hover:text-orange-700 transition-all duration-300 block font-medium hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:thaunghtikeoo.tho1234@gmail.com"
                  className="text-black hover:text-purple-700 transition-all duration-300 flex items-center font-medium hover:translate-x-1"
                >
                  <Mail className="h-4 w-4 mr-3 text-purple-500" />
                  <span>Email Me</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+959952492359"
                  className="text-black hover:text-purple-700 transition-all duration-300 flex items-center font-medium hover:translate-x-1"
                >
                  <Phone className="h-4 w-4 mr-3 text-green-500" />
                  <span>+95 9952492359</span>
                </a>
              </li>
              <li className="text-black flex items-center font-medium">
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
