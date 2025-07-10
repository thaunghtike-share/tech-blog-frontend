"use client"

import { useSearchParams } from "next/navigation"
import {
  Cloud,
  Server,
  Database,
  GitBranch,
  Cpu,
  Zap,
  Code,
  ArrowRight,
} from "lucide-react"

import { MinimalHeader } from "@/components/minimal-header"
import { MinimalBlogList } from "@/components/minimal-blog-list"
import { MinimalSidebar } from "@/components/minimal-sidebar"
import { MinimalFooter } from "@/components/minimal-footer"
import { MinimalHero } from "@/components/minimal-hero"

export default function ArticlesPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-x-hidden">
      <MinimalHeader />
      <MinimalHero />

      <main className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Articles List */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/50">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Recent Articles</h2>
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
          <div className="hidden lg:block lg:col-span-1">
            <MinimalSidebar />
          </div>
        </div>
      </main>

      <MinimalFooter />
    </div>
  )
}