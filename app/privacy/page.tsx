// app/privacy/page.tsx
"use client";

import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import { Shield, Lock, User, Database, Eye, Mail, FileText, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const features = [
    {
      icon: CheckCircle,
      title: "No Tracking",
      description: "We don't use Google Analytics or any tracking scripts"
    },
    {
      icon: CheckCircle,
      title: "No Cookies",
      description: "We don't use cookies for tracking or advertising"
    },
    {
      icon: CheckCircle,
      title: "No Newsletters",
      description: "We don't send marketing emails or newsletters"
    },
    {
      icon: CheckCircle,
      title: "No Third Parties",
      description: "We don't share data with third-party services"
    }
  ];

  const dataPoints = [
    {
      icon: Mail,
      title: "Email Address",
      description: "For author authentication only"
    },
    {
      icon: User,
      title: "Profile Information",
      description: "Optional bio, avatar, and job title"
    },
    {
      icon: FileText,
      title: "Published Articles",
      description: "Content you choose to share with the community"
    }
  ];

  const rights = [
    "View and update your profile information",
    "Request account deletion at any time",
    "Maintain ownership of your published content",
    "Get answers about your data usage"
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <MinimalHeader />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-semibold mb-6 shadow-lg">
            <Shield className="w-4 h-4" />
            Privacy Policy
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Simple & Transparent
            <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Data Practices
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We believe in keeping things simple. No tracking, no cookies, no newsletters - 
            just a clean DevOps learning community built on trust and transparency.
          </p>
        </motion.section>

        {/* Last Updated Badge */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl px-6 py-3 shadow-sm">
            <p className="text-slate-700 font-medium">
              Last Updated: <span className="text-sky-600">{new Date().toLocaleDateString()}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* What We Collect */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Information We Collect</h2>
                  <p className="text-slate-600">Only what's necessary for author accounts</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dataPoints.map((item, index) => (
                  <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <item.icon className="w-5 h-5 text-sky-600" />
                      </div>
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="text-slate-700 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <p className="text-blue-700 font-medium text-center">
                  Regular readers can browse all content without providing any personal information
                </p>
              </div>
            </div>
          </div>

          {/* What We Don't Do */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">What We Don't Do</h2>
                <p className="text-slate-600">Our privacy promises</p>
              </div>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
                  <feature.icon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">{feature.title}</h3>
                    <p className="text-green-700 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Usage & Security */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Data Usage */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">How We Use Data</h2>
                <p className="text-slate-600">Simple and purposeful</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">For Authors</h3>
                <p className="text-blue-700 text-sm">Email for authentication, profile for community recognition</p>
              </div>
              
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                <h3 className="font-semibold text-indigo-900 mb-2">For Content</h3>
                <p className="text-indigo-700 text-sm">Articles are publicly visible to help the DevOps community learn</p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">No Other Uses</h3>
                <p className="text-slate-700 text-sm">We don't use your data for marketing, analytics, or any other purposes</p>
              </div>
            </div>
          </div>

          {/* Security & Rights */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Security & Your Rights</h2>
                <p className="text-slate-600">Protected and empowered</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Infrastructure</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>• Hosted on Azure AKS (Azure Kubernetes Service)</p>
                  <p>• MySQL databases with standard security</p>
                  <p>• Passwords hashed (never plain text)</p>
                  <p>• Reasonable security practices implemented</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Your Rights</h3>
                <div className="space-y-2">
                  {rights.map((right, index) => (
                    <div key={index} className="flex items-center gap-3 text-slate-700">
                      <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                      <span className="text-sm">{right}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Built by Developers, for Developers
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              We keep things simple and respectful. No hidden agendas, no complicated policies - 
              just a clean platform for the DevOps community to learn and share knowledge.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Eye className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Transparent by Design</span>
            </div>
          </div>
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}