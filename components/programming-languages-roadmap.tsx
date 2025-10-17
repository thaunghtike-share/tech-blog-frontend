"use client";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type React from "react";

import { useState } from "react";

interface ProgrammingLanguage {
  name: string;
  icon: string;
  description: string;
  fullDescription: string;
  officialLink: string;
  frameworks: string[];
  level: string;
  youtubeVideoId: string;
  color: string;
  tagColor: string;
}

const programmingLanguages: ProgrammingLanguage[] = [
  {
    name: "Python",
    icon: "python.png",
    description: "Scripting & Automation",
    fullDescription:
      "Python is a high-level, interpreted programming language known for its simplicity and readability. In DevOps, Python is extensively used for automation scripts, infrastructure management, and building CI/CD tools. Its rich ecosystem of libraries makes it perfect for system administration tasks, configuration management, and creating custom DevOps utilities.",
    officialLink: "https://www.python.org",
    frameworks: ["Django", "Flask", "FastAPI"],
    level: "Beginner to Advanced",
    youtubeVideoId: "QXeEoD0pB3E",
    color: "from-sky-600 to-blue-600",
    tagColor: "bg-sky-100 text-sky-800 border-sky-200",
  },
  {
    name: "JavaScript",
    icon: "javascript.webp",
    description: "Web & Node.js Development",
    fullDescription:
      "JavaScript is a versatile programming language that powers both frontend and backend development. In DevOps, JavaScript (via Node.js) is used for building automation tools, serverless functions, and real-time monitoring dashboards. Its event-driven architecture makes it ideal for handling asynchronous operations, API integrations, and creating interactive DevOps tools.",
    officialLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    frameworks: ["Node.js", "React", "Next.js", "Express.js", "NestJS"],
    level: "Beginner to Advanced",
    youtubeVideoId: "EerdGm-ehJQ",
    color: "from-amber-500 to-yellow-500",
    tagColor: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    name: "Go",
    icon: "go.png",
    description: "Cloud Native & Microservices",
    fullDescription:
      "Go (Golang) is a statically typed, compiled language designed by Google for building efficient and reliable software. In DevOps, Go is the language of choice for cloud-native tools like Docker, Kubernetes, and Terraform. Its fast compilation, built-in concurrency support, and small binary sizes make it perfect for microservices, CLI tools, and high-performance system utilities.",
    officialLink: "https://go.dev",
    frameworks: ["Gin", "Echo", "Cobra"],
    level: "Intermediate to Advanced",
    youtubeVideoId: "un6ZyFkqFKo",
    color: "from-cyan-500 to-teal-500",
    tagColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
  },
  {
    name: "Java",
    icon: "java.png",
    description: "Enterprise Applications",
    fullDescription:
      "Java is a robust, object-oriented programming language widely used in enterprise environments. In DevOps, Java is essential for managing and deploying large-scale enterprise applications, building CI/CD tools like Jenkins, and creating distributed systems. Its platform independence, mature ecosystem, and strong typing make it ideal for building reliable, high-performance systems.",
    officialLink: "https://www.java.com",
    frameworks: ["Spring Boot", "Maven", "Gradle", "JUnit"],
    level: "Intermediate to Advanced",
    youtubeVideoId: "xTtL8E4LzTQ",
    color: "from-red-500 to-orange-500",
    tagColor: "bg-red-100 text-red-800 border-red-200",
  },
  {
    name: "PHP",
    icon: "php.png",
    description: "PHP Web Applications",
    fullDescription:
      "PHP is a popular server-side scripting language primarily used for web development. In DevOps, PHP is crucial for deploying and managing web applications, automating server configurations, and integrating with various web services. Its ease of use, extensive documentation, and large community support make it a go-to choice for building dynamic websites and web-based DevOps tools.",
    officialLink: "https://laravel.com",
    frameworks: ["Laravel", "Symfony", "Composer"],
    level: "Intermediate",
    youtubeVideoId: "l4_Vn-sTBL8",
    color: "from-rose-500 to-pink-500",
    tagColor: "bg-rose-100 text-rose-800 border-rose-200",
  },
];

export function ProgrammingLanguagesRoadmap() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextLanguage = () => {
    setCurrentIndex((prev) => (prev + 1) % programmingLanguages.length);
  };

  const prevLanguage = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + programmingLanguages.length) % programmingLanguages.length
    );
  };

  const currentLanguage = programmingLanguages[currentIndex];

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.currentTarget;
    target.src = "/new.png";
  };

  const handlePlayButtonClick = () => {
    window.open(
      `https://www.youtube.com/watch?v=${currentLanguage.youtubeVideoId}`,
      "_blank"
    );
  };

  return (
    <section className="relative bg-white overflow-hidden py-16">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12">
            <div className="max-w-3xl">
              <div className="h-1 w-24 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full mb-6" />

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Start with Coding Before
                <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Your DevOps Journey
                </span>
              </h2>

              <p className="text-lg text-black leading-relaxed">
                Before diving into DevOps tools and automation, it's important
                to have a solid understanding of programming. Coding skills help
                you write scripts, automate tasks, and understand how software
                is built and deployed. Here are some of the most popular
                languages that every aspiring DevOps engineer should get
                familiar with.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Language Card */}
              <div className="relative bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-lg">
                <div className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - About Content */}
                    <div className="space-y-6">
                      {/* Language Header with Icon */}
                      <div className="flex items-start gap-6">
                        <div className="relative flex-shrink-0">
                          <div className="w-16 h-16  flex items-center justify-center overflow-hidden">
                            <img
                              src={`/${currentLanguage.icon}`}
                              alt={currentLanguage.name}
                              className="w-10 h-10 object-contain"
                              onError={handleImageError}
                            />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3
                              className={`text-3xl font-bold bg-gradient-to-r ${currentLanguage.color} bg-clip-text text-transparent`}
                            >
                              {currentLanguage.name}
                            </h3>
                            <a
                              href={currentLanguage.officialLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-black hover:text-gray-700"
                              aria-label={`Visit ${currentLanguage.name} official website`}
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          </div>
                          <p className="text-lg font-semibold text-black mb-3">
                            {currentLanguage.description}
                          </p>
                        </div>
                      </div>

                      <div className="h-px bg-gray-300" />

                      {/* Full Description */}
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-black">
                          About {currentLanguage.name}
                        </h4>
                        <p className="text-base text-black leading-relaxed">
                          {currentLanguage.fullDescription}
                        </p>
                      </div>

                      {/* Frameworks & Tools */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-black">
                          Popular Frameworks & Tools
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentLanguage.frameworks.map((framework, idx) => (
                            <span
                              key={idx}
                              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${currentLanguage.tagColor} border transition-all hover:scale-105`}
                            >
                              {framework}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Official Link Button */}
                      <div>
                        <a
                          href={currentLanguage.officialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r ${currentLanguage.color} text-white text-base font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg`}
                        >
                          Visit Official Documentation
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Right Column - Video Preview */}
                    <div className="space-y-6">
                      {/* Video Preview */}
                      <div className="py-33">
                        <div className="transform transition-all duration-300 relative">
                          <div
                            className="cursor-pointer hover:scale-[1.02] transition-all duration-300"
                            onClick={handlePlayButtonClick}
                          >
                            <div className="aspect-video rounded-lg overflow-hidden shadow-md border border-gray-300 relative bg-gray-200">
                              <img
                                src={`https://img.youtube.com/vi/${currentLanguage.youtubeVideoId}/maxresdefault.jpg`}
                                alt={`${currentLanguage.name} Tutorial Preview`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = `https://img.youtube.com/vi/${currentLanguage.youtubeVideoId}/hqdefault.jpg`;
                                  e.currentTarget.onerror = null;
                                }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-13 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg hover:bg-red-700 transition-all hover:scale-110">
                                  <svg
                                    className="w-10 h-10 text-white ml-1"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-black text-center mt-4 flex items-center justify-center gap-1">
                              💡 Click to watch full tutorial on YouTube
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation Controls with Chevrons */}
              <div className="flex items-center justify-center gap-8 mt-8">
                {/* Left Chevron */}
                <button
                  onClick={prevLanguage}
                  className="p-3 rounded-full bg-white hover:bg-gray-50 text-black border border-gray-300 hover:border-gray-400 shadow-lg hover:shadow-xl transition-all"
                  aria-label="Previous language"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Indicator Dots */}
                <div className="flex gap-2">
                  {programmingLanguages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index);
                      }}
                      className="group"
                      aria-label={`Go to language ${index + 1}`}
                    >
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? `w-8 bg-gradient-to-r ${currentLanguage.color}`
                            : "w-2 bg-gray-300 group-hover:bg-gray-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Right Chevron */}
                <button
                  onClick={nextLanguage}
                  className="p-3 rounded-full bg-white hover:bg-gray-50 text-black border border-gray-300 hover:border-gray-400 shadow-lg hover:shadow-xl transition-all"
                  aria-label="Next language"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Language Counter */}
              <div className="text-center mt-4">
                <span className="text-sm font-medium text-black">
                  {currentIndex + 1} of {programmingLanguages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
