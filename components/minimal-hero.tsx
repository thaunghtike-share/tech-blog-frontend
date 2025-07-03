"use client"

import { Button } from "@/components/ui/button"

export function MinimalHero() {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 py-14 border-b border-white/50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1 rounded-full mb-4 shadow-sm">
          DevOps • Automation • AI
        </div>
        
        <h2 className="text-xl md:text-3xl font-light text-slate-900 mb-3 tracking-wide">
          <span className="font-tight text-black-700"> Thaung Htike Oo - </span> <span className="font-medium text-blue-600">Learn DevOps Now</span>
        </h2>

        <p className="text-sm md:text-base text-slate-700 font-light max-w-xl mx-auto leading-relaxed mb-6">
          In-depth articles on DevOps, AI/ML, MLOps, cloud infrastructure, and automation — curated for engineers building scalable, intelligent systems.
        </p>

        <div className="flex justify-center">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-normal text-sm px-6 py-2 rounded-md shadow-lg">
            Start Reading 📚
          </Button>
        </div>
      </div>
    </section>
  )
}