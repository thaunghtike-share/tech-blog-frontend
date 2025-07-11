"use client"

import React from "react"
import { MinimalHeader } from "@/components/minimal-header"
import { MinimalHero } from "@/components/minimal-hero"
import { MinimalBlogList } from "@/components/minimal-blog-list"
import { MinimalSidebar } from "@/components/minimal-sidebar"
import { MinimalFooter } from "@/components/minimal-footer"
import { MinimalDevopsRoadmap } from "@/components/minimal-devops-roadmap"
import { CertificationRoadmap } from "@/components/CertificationRoadmap"
import { MinimalFAQs } from "@/components/minimal-faqs"
import { MinimalFeaturedProjects } from "@/components/minimal-featured-projects"
import { TopUdemyCourses } from "@/components/TopUdemyCourses"
import { FreelanceServicesSection } from "@/components/FreelanceServicesSection"
import { DevOpsWorkflowExample } from "@/components/DevOpsWorkflowExample"
import { AuthorsContributorsCTA } from "@/components/AuthorsContributorsCTA"
import { SuccessStoriesSection } from "@/components/SuccessStoriesSection"
import { RecommendedPaidCourses } from "@/components/RecommendedPaidCourses"
import { YouTubePlaylistsMM } from "@/components/YouTubePlaylistsMM"
import { YouTubePlaylists } from "@/components/YouTubePlaylists"
import { FreeLabs } from "@/components/FreeLabs"
import Intro from "@/components/Intro"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

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

      {/* Header and Hero */}
      <MinimalHeader />
      <MinimalHero />

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-row gap-6 overflow-x-auto md:overflow-visible scrollbar-hide">
          {/* Blog List (main content) */}
          <div className="w-full md:flex-1 md:min-w-0 bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-blue-100">
            <MinimalBlogList />
          </div>

          {/* Sidebar - appears to the right on all screens */}
          <div className="hidden md:block w-[300px] flex-shrink-0 sticky top-6 h-fit">
            <MinimalSidebar />
          </div>
        </div>

        {/* Other Sections */}
        <Intro />
        <section id="devops-roadmap">
          <MinimalDevopsRoadmap />
        </section>
        <section id="youtube-playlists">
        <YouTubePlaylists />
        </section>
        <section id="free-labs">
        <FreeLabs />
        </section>
        <section id="myanmar-playlists">
        <YouTubePlaylistsMM />
        </section>
        <section id="free-udemy">
        <TopUdemyCourses />
        </section>
        <RecommendedPaidCourses />
        <CertificationRoadmap />

        <div className="mt-20">
          <FreelanceServicesSection />
        </div>

        <DevOpsWorkflowExample />
        <MinimalFeaturedProjects />
        <SuccessStoriesSection />
        <AuthorsContributorsCTA />
        <MinimalFAQs />
      </main>

      {/* Footer */}
      <MinimalFooter />
    </div>
  )
}