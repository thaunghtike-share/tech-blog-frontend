"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Code, Cloud, Cpu, Server, Database, GitBranch } from "lucide-react"

export function MinimalHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-emerald-50/80 py-16 md:py-24 border-b border-gray-200/50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Floating icons */}
      <Cloud className="absolute top-20 left-10 text-blue-200/60 w-12 h-12 hidden md:block" />
      <Server className="absolute bottom-20 right-10 text-indigo-200/60 w-12 h-12 hidden md:block" />
      <Database className="absolute top-1/3 right-20 text-emerald-200/60 w-10 h-10 hidden md:block" />
      <GitBranch className="absolute bottom-1/4 left-20 text-blue-200/60 w-10 h-10 hidden md:block" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white text-blue-600 text-xs font-medium px-4 py-2 rounded-full mb-5 shadow-sm border border-gray-200/50">
          <Zap className="h-3 w-3" />
          <span>DevOps • Automation • AI/ML</span>
          <Code className="h-3 w-3 ml-1" />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          <span className="text-gray-800">Thaung Htike Oo - </span>{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-flex items-center">
            <Cpu className="w-8 h-8 mr-2" />
            Learn DevOps
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed mb-8">
          Practical guides on Kubernetes, Terraform, MLOps and cloud-native architectures — helping engineers build scalable, resilient systems.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button 
            size="lg"
            className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-all"
          >
            <Code className="mr-2 h-4 w-4" />
            Explore Articles
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-gray-300 bg-white/50 hover:bg-white text-gray-700 shadow-sm flex items-center"
          >
            <Cloud className="mr-2 h-4 w-4" />
            View Projects
          </Button>
        </div>
        
        {/* Tech stack indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 text-gray-500 text-sm">
          <span className="flex items-center">
            <Server className="w-4 h-4 mr-1" /> Kubernetes
          </span>
          <span className="flex items-center">
            <GitBranch className="w-4 h-4 mr-1" /> Terraform
          </span>
          <span className="flex items-center">
            <Database className="w-4 h-4 mr-1" /> MLOps
          </span>
          <span className="flex items-center">
            <Cloud className="w-4 h-4 mr-1" /> Cloud
          </span>
          <span className="flex items-center">
            <Cpu className="w-4 h-4 mr-1" /> CI/CD
          </span>
        </div>
      </div>
    </section>
  )
}