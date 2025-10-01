import Link from "next/link";
import {
  Facebook,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export function MinimalFooter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 md:py-20 relative z-10">
      {/* Background Effects - Match homepage exactly */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.05)_50%,transparent_75%)] bg-[length:6px_6px] opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-12 pb-12">
          {/* Logo + Description - Increased logo size */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center">
                <img
                  src="/newlogo.png"
                  alt="Logo"
                  className="h-32 w-32 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                />
              </div>
            </Link>
            <p className="text-lg text-white/85 leading-relaxed max-w-md">
              Your go-to resource for mastering DevOps, cloud-native
              technologies, and automation. Practical guides, tutorials, and
              real-world projects.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 pt-4">
              <a
                href="https://www.linkedin.com/in/thaung-htike-oo-6672781b1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://github.com/thaunghtike-share"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 hover:border-gray-500/30 transition-all duration-300 group"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com/learndevopsnowbytho"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group"
              >
                <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:thaunghtikeoo.tho1234@gmail.com"
                className="p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links - Clean design without dots */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/articles", label: "Articles" },
                { href: "/categories", label: "Categories" },
                { href: "/authors", label: "Authors" },
                { href: "/about", label: "About Me" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Resources - Clean design without dots */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">
              Resources
            </h3>
            <ul className="space-y-4">
              {[
                {
                  href: "/learn-devops-on-youtube",
                  label: "YouTube Tutorials",
                },
                { href: "/learn-devops-on-udemy", label: "Free Online Courses" },
                { href: "/free-labs", label: "Free DevOps Playgrounds" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Clean design without dots */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">
              Services
            </h3>
            <ul className="space-y-4">
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
                    className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Clean design */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:thaunghtikeoo.tho1234@gmail.com"
                  className="text-white/80 hover:text-white transition-all duration-300 flex items-center group py-1"
                >
                  <Mail className="h-4 w-4 mr-3 text-purple-400" />
                  <span>Email Me</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+959952492359"
                  className="text-white/80 hover:text-white transition-all duration-300 flex items-center group py-1"
                >
                  <Phone className="h-4 w-4 mr-3 text-green-400" />
                  <span>+95 9952492359</span>
                </a>
              </li>
              <li className="text-white/80 flex items-center group py-1">
                <MapPin className="h-4 w-4 mr-3 text-red-400" />
                <span>Yangon, Myanmar</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright - Clean design */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/80 text-center md:text-left text-sm">
            &copy; {new Date().getFullYear()} Learn DevOps Now. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}