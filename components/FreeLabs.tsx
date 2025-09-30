"use client";
import { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  Play,
  FlaskConical,
  ChevronRight,
  ChevronLeft,
  Star,
} from "lucide-react";

interface DevOpsLab {
  id: number;
  title: string;
  platform: string;
  description: string;
  url: string;
  difficulty?: string;
  color: string;
  gradient: string;
  iconColor: string;
}

const staticLabs: DevOpsLab[] = [
  {
    id: 1,
    title: "KodeKloud",
    platform: "KodeKloud",
    url: "https://studio.kodekloud.com/labs",
    description:
      "Hands-on labs with real-world scenarios covering Docker, Kubernetes, Terraform, and more. Perfect for beginners to advanced learners with guided exercises and instant feedback.",
    difficulty: "Beginner → Advanced",
    color: "from-orange-500 to-red-500",
    gradient: "bg-gradient-to-r from-orange-500 to-red-500",
    iconColor: "text-orange-400",
  },
  {
    id: 2,
    title: "Killer Coda",
    platform: "killercoda",
    url: "https://killercoda.com/",
    description:
      "Interactive browser-based labs that require no installation. Practice Kubernetes, Docker, Linux, and cloud technologies directly in your web browser with step-by-step tutorials.",
    difficulty: "Beginner → Intermediate",
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
    iconColor: "text-blue-400",
  },
  {
    id: 3,
    title: "Kubernetes Lab",
    platform: "lets play with k8s",
    url: "https://labs.play-with-k8s.com/",
    description:
      "A fully functional Kubernetes playground where you can deploy pods, services, and explore cluster operations. Perfect for learning Kubernetes concepts hands-on.",
    difficulty: "Intermediate",
    color: "from-green-500 to-emerald-500",
    gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
    iconColor: "text-green-400",
  },
  {
    id: 4,
    title: "Docker Lab",
    platform: "lets play with docker",
    url: "https://labs.play-with-docker.com",
    description:
      "Master containerization with this interactive Docker playground. Build, run, and manage containers while learning Docker commands and best practices.",
    difficulty: "Intermediate",
    color: "from-blue-400 to-indigo-500",
    gradient: "bg-gradient-to-r from-blue-400 to-indigo-500",
    iconColor: "text-blue-400",
  },
  {
    id: 6,
    title: "Terraform Lab",
    platform: "kodekloud",
    url: "https://kodekloud.com/pages/free-labs/terraform",
    description:
      "Learn Infrastructure as Code with Terraform through practical labs. Create, manage, and deploy cloud resources using declarative configuration files.",
    difficulty: "Beginner",
    color: "from-purple-500 to-pink-500",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
    iconColor: "text-purple-400",
  },
  {
    id: 7,
    title: "Linux Lab",
    platform: "kodekloud",
    url: "https://kodekloud.com/free-labs/linux",
    description:
      "Essential Linux commands and administration tasks. Perfect for beginners to learn file systems, permissions, process management, and shell scripting.",
    difficulty: "Beginner",
    color: "from-yellow-500 to-orange-500",
    gradient: "bg-gradient-to-r from-yellow-500 to-amber-500",
    iconColor: "text-yellow-400",
  },
  {
    id: 8,
    title: "Cloud Computing Lab",
    platform: "KodeKloud",
    url: "https://kodekloud.com/cloud-playgrounds/aws",
    description:
      "Explore cloud services with hands-on labs in AWS, Azure, and GCP. Learn to deploy and manage cloud resources with practical exercises.",
    difficulty: "Beginner → Advanced",
    color: "from-sky-500 to-blue-600",
    gradient: "bg-gradient-to-r from-sky-500 to-blue-600",
    iconColor: "text-sky-400",
  },
  {
    id: 9,
    title: "Git & GitHub Lab",
    platform: "GitHub Learning Lab",
    url: "https://lab.github.com/",
    description:
      "Master version control with interactive Git and GitHub tutorials. Learn branching, merging, pull requests, and collaborative workflows.",
    difficulty: "Beginner → Intermediate",
    color: "from-gray-600 to-gray-800",
    gradient: "bg-gradient-to-r from-gray-600 to-gray-800",
    iconColor: "text-gray-400",
  },
  {
    id: 10,
    title: "Jenkins CI/CD",
    platform: "Jenkins Tutorials",
    url: "https://www.jenkins.io/doc/tutorials/",
    description:
      "Build continuous integration and deployment pipelines with Jenkins. Automate testing, building, and deployment processes with practical examples.",
    difficulty: "Intermediate",
    color: "from-red-500 to-orange-500",
    gradient: "bg-gradient-to-r from-red-500 to-orange-500",
    iconColor: "text-red-400",
  },
];

export function FreeLabs() {
  const [labs] = useState<DevOpsLab[]>(staticLabs);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % labs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + labs.length) % labs.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [labs.length]);

  const currentLab = labs[currentSlide];

  return (
    <section ref={sectionRef} className="w-full max-w-4xl mx-auto px-4 py-16">
      {/* Enhanced Header */}
      <div className="text-center mb-16 relative">
        <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
          {/* Static bubble icon */}
          <div className="relative p-4 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full shadow-2xl">
            <div className="absolute -inset-2 bg-gradient-to-r from-sky-400/30 to-blue-500/30 rounded-full blur-lg" />
            <FlaskConical className="w-10 h-10 text-white relative z-10" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Free DevOps Playgrounds
          </h2>

          {/* Static chevron with dotted trail */}
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
              />
            ))}
            <ChevronRight className="w-6 h-6 text-sky-400 ml-2" />
          </div>
        </div>

        <div className="h-1 w-32 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full mx-auto relative mb-6">
          {/* Static dot on the line */}
          <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg" />
        </div>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto relative z-10">
          Explore these practical, free labs and playgrounds to level up your
          DevOps expertise
        </p>
      </div>

      {/* Single Lab Display */}
      <div className="relative max-w-2xl mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className={`absolute -left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-2xl border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-sky-500/50 transition-all duration-300`}
        >
          <ChevronLeft className="w-6 h-6 text-sky-400" />
        </button>

        <button
          onClick={nextSlide}
          className={`absolute -right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-2xl border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-sky-500/50 transition-all duration-300`}
        >
          <ChevronRight className="w-6 h-6 text-sky-400" />
        </button>

        {/* Lab Card */}
        <div className="relative h-96">
          <div className="absolute inset-0">
            <div className="group relative h-full">
              {/* Static background glow */}
              <div
                className={`absolute -inset-4 ${currentLab.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500`}
              />

              <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 h-full flex flex-col">
                {/* Platform Badge */}
                <div className="flex justify-center mb-6">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full ${currentLab.gradient} text-white font-semibold text-sm shadow-lg`}
                  >
                    <Star className="w-4 h-4 mr-2 fill-current" />
                    {currentLab.platform}
                  </span>
                </div>

                {/* Title */}
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-white">
                    {currentLab.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8 flex-grow text-center px-4">
                  {currentLab.description}
                </p>

                {/* Difficulty and Launch Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Difficulty Badge */}
                  <div className="flex items-center gap-2 text-gray-400">
                    <div
                      className={`w-2 h-2 rounded-full ${currentLab.iconColor.replace(
                        "text",
                        "bg"
                      )}`}
                    />
                    <span className="text-sm font-medium">
                      {currentLab.difficulty}
                    </span>
                  </div>

                  {/* Launch Button */}
                  <a
                    href={currentLab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center px-8 py-3 ${currentLab.gradient} hover:shadow-xl text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-[1.02] border border-white/20 group/btn`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Launch Playground
                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center mt-8 gap-3">
          {labs.map((lab, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? `${lab.gradient} shadow-lg scale-125`
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4 text-gray-400 text-sm">
          <span className="font-semibold text-white">{currentSlide + 1}</span> /{" "}
          {labs.length}
        </div>
      </div>
    </section>
  );
}