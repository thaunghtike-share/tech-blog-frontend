"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MinimalHeader } from "@/components/minimal-header";
import DevOpsCyclingHero from "@/components/devops-cycling-hero";
import { FeaturedArticlesPage } from "@/components/featured-articles";
import { AuthorsHero } from "@/components/authors-hero";
import { MinimalFooter } from "@/components/minimal-footer";
import { CertificationRoadmap } from "@/components/CertificationRoadmap";
import { MinimalFAQs } from "@/components/minimal-faqs";
import { TopUdemyCourses } from "@/components/TopUdemyCourses";
import { FreelanceServicesSection } from "@/components/FreelanceServicesSection";
import { AuthorsContributorsCTA } from "@/components/AuthorsContributorsCTA";
import { SuccessStoriesSection } from "@/components/SuccessStoriesSection";
import { YouTubePlaylists } from "@/components/YouTubePlaylists";
import { FreeLabs } from "@/components/FreeLabs";
import { CareerPath } from "@/components/CareerPath";
import {
  Server,
  Container,
  GitBranch,
  Terminal,
  Zap,
  Cloud,
  Box,
  Code,
} from "lucide-react";
import { MinimalDevopsRoadmap } from "@/components/devops-roadmap";

export default function HomeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTag = searchParams.get("tag") || null;
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [mounted, setMounted] = useState(false);

  const floatingIconPositions = [
    { left: 5, top: 10 },
    { left: 85, top: 15 },
    { left: 25, top: 25 },
    { left: 70, top: 35 },
    { left: 10, top: 50 },
    { left: 90, top: 45 },
    { left: 40, top: 60 },
    { left: 60, top: 75 },
    { left: 15, top: 80 },
    { left: 80, top: 85 },
    { left: 30, top: 90 },
    { left: 55, top: 20 },
    { left: 20, top: 40 },
    { left: 75, top: 55 },
    { left: 45, top: 30 },
    { left: 65, top: 65 },
    { left: 35, top: 70 },
    { left: 95, top: 25 },
  ];

  const floatingDotPositions = [
    { left: 8, top: 12 },
    { left: 92, top: 18 },
    { left: 22, top: 28 },
    { left: 78, top: 32 },
    { left: 12, top: 48 },
    { left: 88, top: 52 },
    { left: 35, top: 65 },
    { left: 65, top: 72 },
    { left: 18, top: 85 },
    { left: 82, top: 88 },
    { left: 28, top: 95 },
    { left: 58, top: 22 },
    { left: 38, top: 38 },
    { left: 72, top: 58 },
    { left: 48, top: 78 },
    { left: 15, top: 35 },
    { left: 85, top: 42 },
    { left: 32, top: 15 },
    { left: 68, top: 25 },
    { left: 52, top: 45 },
    { left: 25, top: 68 },
    { left: 75, top: 82 },
    { left: 42, top: 92 },
    { left: 62, top: 8 },
    { left: 95, top: 65 },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle initial load scroll
  useEffect(() => {
    if (isInitialLoad) {
      window.scrollTo(0, 0);
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  // Scroll to top when home is selected (tag is cleared)
  useEffect(() => {
    if (!selectedTag && !isInitialLoad) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedTag, isInitialLoad]);

  // Update URL when tag changes
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
    <div
      className="min-h-screen bg-gradient-to-r from-gray-50 via-white to-gray-100 backdrop-blur-2xl relative overflow-x-hidden"
      style={{
        // Force GPU acceleration and prevent white flashes
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: 1000,
        willChange: "auto",
      }}
    >
      {/* Pre-render background to prevent white screen */}
      <div
        className="fixed inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-100 z-0"
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />

      {mounted && (
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          {floatingIconPositions.map((pos, i) => {
            const icons = [
              Server,
              Container,
              GitBranch,
              Terminal,
              Zap,
              Cloud,
              Box,
              Code,
            ];
            const IconComponent = icons[i % icons.length];
            return (
              <div
                key={`bg-icon-${i}`}
                className="absolute animate-float opacity-15"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${15 + (i % 5) * 2}s`,
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-lg backdrop-blur-sm border border-blue-300/40 flex items-center justify-center shadow-sm">
                  <IconComponent className="w-5 h-5 text-blue-600/60" />
                </div>
              </div>
            );
          })}

          {floatingDotPositions.map((pos, i) => (
            <div
              key={`bg-dot-${i}`}
              className="absolute animate-pulse opacity-20"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + (i % 3)}s`,
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="w-3 h-3 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full shadow-sm" />
            </div>
          ))}
        </div>
      )}

      <div
        className="relative z-10"
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        <MinimalHeader />

        <main
          className="relative z-10"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          <section className="-mt-5">
            <DevOpsCyclingHero />
          </section>

          {/* Featured Articles Section */}
          <section className="-mt-17">
            <FeaturedArticlesPage />
          </section>

          <section id="roadmap" className="-mt-5 2xl:-mt-2">
            <MinimalDevopsRoadmap />
          </section>

          {/* Existing sections with updated spacing */}
          <section id="youtube" className="-mt-1">
            <YouTubePlaylists />
          </section>

          <section id="online" className="-mt-15">
            <TopUdemyCourses />
          </section>

          <section id="playgrounds" className="-mt-15">
            <FreeLabs />
          </section>

          <div id="cert" className="-mt-15">
            <CertificationRoadmap />
          </div>

          <section id="career" className="-mt-10">
            <CareerPath />
          </section>

          <div className="-mt-20">
            <SuccessStoriesSection />
          </div>

          <div className="-mt-24">
            <AuthorsContributorsCTA />
          </div>

          <div className="-mt-32">
            <MinimalFAQs />
          </div>
        </main>

        <div id="faqs" className="">
          <MinimalFooter />
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(-10px) translateX(-10px) rotate(180deg);
          }
          75% {
            transform: translateY(-30px) translateX(5px) rotate(270deg);
          }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        /* Update background to white/gray theme */
        html {
          background: linear-gradient(to right, #f9fafb, #ffffff, #f9fafb);
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000;
        }

        body {
          background: linear-gradient(to right, #f9fafb, #ffffff, #f9fafb);
          transform: translateZ(0);
          backface-visibility: hidden;
          overflow-x: hidden;
        }

        /* Ensure smooth scrolling without white gaps */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}