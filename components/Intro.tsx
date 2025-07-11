"use client";

import {
  BookOpenCheck,
  Rocket,
  ChevronRight,
  Check,
  Terminal,
  GitBranch,
  Cpu,
  Network,
  Shield,
} from "lucide-react";

export default function Intro() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      {/* Intro Header */}
      <div className="mb-12">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 mb-3 justify-center">
          <BookOpenCheck className="w-4 h-4 mr-2" />
          Introduction
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Start Your DevOps Journey Here
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Learn what DevOps really means, why it matters, and what you need to know before diving in.
        </p>
      </div>

      {/* What is DevOps / Prerequisites Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 px-4">
        {/* What is DevOps */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 border border-blue-200 hover:shadow-xl transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <Rocket className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            What is DevOps?
          </h3>
          <p className="text-gray-700 text-center">
            DevOps combines development (Dev) and operations (Ops) to improve collaboration,
            automate workflows, and deliver software faster and more reliably. It’s a culture,
            philosophy, and practice that emphasizes continuous integration/continuous delivery (CI/CD),
            infrastructure as code, monitoring, and shared responsibility across teams.
          </p>
        </div>

        {/* Prerequisites */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-8 border border-green-200 hover:shadow-xl transition-shadow">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <Check className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Prerequisites
          </h3>
          <ul className="space-y-3 flex flex-col items-center">
            {[
              {
                text: "Linux & Operating Systems",
                icon: <Terminal className="w-5 h-5 text-green-600" />,
              },
              {
                text: "Programming Fundamentals",
                icon: <GitBranch className="w-5 h-5 text-green-600" />,
              },
              {
                text: "Networking & CCNA Basics",
                icon: <Network className="w-5 h-5 text-green-600" />,
              },
              {
                text: "Computer Hardware Knowledge",
                icon: <Cpu className="w-5 h-5 text-green-600" />,
              },
              {
                text: "Security Fundamentals",
                icon: <Shield className="w-5 h-5 text-green-600" />,
              },
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span className="text-gray-700">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* DevOps Learning Path Workflow */}
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-8">
          DevOps Learning Path
        </h3>

        <div className="relative">
          {/* Line behind steps */}
          <div className="absolute top-8 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-purple-300 rounded-full z-0" />

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {[
              { label: "DevOps Roadmap", id: "devops-roadmap", desc: "Understand the complete landscape" },
              { label: "YouTube Playlists", id: "youtube-playlists", desc: "Learn from expert tutorials" },
              { label: "Free Labs", id: "free-labs", desc: "Hands-on practice" },
              { label: "Myanmar Playlists", id: "myanmar-playlists", desc: "Local language resources" },
              { label: "Free Udemy Courses", id: "free-udemy", desc: "Structured learning" },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => scrollToSection(step.id)}
                  className="mb-4 text-indigo-700 hover:text-indigo-900 hover:underline cursor-pointer bg-transparent border-none p-0 font-semibold text-center"
                >
                  {step.label}
                </button>

                <div
                  className={`w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white font-bold ${
                    index === 0
                      ? "bg-indigo-600"
                      : index === 1
                      ? "bg-purple-500"
                      : index === 2
                      ? "bg-purple-400"
                      : index === 3
                      ? "bg-purple-300"
                      : "bg-purple-200"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="mt-2 text-sm text-gray-600 text-center">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => scrollToSection("devops-roadmap")}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md"
          >
            Start Your Journey!
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}