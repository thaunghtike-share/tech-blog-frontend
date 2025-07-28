"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MinimalHeader } from "@/components/minimal-header";
import { FeaturedArticlesPage } from "@/components/featured-articles";
import { MinimalSidebar } from "@/components/minimal-sidebar";
import { MinimalFooter } from "@/components/minimal-footer";
import { MinimalDevopsRoadmap } from "@/components/minimal-devops-roadmap";
import { CertificationRoadmap } from "@/components/CertificationRoadmap";
import { MinimalFAQs } from "@/components/minimal-faqs";
import { TopUdemyCourses } from "@/components/TopUdemyCourses";
import { FreelanceServicesSection } from "@/components/FreelanceServicesSection";
import { DevOpsWorkflowExample } from "@/components/DevOpsWorkflowExample";
import { AuthorsContributorsCTA } from "@/components/AuthorsContributorsCTA";
import { SuccessStoriesSection } from "@/components/SuccessStoriesSection";
import { RecommendedPaidCourses } from "@/components/RecommendedPaidCourses";
import { YouTubePlaylists } from "@/components/YouTubePlaylists";
import { FreeLabs } from "@/components/FreeLabs";
import Intro from "@/components/Intro";
import { CareerPath } from "@/components/CareerPath";

export default function HomeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTag = searchParams.get("tag") || null;
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedTag) {
      params.set("tag", selectedTag);
    } else {
      params.delete("tag");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl);
  }, [selectedTag, router]);

  const updateTagFilter = (tagSlug: string | null) => {
    setSelectedTag(tagSlug);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm36 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <MinimalHeader />
      <div className="pt-[66px] -mt-48 md:pt-[80px] md:-mt-44">
        <Intro />
      </div>
      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="-mt-20 md:-mt-18">
          <div className="flex flex-row gap-6 overflow-x-auto md:overflow-visible scrollbar-hide">
            <div className="w-full md:flex-1 md:min-w-0 bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-blue-100">
              <FeaturedArticlesPage />
            </div>
            <div className="hidden md:block w-[280px] flex-shrink-0 sticky top-6 h-fit">
              <MinimalSidebar onTagClick={updateTagFilter} />
            </div>
          </div>
        </div>
        <section id="devops-roadmap" className="-mt-26 md:-mt-20">
          <MinimalDevopsRoadmap />
        </section>
        <section id="youtube-playlists" className="-mt-16 md:-mt-16">
          <YouTubePlaylists />
        </section>
        <section id="free-udemy" className="-mt-16 md:-mt-16">
          <TopUdemyCourses />
        </section>
        <section id="free-labs" className="-mt-22 md:-mt-16">
          <FreeLabs />
        </section>
        <div id="cert" className="-mt-40 md:-mt-38">
          <CertificationRoadmap />
        </div>
        <section id="career" className="-mt-16 md:-mt-18">
          <CareerPath />
        </section>
        <div className="-mt-40 md:-mt-38">
          <RecommendedPaidCourses />
        </div>
        <div id="services" className="-mt-33 md:-mt-28">
          <FreelanceServicesSection />
        </div>
        <div className="-mt-32 md:-mt-30">
          <DevOpsWorkflowExample />
        </div>
        <div className="-mt-34 md:-mt-32">
          <SuccessStoriesSection />
        </div>
        <div className="-mt-34 md:-mt-32">
          <AuthorsContributorsCTA />
        </div>
        <div className="-mt-38 md:-mt-38">
          <MinimalFAQs />
        </div>
      </main>
      <div className="-mt-8 md:-mt-1">
        <MinimalFooter />
      </div>
    </div>
  );
}