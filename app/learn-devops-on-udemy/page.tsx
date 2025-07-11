"use client"

import { useSearchParams } from "next/navigation"
import { MinimalHeader } from "@/components/minimal-header"
import { MinimalSidebar } from "@/components/minimal-sidebar"
import { MinimalFooter } from "@/components/minimal-footer"
import { YouTubePlaylists } from "@/components/YouTubePlaylists"
import { YouTubePlaylistsMM } from "@/components/YouTubePlaylistsMM"
import { TopUdemyCourses } from "@/components/TopUdemyCourses"

export default function LearnDevOpsOnUtube() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-x-hidden">
    {/* Messenger Support Floating Button */}
      <a
        href="https://m.me/learndevopsnowbytho"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with me on Messenger"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-2 cursor-pointer transition-transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 240 240"
          fill="none"
          className="w-10 h-10 rounded-full"
        >
          <defs>
            <linearGradient id="messengerGradient" x1="0" y1="0" x2="240" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E1306C" />
              <stop offset="1" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <circle cx="120" cy="120" r="120" fill="url(#messengerGradient)" />
          <path
            fill="#fff"
            d="M158.8 80.2l-37.8 44.3-19.2-22.6-41 44.4 56.2-58.7 21 23.7 41-44.3z"
          />
        </svg>
        <span className="font-medium text-gray-900 select-none text-small whitespace-nowrap">
          Chat?
        </span>
      </a>
      {/* Full header with search */}
      <MinimalHeader />
      <TopUdemyCourses />
      <MinimalFooter />
    </div>
  )
}