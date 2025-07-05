"use client"

import React from "react"

import { MinimalHeader } from "@/components/minimal-header"
import { MinimalHero } from "@/components/minimal-hero"
import { MinimalBlogList } from "@/components/minimal-blog-list"
import { MinimalSidebar } from "@/components/minimal-sidebar"
import { MinimalFooter } from "@/components/minimal-footer"
import { MinimalDevopsRoadmap } from "@/components/minimal-devops-roadmap"
import { MinimalProfileCard } from "@/components/minimal-profile-card"
import { MinimalWorkExperience } from "@/components/minimal-work-experience"
import { MinimalFAQs } from "@/components/minimal-faqs"
import { MinimalFeaturedProjects } from "@/components/minimal-featured-projects"
import { YouTubeTopChannels } from "@/components/YouTubeTopChannels"
import { TopUdemyCourses } from "@/components/TopUdemyCourses"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <MinimalHeader />
      <MinimalHero />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-100">
            <MinimalBlogList />
          </div>
          <div className="lg:col-span-1">
            <MinimalSidebar />
          </div>
        </div>

        <MinimalDevopsRoadmap />

        <MinimalFeaturedProjects />

        <YouTubeTopChannels />
        <TopUdemyCourses />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          <div className="lg:col-span-1">
            <MinimalProfileCard />
          </div>
          <div className="lg:col-span-2">
            <MinimalWorkExperience />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-16">
          <MinimalFAQs />
        </div>
      </main>

      <MinimalFooter />
    </div>
  )
}