// app/docs/page.tsx
"use client";

import { useState } from "react";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import {
  BookOpen,
  User,
  LogIn,
  FileText,
  LayoutDashboard,
  Edit3,
  ChevronRight,
  Plus,
  ArrowRight,
  GraduationCap,
  Code,
  Video,
  School,
  Map,
  Crown,
  Users,
  Settings,
  Trash2,
  Rocket,
  Award,
  Container,
  Ship,
  Zap,
  Layout,
  GitBranch,
  RefreshCcw,
  TrendingUp,
  Star,
} from "lucide-react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    {
      id: "overview",
      title: "Platform Overview",
      icon: BookOpen,
      content: <OverviewSection />,
    },
    {
      id: "getting-started",
      title: "Getting Started",
      icon: LogIn,
      content: <GettingStartedSection />,
    },
    {
      id: "learning",
      title: "Learning Resources",
      icon: GraduationCap,
      content: <LearningSection />,
    },
    {
      id: "writing",
      title: "Writing Articles",
      icon: Edit3,
      content: <WritingSection />,
    },
    {
      id: "dashboard",
      title: "Admin Dashboard",
      icon: LayoutDashboard,
      content: <DashboardSection />,
    },
    {
      id: "account",
      title: "Account & Profile",
      icon: User,
      content: <AccountSection />,
    },
  ];

  const activeContent = sections.find(
    (section) => section.id === activeSection
  )?.content;

  return (
    <div className="min-h-screen bg-white/95 relative overflow-x-hidden">
      <MinimalHeader />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header - Matching Admin Dashboard Style */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              User Guide
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-light text-black mb-6 tracking-tight">
            Learn DevOps Now - Myanmar
          </h1>
          <p className="text-lg text-black leading-relaxed max-w-3xl">
            Complete guide to using our DevOps learning platform. Master tools,
            share knowledge, and grow your career.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <nav className="space-y-2 bg-white rounded-2xl border border-gray-200 p-6">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200"
                        : "text-black hover:bg-gray-50"
                    }`}
                  >
                    <section.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{section.title}</span>
                    {activeSection === section.id && (
                      <ChevronRight className="w-4 h-4 ml-auto text-blue-600" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-200">
              <div className="p-8">{activeContent}</div>
            </div>
          </div>
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}

// Section Components
function OverviewSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-light text-black mb-6 tracking-tight">
          Platform Overview
        </h2>
        <p className="text-lg text-black leading-relaxed max-w-3xl">
          Learn DevOps Now - Burmese is a comprehensive learning platform
          designed specifically for developers and students in Myanmar. We
          provide structured learning paths, hands-on practice environments, and
          a supportive community to help you master DevOps technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-light text-black mb-4">Learn DevOps</h3>
          <p className="text-black leading-relaxed">
            Follow our structured learning path from basic Linux commands to
            advanced cloud technologies. All resources are curated for Burmese
            learners.
          </p>
        </div>

        <div className="p-8 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
            <Edit3 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-light text-black mb-4">
            Share Knowledge
          </h3>
          <p className="text-black leading-relaxed">
            Write articles and tutorials to help other learners. Build your
            reputation as a DevOps expert while reinforcing your own learning.
          </p>
        </div>

        <div className="p-8 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-light text-black mb-4">
            Join Community
          </h3>
          <p className="text-black leading-relaxed">
            Connect with other DevOps learners, ask questions, and learn from
            industry experts. Build your professional network.
          </p>
        </div>

        <div className="p-8 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-light text-black mb-4">
            Practice Skills
          </h3>
          <p className="text-black leading-relaxed">
            Use our free DevOps playgrounds to practice tools like Docker and
            Kubernetes in safe, browser-based environments.
          </p>
        </div>
      </div>
    </div>
  );
}

function GettingStartedSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-light text-black mb-6 tracking-tight">
          Getting Started
        </h2>
        <p className="text-lg text-black leading-relaxed max-w-3xl">
          Begin your DevOps journey with these simple steps. Explore resources
          immediately or create an account to unlock all features.
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex items-start gap-8 p-8 bg-white rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-lg font-bold">1</span>
          </div>
          <div>
            <h3 className="text-2xl font-light text-black mb-4">
              Explore Learning Resources
            </h3>
            <p className="text-black leading-relaxed mb-4">
              Start learning immediately without creating an account. Access all
              our curated resources:
            </p>
            <ul className="text-black space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Follow the DevOps roadmap</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Watch YouTube course videos</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Learn DevOps free courses</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Use free DevOps playgrounds</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Read articles and tutorials</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-8 p-8 bg-white rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-lg font-bold">2</span>
          </div>
          <div>
            <h3 className="text-2xl font-light text-black mb-4">
              Create Your Account
            </h3>
            <p className="text-black leading-relaxed mb-6">
              Click the <span className="font-semibold">"Write Article"</span>{" "}
              button in the header to sign up with Google or email.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">G</span>
                </div>
                <p className="font-semibold text-black">Google Sign Up</p>
                <p className="text-black text-sm mt-2">
                  Quick one-click registration
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">@</span>
                </div>
                <p className="font-semibold text-black">Sign Up</p>
                <p className="text-black text-sm mt-2">
                  Traditional registration
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-8 p-8 bg-white rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-lg font-bold">3</span>
          </div>
          <div>
            <h3 className="text-2xl font-light text-black mb-4">
              Complete Your Profile
            </h3>
            <p className="text-black leading-relaxed mb-4">
              Build your author identity by completing your profile information:
            </p>
            <ul className="text-black space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Display name and professional bio</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Job title and company information</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>LinkedIn profile URL</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Profile picture</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function LearningSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-light text-black mb-6 tracking-tight">
          Learning Resources
        </h2>
        <p className="text-lg text-black leading-relaxed max-w-3xl">
          Access multiple learning formats designed for different learning
          styles. All resources are carefully curated and organized in logical
          progression.
        </p>
      </div>

      <div className="space-y-8">
        {/* DevOps Roadmap */}
        <div className="p-8 bg-white rounded-2xl border border-gray-200">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <Map className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-light text-black">DevOps Roadmap</h3>
              <p className="text-black">
                Structured learning path from beginner to advanced
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-black mb-4">
                Foundation Topics
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <span className="text-black font-medium">
                    Linux Fundamentals
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <span className="text-black font-medium">
                    Networking Basics
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <span className="text-black font-medium">
                    Git & Version Control
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <span className="text-black font-medium">
                    Docker Essentials
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-4">Advanced Topics</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">5</span>
                  </div>
                  <span className="text-black font-medium">
                    Cloud Platforms
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">6</span>
                  </div>
                  <span className="text-black font-medium">
                    CI/CD Pipelines
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">7</span>
                  </div>
                  <span className="text-black font-medium">Kubernetes</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">8</span>
                  </div>
                  <span className="text-black font-medium">GitOps</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* YouTube Courses */}
        <div className="p-8 bg-white rounded-2xl border border-gray-200">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
              <Video className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-light text-black">
                YouTube Courses
              </h3>
              <p className="text-black">
                Learn from top creators with comprehensive playlists for every
                skill level
              </p>
            </div>
          </div>
          <div className="mb-8">
            <p className="text-black leading-relaxed">
              Learn DevOps systematically starting with Linux and networking
              fundamentals, then progress to Docker, Git, and CI/CD pipelines,
              and finally master advanced topics like Kubernetes, Terraform, and
              production-grade DevOps practices through structured YouTube
              courses from expert creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-black mb-4">
                Featured Creators
              </h4>
              <ul className="text-black space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>TechWorld with Nana - Clear DevOps explanations</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>
                    freeCodeCamp - Comprehensive project-based courses
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>KodeKloud - Hands-on labs and tutorials</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Simplilearn - Professional certification prep</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-4">
                Learning Benefits
              </h4>
              <ul className="text-black space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Free access to expert content</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Practical, real-world examples</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Regular content updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Community support and discussions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Free Courses Section */}
        <div className="p-8 bg-white rounded-2xl border border-gray-200">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-light text-black">Free Courses</h3>
              <p className="text-black">
                Get started with free DevOps courses from KodeKloud, Udemy, and
                Great Learning
              </p>
            </div>
          </div>

          <div className="text-black leading-relaxed">
            <p>
              Access free hands-on labs from KodeKloud for Docker and
              Kubernetes, practical DevOps courses on Udemy covering Git and
              Linux, and certificate courses from Great Learning on AWS and
              cloud technologies.
            </p>
          </div>
        </div>

        {/* DevOps Playgrounds */}
        <div className="p-8 bg-white rounded-2xl border border-gray-200">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <Container className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-light text-black">
                DevOps Playgrounds
              </h3>
              <p className="text-black">
                Interactive environments to practice DevOps tools and
                technologies
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-black mb-4">
                Browser-Based Labs
              </h4>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-black">
                      Killer Coda
                    </span>
                  </div>
                  <p className="text-black text-sm">
                    Interactive labs for Kubernetes, Docker, Linux with no
                    installation required
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Ship className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-black">
                      Play with Kubernetes
                    </span>
                  </div>
                  <p className="text-black text-sm">
                    Fully functional Kubernetes playground for hands-on learning
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                      <Container className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-black">
                      Play with Docker
                    </span>
                  </div>
                  <p className="text-black text-sm">
                    Master containerization with interactive Docker playground
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-4">
                Specialized Labs
              </h4>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Layout className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-black">
                      Terraform Labs
                    </span>
                  </div>
                  <p className="text-black text-sm">
                    Learn Infrastructure as Code with practical Terraform
                    exercises
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <GitBranch className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-black">
                      GitHub Learning Lab
                    </span>
                  </div>
                  <p className="text-black text-sm">
                    Interactive Git and GitHub tutorials with automated feedback
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <RefreshCcw className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-black">
                      Jenkins Labs
                    </span>
                  </div>
                  <p className="text-black text-sm">
                    Build CI/CD pipelines with Jenkins practical examples
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WritingSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-light text-black mb-6 tracking-tight">
          Writing Articles
        </h2>
        <p className="text-lg text-black leading-relaxed max-w-3xl">
          Share your DevOps knowledge and experiences with the community.
          Writing helps reinforce your learning and builds your professional
          reputation.
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-8 bg-white rounded-2xl border border-gray-200">
          <h3 className="text-2xl font-light text-black mb-6">
            How to Write Articles
          </h3>
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-bold">1</span>
              </div>
              <div>
                <p className="font-semibold text-black text-lg">
                  Go to Your Dashboard
                </p>
                <p className="text-black">
                  Click your profile picture → Dashboard to access your author
                  workspace
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-bold">2</span>
              </div>
              <div>
                <p className="font-semibold text-black text-lg">
                  Click Write New Article
                </p>
                <p className="text-black">
                  Use the prominent button to start creating your content
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold text-black text-lg">
                  Use Markdown Editor
                </p>
                <p className="text-black">
                  Write with live preview, syntax highlighting, and easy
                  formatting
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-bold">4</span>
              </div>
              <div>
                <p className="font-semibold text-black text-lg">
                  Add Article Details
                </p>
                <p className="text-black">
                  Set title, category, tags, cover image, and publication date
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-bold">5</span>
              </div>
              <div>
                <p className="font-semibold text-black text-lg">
                  Publish Your Article
                </p>
                <p className="text-black">
                  Save as draft or publish immediately to share with the
                  community
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white rounded-2xl border border-gray-200">
            <h4 className="font-semibold text-black mb-4">
              Writing Best Practices
            </h4>
            <ul className="text-black space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Share personal learning experiences</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Include practical code examples</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Use clear, beginner-friendly language</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Create step-by-step tutorials</span>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-gray-200">
            <h4 className="font-semibold text-black mb-4">What to Avoid</h4>
            <ul className="text-black space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Copying content from other sites</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Overly technical without explanations</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Inappropriate language or content</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Unrelated topics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-light text-black mb-6 tracking-tight">
          Admin Dashboard
        </h2>
        <p className="text-lg text-black leading-relaxed max-w-3xl">
          Your personal control center for managing articles, tracking
          performance, and growing your audience as an author.
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-8 bg-white rounded-2xl border border-gray-200">
          <h3 className="text-2xl font-light text-black mb-6">
            Dashboard Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-black mb-4">
                Content Management
              </h4>
              <ul className="text-black space-y-3">
                <li className="flex items-center gap-3">
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span>Create new articles</span>
                </li>
                <li className="flex items-center gap-3">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  <span>Edit existing articles</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>View all published content</span>
                </li>
                <li className="flex items-center gap-3">
                  <LayoutDashboard className="w-5 h-5 text-blue-600" />
                  <span>Quick access to writing tools</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-4">
                Performance Analytics
              </h4>
              <ul className="text-black space-y-3">
                <li className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span>Track article views and reads</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-purple-600" />
                  <span>Monitor reader engagement</span>
                </li>
                <li className="flex items-center gap-3">
                  <Crown className="w-5 h-5 text-purple-600" />
                  <span>View author ranking</span>
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span>Analyze content performance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-light text-black mb-6 tracking-tight">
          Account & Profile
        </h2>
        <p className="text-lg text-black leading-relaxed max-w-3xl">
          Manage your account settings, author profile, and access different
          platform features through the user dropdown menu.
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-8 bg-white rounded-2xl border border-gray-200">
          <h3 className="text-2xl font-light text-black mb-6">
            User Dropdown Menu
          </h3>
          <p className="text-black mb-6">
            Click your profile picture in the top right corner to access these
            important options:
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-6 p-6 bg-white rounded-xl border border-gray-200">
              <Crown className="w-8 h-8 text-blue-600" />
              <div>
                <h4 className="font-semibold text-black text-lg">
                  Public Profile View
                </h4>
                <p className="text-black">
                  See how other users view your profile and published articles
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white rounded-xl border border-gray-200">
              <LayoutDashboard className="w-8 h-8 text-green-600" />
              <div>
                <h4 className="font-semibold text-black text-lg">
                  Admin Dashboard
                </h4>
                <p className="text-black">
                  Access your personal dashboard to manage articles and
                  analytics
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white rounded-xl border border-gray-200">
              <Settings className="w-8 h-8 text-purple-600" />
              <div>
                <h4 className="font-semibold text-black text-lg">
                  Edit Your Profile
                </h4>
                <p className="text-black">
                  Update your author information, bio, and profile picture
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white rounded-xl border border-gray-200">
              <Trash2 className="w-8 h-8 text-red-600" />
              <div>
                <h4 className="font-semibold text-black text-lg">
                  Delete Account
                </h4>
                <p className="text-black">
                  Permanently delete your account and all associated data
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white rounded-2xl border border-gray-200">
          <h3 className="text-2xl font-light text-black mb-6">
            Account Management
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-black mb-4">
                Profile Information
              </h4>
              <ul className="text-black space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Display Name - How you appear to other users</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Professional Bio - Your background and expertise</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Job Title & Company - Your current role</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>
                    LinkedIn Profile - Connect your professional profile
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Profile Picture - Add a professional photo</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="p-4 rounded-xl border border-gray-200">
                <p className="text-black mb-3">
                  <strong>Warning:</strong> Deleting your account is permanent
                  and cannot be undone.
                </p>
                <ul className="text-black space-y-2 text-sm">
                  <li>• All your published articles will be removed</li>
                  <li>• Your author profile will be deleted</li>
                  <li>• All comments and interactions will be removed</li>
                  <li>• This action cannot be reversed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
