"use client"  // <-- make page client component

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

import { MinimalHeader } from "@/components/minimal-header"
import { MinimalBlogList } from "@/components/minimal-blog-list"
import { MinimalSidebar } from "@/components/minimal-sidebar"
import { MinimalFooter } from "@/components/minimal-footer"

export default function ArticlesPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MinimalHeader />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-violet-100/80 via-sky-100/80 to-emerald-100/80 py-16 border-b border-white/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-light text-slate-900 mb-4 leading-relaxed">
            All <span className="font-semibold text-emerald-600">Articles</span>
          </h1>
          <p className="text-base text-slate-600 font-light max-w-lg mx-auto leading-relaxed">
            Explore our complete collection of DevOps, AI/ML, MLOps, and cloud infrastructure articles. Master the tools
            and practices that power modern software delivery.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Articles List */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/50">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-light text-slate-900">Latest Articles</h2>
              {/* Your filters here */}
            </div>

            {/* Pass searchQuery as prop */}
            <MinimalBlogList searchQuery={searchQuery} />

            {/* Pagination (keep as is or update later) */}
            <div className="flex justify-center mt-12">
              {/* pagination buttons */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <MinimalSidebar />
          </div>
        </div>
      </main>

      <MinimalFooter />
    </div>
  )
}