// app/privacy/page.tsx
"use client";

import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import {
  Shield,
  Lock,
  User,
  Database,
  Eye,
  Mail,
  FileText,
  CheckCircle,
  XCircle,
  Server,
  Key,
  Users,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const privacyPrinciples = [
    {
      icon: Shield,
      title: "Zero Tracking",
      description: "No analytics, no cookies, no surveillance",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Lock,
      title: "Data Minimalism",
      description: "Only collect what's absolutely necessary",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Built for DevOps professionals, by DevOps professionals",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "Azure AKS with enterprise-grade security",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  const dataCollection = [
    {
      icon: Mail,
      title: "Authentication Only",
      items: ["Email address for login", "No marketing communications"],
    },
    {
      icon: User,
      title: "Public Profile",
      items: ["Optional display name", "Professional bio", "Avatar image"],
    },
    {
      icon: BookOpen,
      title: "Community Content",
      items: ["Published articles", "Technical tutorials", "Code examples"],
    },
  ];

  const securityFeatures = [
    {
      icon: Database,
      title: "Azure AKS",
      description: "Enterprise-grade Kubernetes infrastructure",
    },
    {
      icon: Key,
      title: "Encrypted Auth",
      description: "Passwords hashed with bcrypt",
    },
    {
      icon: Shield,
      title: "No Third Parties",
      description: "Your data stays with us",
    },
    {
      icon: Lock,
      title: "Regular Updates",
      description: "Security patches applied automatically",
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <MinimalHeader />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-20"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-sky-100 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
          </div>

          <div className="max-w-4xl">
            {/* Header - Moved to left side like your example */}
            <div className="max-w-3xl mb-16">
              <div className="h-1 w-24 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full mb-6"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                Privacy Policy
                <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Simple & Transparent
                </span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe in keeping things simple. No tracking, no cookies, no
                newsletters - just a clean DevOps learning community built on
                trust and transparency.
              </p>
            </div>

            {/* Last Updated */}
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-700 font-medium">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </motion.section>

        {/* Privacy Principles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Privacy Principles
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Four simple principles that guide how we handle your data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${principle.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <principle.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Data Collection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
            </div>

            <div className="relative z-10">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What We Collect
                </h2>
                <p className="text-blue-100 text-lg mb-12 max-w-2xl">
                  Only the bare minimum needed for author accounts. Regular
                  readers can access all content completely anonymously.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {dataCollection.map((section, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">
                        {section.title}
                      </h3>
                      <ul className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center gap-3 text-blue-100"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Security & Infrastructure */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Enterprise-Grade Security
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We use the same infrastructure trusted by Fortune 500 companies,
                ensuring your data is protected with industry-leading security
                practices.
              </p>

              <div className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <feature.icon className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 border border-slate-200">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Server className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Azure AKS Infrastructure
                </h3>
                <p className="text-slate-600 mb-6">
                  Built on Microsoft Azure Kubernetes Service with automated
                  security updates and enterprise-grade reliability.
                </p>
                <div className="inline-flex items-center gap-2 bg-white border border-slate-300 rounded-full px-4 py-2 text-slate-700 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  SOC 2 Compliant Infrastructure
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Questions About Your Data?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                We're developers building for developers. We believe in complete
                transparency and are always happy to answer questions about how
                we handle your data.
              </p>
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/30">
                <Eye className="w-5 h-5" />
                <span className="font-semibold">100% Transparent</span>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <MinimalFooter />
    </div>
  );
}
