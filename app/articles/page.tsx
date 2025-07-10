"use client"

import { useSearchParams } from "next/navigation"
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
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-16">
          {/* Articles List */}
          <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/50">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Recent Articles</h2>
              {/* Your filters here */}
            </div>

            <MinimalBlogList searchQuery={searchQuery} />

            <div className="flex justify-center mt-12">
              {/* pagination buttons */}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <MinimalSidebar />
          </aside>
        </div>
      </main>

      <MinimalFooter />
    </div>
  )
}