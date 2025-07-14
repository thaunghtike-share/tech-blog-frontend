"use client"
import { MinimalHeader } from "@/components/minimal-header"
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
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm36 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      {/* Messenger Support Floating Button */}
      <a
        href="https://m.me/learndevopsnowbytho"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with me on Messenger"
        className="fixed top-[70%] right-1 z-50 flex items-center gap-4 bg-gradient-to-r from-white-600 via-purple-200 to-blue-400 shadow-lg px-3 py-0 rounded-full cursor-pointer transition-transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 240 240"
          fill="none"
          className="w-14 h-14 rounded-full"
        >
          <defs>
            <linearGradient
              id="messengerGradient"
              x1="0"
              y1="0"
              x2="240"
              y2="240"
              gradientUnits="userSpaceOnUse"
            >
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
        <span className="font-semibold text-white select-none text-lg whitespace-nowrap">
          Chat?
        </span>
      </a>

      {/* Fixed Header - no shadow on mobile */}
      <MinimalHeader />

      {/* Hero Intro with mobile spacing fix */}
      <div className="pt-[64px] md:pt-[80px] md:-mt-44">
        <Intro />
      </div>

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="-mt-10">
          <div className="flex flex-row gap-6 overflow-x-auto md:overflow-visible scrollbar-hide">
            <div className="w-full md:flex-1 md:min-w-0 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
              <MinimalBlogList />
            </div>
            <div className="hidden md:block w-[280px] flex-shrink-0 sticky top-6 h-fit">
              <MinimalSidebar />
            </div>
          </div>
        </div>

        {/* Other Sections */}
        <section id="devops-roadmap" className="-mt-15">
          <MinimalDevopsRoadmap />
        </section>
        <section id="youtube-playlists" className="-mt-10">
          <YouTubePlaylists />
        </section>
        <section id="free-labs" className="-mt-10">
          <FreeLabs />
        </section>
        <section id="myanmar-playlists" className="-mt-24">
          <YouTubePlaylistsMM />
        </section>
        <section id="free-udemy" className="-mt-12">
          <TopUdemyCourses />
        </section>
        <div className="-mt-24">
          <CertificationRoadmap />
        </div>
        <div className="-mt-24">
          <RecommendedPaidCourses />
        </div>
        <div className="mt-16 -mt-24">
          <FreelanceServicesSection />
        </div>
        <div className="-mt-22">
          <DevOpsWorkflowExample />
        </div>
        <div className="-mt-24">
          <MinimalFeaturedProjects />
        </div>
        <div className="-mt-24">
          <SuccessStoriesSection />
        </div>
        <div className="-mt-24">
          <AuthorsContributorsCTA />
        </div>
        <div className="-mt-36">
          <MinimalFAQs />
        </div>
      </main>

      {/* Footer */}
      <div className="-mt-6">
        <MinimalFooter />
      </div>
    </div>
  )
}