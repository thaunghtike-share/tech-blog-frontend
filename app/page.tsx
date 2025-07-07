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
import { YouTubeTopChannels } from "@/components/YouTubeTopChannels"
import { TopUdemyCourses } from "@/components/TopUdemyCourses"
import { FreelanceServicesSection } from "@/components/FreelanceServicesSection"
import { DevOpsWorkflowExample } from "@/components/DevOpsWorkflowExample"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <MinimalHeader />
      <MinimalHero />

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Blog + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-100">
            <MinimalBlogList />
          </div>
          <div className="lg:col-span-1">
            <MinimalSidebar />
          </div>
        </div>

        {/* Roadmap, YouTube, Udemy */}
        <MinimalDevopsRoadmap />
        <CertificationRoadmap />

        {/* YouTube Channels and Udemy Courses */}
        <YouTubeTopChannels />
        <TopUdemyCourses />

        {/* Freelance Services */}
        <div className="mt-20">
          <FreelanceServicesSection />
        </div>

        <DevOpsWorkflowExample />

        {/* About + Projects */}
        <MinimalFeaturedProjects />

        {/* FAQs */}
          <MinimalFAQs />
      </main>

      <MinimalFooter />
    </div>
  )
}
