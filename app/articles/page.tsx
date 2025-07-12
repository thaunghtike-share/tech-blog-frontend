"use client"
import { useSearchParams } from "next/navigation"
import { MinimalHeader } from "@/components/minimal-header"
import { MinimalBlogList } from "@/components/minimal-blog-list"
import { MinimalSidebar } from "@/components/minimal-sidebar"
import { MinimalFooter } from "@/components/minimal-footer"

export default function ArticlesPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      {/* Messenger Support Floating Button */}
      <a
        href="https://m.me/learndevopsnowbytho"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with me on Messenger"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white rounded-full shadow-lg px-3 py-2 cursor-pointer transition-transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="none" className="w-8 h-8 rounded-full">
          <defs>
            <linearGradient id="messengerGradient" x1="0" y1="0" x2="240" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E1306C" />
              <stop offset="1" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <circle cx="120" cy="120" r="120" fill="url(#messengerGradient)" />
          <path fill="#fff" d="M158.8 80.2l-37.8 44.3-19.2-22.6-41 44.4 56.2-58.7 21 23.7 41-44.3z" />
        </svg>
        <span className="font-medium text-gray-900 select-none text-sm whitespace-nowrap">Chat?</span>
      </a>
      <MinimalHeader />
      <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Articles List */}
          <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Recent Articles</h2>
              {/* Your filters here */}
            </div>
            <MinimalBlogList searchQuery={searchQuery} />
            <div className="flex justify-center mt-10">{/* pagination buttons */}</div>
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
