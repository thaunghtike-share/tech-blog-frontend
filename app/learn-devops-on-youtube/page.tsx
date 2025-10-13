"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import {
  Search,
  Play,
  Clock,
  Users,
  Star,
  TrendingUp,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Youtube,
  CheckCircle2,
  Circle,
  X,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const youtubePlaylists = [
  // Linux courses
  {
    id: 5,
    title: "Linux Essentials",
    videoId: "Wgi-OfbP2Gw",
    playlistUrl:
      "https://www.youtube.com/watch?v=Wgi-OfbP2Gw&list=PL9ooVrP1hQOH3SvcgkC4Qv2cyCebvs0Ik",
    channel: "Edureka",
    difficulty: "Beginner",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: true,
    description: "Essential Linux commands and system administration",
    order: 1,
  },
  {
    id: 6,
    title: "Linux Server Administration",
    videoId: "acv0fUTDK3g",
    playlistUrl:
      "https://www.youtube.com/watch?v=acv0fUTDK3g&list=PLS0spxc8nUsDro6iDvLzeC8iDv5y1gDXa",
    channel: "Shesh Chauhan IT Trainer",
    difficulty: "Beginner",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: false,
    description: "Practical Linux server management skills",
    order: 1,
  },
  {
    id: 35,
    title: "Linux (Burmese)",
    videoId: "zYlTspttLEI",
    playlistUrl:
      "https://www.youtube.com/watch?v=zYlTspttLEI&list=PL7HEkIrH_rEphNhhbFZV5Wq1dudUD10hP",
    channel: "Linux Ninja",
    difficulty: "Beginner",
    estDuration: "4 weeks",
    is_burmese: true,
    recommended: false,
    description: "Linux fundamentals in Burmese",
    order: 1,
  },

  // CCNA/Networking courses
  {
    id: 28,
    title: "CCNA Free Course",
    videoId: "H8W9oMNSuwo",
    playlistUrl:
      "https://www.youtube.com/watch?v=H8W9oMNSuwo&list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ",
    channel: "Jeremy's IT Lab",
    difficulty: "Beginner",
    estDuration: "8 weeks",
    is_burmese: false,
    recommended: true,
    description: "Complete networking fundamentals for DevOps",
    order: 2,
  },
  {
    id: 30,
    title: "CCNA (Burmese)",
    videoId: "iutsJfATykg",
    playlistUrl:
      "https://www.youtube.com/watch?v=iutsJfATykg&list=PLOFIpcUzu6dWs4DjtrVUA2SRwiWOPSCeJ",
    channel: "ACH Network Pro",
    difficulty: "Beginner",
    estDuration: "8 weeks",
    is_burmese: true,
    recommended: false,
    description: "Networking basics in Burmese language",
    order: 2,
  },

  // Cloud courses
  {
    id: 1,
    title: "Cloud Fundamentals",
    videoId: "3XFODda6YXo",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLEiEAq2VkUULlNtIFhEQHo8gacvme35rz",
    channel: "Simplilearn",
    difficulty: "Beginner",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: true,
    description:
      "Perfect starting point for understanding cloud computing basics",
    order: 3,
  },

  // AWS courses
  {
    id: 2,
    title: "AWS Course Certification",
    videoId: "YqWuL3an-5o",
    playlistUrl: "https://www.youtube.com/watch?v=YqWuL3an-5o",
    channel: "Intellipaat",
    difficulty: "Beginner",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: false,
    description: "Comprehensive AWS fundamentals for beginners",
    order: 4,
  },
  {
    id: 34,
    title: "AWS Basic (Burmese)",
    videoId: "Dn5B-qliqyk",
    playlistUrl:
      "https://www.youtube.com/watch?v=Dn5B-qliqyk&list=PLfFA9b_Mlfz4H8wn2KnPI-u5a3F9UNNVz",
    channel: "Myanmar Tech Academy",
    difficulty: "Beginner",
    estDuration: "4 weeks",
    is_burmese: true,
    recommended: false,
    description: "AWS introduction in Burmese",
    order: 4,
  },

  // Azure courses
  {
    id: 3,
    title: "Azure (AZ-900) Full Course",
    videoId: "NPEsD6n9A_I",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLGjZwEtPN7j-Q59JYso3L4_yoCjj2syrM",
    channel: "Adam Marczak - Azure for Everyone",
    difficulty: "Beginner",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: true,
    description: "Master Azure fundamentals with clear explanations",
    order: 5,
  },

  // Docker courses (Intermediate)
  {
    id: 7,
    title: "Docker Crash Course Tutorial",
    videoId: "31ieHmcTUOk",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PL4cUxeGkcC9hxjeEtdHFNYMtCpjNBm3h7",
    channel: "Net Ninja",
    difficulty: "Intermediate",
    estDuration: "1 weeks",
    is_burmese: false,
    recommended: true,
    description: "Quick and practical Docker containerization",
    order: 1,
  },
  {
    id: 8,
    title: "Docker Tutorial",
    videoId: "zJ6WbK9zFpI",
    playlistUrl: "https://www.youtube.com/watch?v=zJ6WbK9zFpI&t=11s",
    channel: "Kode Kloud",
    difficulty: "Intermediate",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: false,
    description: "Comprehensive Docker with hands-on labs",
    order: 1,
  },

  // Git courses (Intermediate)
  {
    id: 12,
    title: "Git – Full Course for Beginners",
    videoId: "zTjRZNkhiEU",
    playlistUrl: "https://www.youtube.com/watch?v=zTjRZNkhiEU",
    channel: "freeCodeCamp.org",
    difficulty: "Intermediate",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: true,
    description: "Complete Git version control mastery",
    order: 2,
  },
  {
    id: 36,
    title: "Git Basic (Burmese)",
    videoId: "DB_MEZZdiIs",
    playlistUrl:
      "https://www.youtube.com/watch?v=DB_MEZZdiIs&list=PLD_eiqVVLZDge73nM5J-LyPgbfVL6vnDc",
    channel: "Myanmar Data Science",
    difficulty: "Intermediate",
    estDuration: "2 weeks",
    is_burmese: true,
    recommended: false,
    description: "Git version control in Burmese",
    order: 2,
  },

  // CI/CD courses (Intermediate)
  {
    id: 10,
    title: "CICD Tutorials",
    videoId: "R8_veQiYBjI",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLy7NrYWoggjzSIlwxeBbcgfAdYoxCIrM2",
    channel: "TechWorld with Nana",
    difficulty: "Intermediate",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: true,
    description: "Modern CI/CD pipelines explained clearly",
    order: 3,
  },
  {
    id: 11,
    title: "CICD (Github Action)",
    videoId: "-hVG9z0fCac",
    playlistUrl:
      "https://www.youtube.com/watch?v=-hVG9z0fCac&list=PLArH6NjfKsUhvGHrpag7SuPumMzQRhUKY",
    channel: "glich stream",
    difficulty: "Intermediate",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: false,
    description: "GitHub Actions for automation workflows",
    order: 3,
  },

  // Ansible courses (Intermediate)
  {
    id: 14,
    title: "Ansible Tutorials",
    videoId: "3RiVKs8GHYQ",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLT98CRl2KxKEUHlbhuq9V02n9AMLPySoEQ",
    channel: "Learn Linux TV",
    difficulty: "Intermediate",
    estDuration: "4 weeks",
    is_burmese: false,
    recommended: false,
    description: "Infrastructure automation with Ansible",
    order: 4,
  },
  {
    id: 15,
    title: "Ansible Zero to Hero",
    videoId: "aT69WlNi8EA",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PL0lvsZ5ieQicXHPMNNg7qXJJoO2AnE8ej",
    channel: "TechWorld with Murali",
    difficulty: "Intermediate",
    estDuration: "3-4 weeks",
    is_burmese: false,
    recommended: true,
    description: "From basics to advanced Ansible concepts",
    order: 4,
  },

  // AWS Security courses (Intermediate)
  {
    id: 39,
    title: "AWS Security Full Course",
    videoId: "oGS9FhCT91g",
    playlistUrl: "https://www.youtube.com/watch?v=oGS9FhCT91g",
    channel: "Maruchin tech",
    difficulty: "Intermediate",
    estDuration: "3-5 weeks",
    is_burmese: false,
    recommended: true,
    description: "AWS security best practices and implementation",
    order: 5,
  },
  {
    id: 40,
    title: "AWS Security",
    videoId: "2pEp1mcf3jU",
    playlistUrl:
      "https://www.youtube.com/watch?v=2pEp1mcf3jU&list=PLTCuRW0ikUdP5OrEUckFdQPHeE05ZeS5z",
    channel: "MLOps School",
    difficulty: "Intermediate",
    estDuration: "6 weeks",
    is_burmese: false,
    recommended: false,
    description: "Comprehensive AWS security course",
    order: 5,
  },

  // Packer courses (Intermediate)
  {
    id: 38,
    title: "Hashicorp Packer",
    videoId: "tbv1lTF1wFU",
    playlistUrl:
      "https://www.youtube.com/watch?v=tbv1lTF1wFU&list=PL8VzFQ8k4UdP5OrEUckFdQPHeE05ZeS5z",
    channel: "Sanjeev Thiyagarajan",
    difficulty: "Intermediate",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: false,
    description: "Machine image creation with Packer",
    order: 6,
  },

  // Kubernetes courses (Advanced)
  {
    id: 9,
    title: "Kubernetes Administrator Course",
    videoId: "6_gMoe7Ik8k",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLl4APkPHzsUUOkOv3i62UidrLmSB8DcGC",
    channel: "Tech Tutorials with Piyush",
    difficulty: "Advanced",
    estDuration: "5 weeks",
    is_burmese: false,
    recommended: true,
    description: "Complete Kubernetes administration guide",
    order: 1,
  },
  {
    id: 31,
    title: "Kubernetes Fundamentals",
    videoId: "2T86xAtR6Fo",
    playlistUrl:
      "https://www.youtube.com/watch?v=dfxrdoEQe00&list=PLdpzxOOAlwvJdsW6A0jCz_3VaANuFMLpc",
    channel: "Abhishek.Veeramalla",
    difficulty: "Advanced",
    estDuration: "8 weeks",
    is_burmese: false,
    recommended: false,
    description: "Deep dive into Kubernetes concepts",
    order: 1,
  },

  // Terraform courses (Advanced)
  {
    id: 13,
    title: "Terraform Full Course For Beginners",
    videoId: "j0mfH_7sR7k",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLl4APkPHzsUUHlbhuq9V02n9AMLPySoEQ",
    channel: "Tech Tutorials with Piyush",
    difficulty: "Advanced",
    estDuration: "5 weeks",
    is_burmese: false,
    recommended: false,
    description: "Infrastructure as Code with Terraform",
    order: 2,
  },
  {
    id: 37,
    title: "Terraform (Burmese)",
    videoId: "v4X3D4YlyHc",
    playlistUrl:
      "https://www.youtube.com/watch?v=v4X3D4YlyHc&list=PLvzWOIc1IOtdufeA0ab5mKycSJgq5Bi57",
    channel: "Hello Cloud",
    difficulty: "Advanced",
    estDuration: "6 weeks",
    is_burmese: true,
    recommended: false,
    description: "Terraform in Burmese language",
    order: 2,
  },

  // DevOps courses (Advanced)
  {
    id: 21,
    title: "DevOps Zero To Hero Course",
    videoId: "Xrgk023l4lI",
    playlistUrl:
      "https://www.youtube.com/watch?v=Ou9j73aWgyE&list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa",
    channel: "Abhishek.Veeramalla",
    difficulty: "Advanced",
    estDuration: "6 weeks",
    is_burmese: false,
    recommended: true,
    description: "Complete DevOps journey from zero to production",
    order: 3,
  },

  // GitOps courses (Advanced)
  {
    id: 22,
    title: "GitOps with ArgoCD",
    videoId: "eTR-gbIeXPw",
    playlistUrl:
      "https://www.youtube.com/watch?v=eTR-gbIeXPw&list=PLdsu0umqbb8P8dNoox7ECgOo_fJ9FBfZl",
    channel: "DevOps Hint",
    difficulty: "Advanced",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: false,
    description: "GitOps implementation with ArgoCD",
    order: 4,
  },

  // DevSecOps courses (Advanced)
  {
    id: 29,
    title: "DevSecOps Fundamentals",
    videoId: "7tcX_ndqD68",
    playlistUrl: "https://www.youtube.com/watch?v=7tcX_ndqD68",
    channel: "MartinY Tech",
    difficulty: "Advanced",
    estDuration: "5 weeks",
    is_burmese: false,
    recommended: true,
    description: "Security integration in DevOps pipelines",
    order: 5,
  },

  // Monitoring & Logging courses (Advanced)
  {
    id: 41,
    title: "Kubernetes Logging & Monitoring",
    videoId: "0POI5E7Uzjo",
    playlistUrl: "https://www.youtube.com/watch?v=0POI5E7Uzjo",
    channel: "Rayan Slim",
    difficulty: "Advanced",
    estDuration: "1 weeks",
    is_burmese: false,
    recommended: true,
    description: "Observability in Kubernetes clusters",
    order: 6,
  },
  {
    id: 42,
    title: "Filebeat + Elk Stack Tutorial With Kubernetes",
    videoId: "SU--XMhbWoY",
    playlistUrl: "https://www.youtube.com/watch?v=SU--XMhbWoY",
    channel: "Michael Guay",
    difficulty: "Advanced",
    estDuration: "1 weeks",
    is_burmese: false,
    recommended: false,
    description: "Log management with ELK stack",
    order: 6,
  },

  // Vault courses (Advanced)
  {
    id: 43,
    title: "Hashicorp Vault",
    videoId: "-sU0O82fdZs",
    playlistUrl:
      "https://www.youtube.com/watch?v=-sU0O82fdZs&list=PL7iMyoQPMtAP7XeXabzWuPumMzQRhUKC",
    channel: "Rahul Wagh",
    difficulty: "Advanced",
    estDuration: "1 weeks",
    is_burmese: false,
    recommended: true,
    description: "Secrets management with HashiCorp Vault",
    order: 7,
  },

  // Security courses (Advanced)
  {
    id: 44,
    title: "Kubernetes Security Course",
    videoId: "d9xfB5qaOfg",
    playlistUrl: "https://www.youtube.com/watch?v=d9xfB5qaOfg",
    channel: "Killer Shell",
    difficulty: "Advanced",
    estDuration: "1 weeks",
    is_burmese: false,
    recommended: false,
    description: "Kubernetes security best practices",
    order: 8,
  },
];

const difficultyConfig = {
  Beginner: {
    gradient: "from-emerald-500 to-teal-600",
    bgColor: "bg-gradient-to-r from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    icon: BookOpen,
    position: "left",
  },
  Intermediate: {
    gradient: "from-sky-500 to-blue-600",
    bgColor: "bg-gradient-to-r from-sky-500 to-blue-600",
    lightBg: "bg-sky-50",
    textColor: "text-sky-700",
    borderColor: "border-sky-200",
    icon: TrendingUp,
    position: "right",
  },
  Advanced: {
    gradient: "from-indigo-500 to-purple-600",
    bgColor: "bg-gradient-to-r from-indigo-500 to-purple-600",
    lightBg: "bg-indigo-50",
    textColor: "text-indigo-700",
    borderColor: "border-indigo-200",
    icon: Star,
    position: "left",
  },
};

const learningPaths = {
  Beginner: {
    title: "Start Your DevOps Journey",
    description:
      "Begin with foundational concepts and essential tools. Master Linux, networking, and cloud basics to build a solid foundation for your DevOps career.",
    learningPath: [
      { title: "Linux", icon: "🐧" },
      { title: "CCNA", icon: "🌐" },
      { title: "Cloud", icon: "☁️" },
      { title: "AWS", icon: "🔶" },
      { title: "Azure", icon: "🔷" },
    ],
    duration: "8-12 weeks",
    skills: [
      "Linux CLI",
      "Networking",
      "Cloud Basics",
      "Container Fundamentals",
    ],
  },
  Intermediate: {
    title: "Build DevOps Workflows",
    description:
      "Learn to automate infrastructure and implement CI/CD pipelines. Focus on container orchestration, infrastructure as code, and deployment automation.",
    learningPath: [
      { title: "Docker", icon: "🐳" },
      { title: "Git", icon: "📦" },
      { title: "CICD ", icon: "🔄" },
      { title: "Ansible", icon: "⚙️" },
      { title: "AWS Security", icon: "🔒" },
    ],
    duration: "12-16 weeks",
    skills: ["Docker", "CI/CD", "Git", "Ansible", "AWS Security"],
  },
  Advanced: {
    title: "Master Production DevOps",
    description:
      "Advanced topics including Kubernetes, Terraform, GitOps, and security. Learn to manage complex infrastructure and implement enterprise-grade DevOps practices.",
    learningPath: [
      { title: "Kubernetes", icon: "☸️" },
      { title: "Terraform", icon: "🏗️" },
      { title: "DevSecOps", icon: "🛡️" },
      { title: "Hashicorp Vault", icon: "🔐" },
    ],
    duration: "16-20 weeks",
    skills: ["Kubernetes", "Terraform", "GitOps", "Security", "Monitoring"],
  },
};

export default function LearnDevOpsOnUtube() {
  const [searchQuery, setSearchQuery] = useState("");
  const [completedPlaylists, setCompletedPlaylists] = useState<Set<number>>(
    new Set()
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("completedPlaylists");
    if (saved) {
      setCompletedPlaylists(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleComplete = (playlistId: number) => {
    setCompletedPlaylists((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(playlistId)) {
        newSet.delete(playlistId);
      } else {
        newSet.add(playlistId);
      }
      localStorage.setItem(
        "completedPlaylists",
        JSON.stringify(Array.from(newSet))
      );
      return newSet;
    });
  };

  const difficulties: Array<"Beginner" | "Intermediate" | "Advanced"> = [
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const filteredPlaylists = useMemo(() => {
    let filtered = youtubePlaylists.filter(
      (p) => p.difficulty !== "Prerequisite"
    );

    if (searchQuery) {
      filtered = filtered.filter(
        (playlist) =>
          playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          playlist.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery]);

  const playlistsByDifficulty = useMemo(() => {
    const groups: {
      [key: string]: typeof youtubePlaylists;
    } = {
      Beginner: [],
      Intermediate: [],
      Advanced: [],
    };

    // Sort courses by order within each difficulty
    groups.Beginner = youtubePlaylists
      .filter((p) => p.difficulty === "Beginner")
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    groups.Intermediate = youtubePlaylists
      .filter((p) => p.difficulty === "Intermediate")
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    groups.Advanced = youtubePlaylists
      .filter((p) => p.difficulty === "Advanced")
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    return groups;
  }, []);

  // Don't render until client-side to avoid hydration issues
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white/75">
        <MinimalHeader />
        <div className="pt-20 flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/75 overflow-x-hidden">
      <MinimalHeader />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.05, 0.2, 0.05],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          >
            {i % 3 === 0 ? (
              <BookOpen className="w-8 h-8 text-emerald-300" />
            ) : i % 3 === 1 ? (
              <TrendingUp className="w-8 h-8 text-sky-300" />
            ) : (
              <Star className="w-8 h-8 text-indigo-300" />
            )}
          </motion.div>
        ))}
      </div>

      <main className="relative z-10 pt-12">
        <section className="relative py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Master DevOps with
                  <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                    YouTube Courses
                  </span>
                </h1>

                <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl">
                  Curated learning paths from fundamentals to advanced
                  production skills. Follow structured roadmaps with the best
                  YouTube content.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative max-w-2xl"
                >
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search courses by topic, technology, or channel..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  )}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:w-96 flex-shrink-0"
              >
                <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Youtube className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">My DevOps Channel</h3>
                      <p className="text-red-100 text-sm">
                        Learn DevOps Now with Tho
                      </p>
                    </div>
                  </div>

                  <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 shadow-lg">
                    <iframe
                      src="https://www.youtube.com/embed/kvBQ0-TDB38"
                      title="Learn DevOps Now with Tho - Channel Preview"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <a
                    href="https://www.youtube.com/@learndevopsnowbytho"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105"
                  >
                    <Youtube className="w-5 h-5" />
                    Subscribe to My Channel
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {!searchQuery && (
            <div className="space-y-20">
              {difficulties.map((difficulty) => {
                const playlists = playlistsByDifficulty[difficulty];
                if (!playlists || playlists.length === 0) return null;

                const config = difficultyConfig[difficulty];
                const path = learningPaths[difficulty];
                const IconComponent = config.icon;
                const isLeft = config.position === "left";

                return (
                  <motion.section
                    key={difficulty}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="scroll-mt-20"
                  >
                    <div
                      className={`flex flex-col ${
                        isLeft ? "items-start" : "items-end"
                      } mb-8`}
                    >
                      <div
                        className={`max-w-3xl ${
                          isLeft ? "text-left" : "text-right"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-3 mb-3 ${
                            isLeft ? "" : "flex-row-reverse"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-xl ${config.bgColor} text-white shadow-lg`}
                          >
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                              {path.title}
                            </h2>
                            <span className="text-sm font-medium text-sky-600 mt-1 block">
                              {difficulty} Level • {playlists.length} courses
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-base leading-relaxed mb-6">
                          {path.description}
                        </p>

                        <div
                          className={`inline-flex flex-col gap-2 ${
                            isLeft ? "" : "items-end"
                          }`}
                        >
                          <span className="text-sm font-semibold text-sky-600 uppercase tracking-wide">
                            Recommended Learning Path
                          </span>
                          <div className="flex items-center gap-2 flex-wrap">
                            {path.learningPath.map((step, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className={`flex items-center gap-2 bg-white border-2 ${config.borderColor} rounded-xl px-3 py-2 shadow-sm hover:shadow-md transition-shadow`}
                                >
                                  <span className="text-lg">{step.icon}</span>
                                  <span className="text-sm font-semibold text-gray-700">
                                    {step.title
                                      .split(" ")
                                      .slice(0, 2)
                                      .join(" ")}
                                  </span>
                                </div>
                                {index < path.learningPath.length - 1 && (
                                  <ArrowRight className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <HorizontalScrollSection
                      playlists={playlists}
                      config={config}
                      completedPlaylists={completedPlaylists}
                      toggleComplete={toggleComplete}
                    />
                  </motion.section>
                );
              })}
            </div>
          )}

          {searchQuery && filteredPlaylists.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Found {filteredPlaylists.length} courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaylists.map((playlist, index) => {
                  const config =
                    difficultyConfig[
                      playlist.difficulty as keyof typeof difficultyConfig
                    ];
                  return (
                    <PlaylistCard
                      key={playlist.id}
                      playlist={playlist}
                      config={config}
                      index={index + 1}
                      isCompleted={completedPlaylists.has(playlist.id)}
                      toggleComplete={toggleComplete}
                    />
                  );
                })}
              </div>
            </motion.section>
          )}

          {searchQuery && filteredPlaylists.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 mb-6">Try different keywords</p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}

function HorizontalScrollSection({
  playlists,
  config,
  completedPlaylists,
  toggleComplete,
}: {
  playlists: typeof youtubePlaylists;
  config: (typeof difficultyConfig)[keyof typeof difficultyConfig];
  completedPlaylists: Set<number>;
  toggleComplete: (id: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScroll();
    const currentRef = scrollRef.current;
    currentRef?.addEventListener("scroll", checkScroll);
    return () => currentRef?.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white border-2 border-gray-200 p-3 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white border-2 border-gray-200 p-3 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 px-4 scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onScroll={checkScroll}
      >
        {playlists.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-80 snap-start"
          >
            <PlaylistCard
              playlist={playlist}
              config={config}
              index={index + 1}
              isCompleted={completedPlaylists.has(playlist.id)}
              toggleComplete={toggleComplete}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PlaylistCard({
  playlist,
  config,
  index,
  isCompleted,
  toggleComplete,
}: {
  playlist: (typeof youtubePlaylists)[0];
  config: (typeof difficultyConfig)[keyof typeof difficultyConfig];
  index: number;
  isCompleted?: boolean;
  toggleComplete?: (id: number) => void;
}) {
  return (
    <motion.div
      className="block group"
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative">
        <a
          href={playlist.playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
            <img
              src={`https://img.youtube.com/vi/${playlist.videoId}/hqdefault.jpg`}
              alt={playlist.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes("hqdefault")) {
                  target.src = `https://img.youtube.com/vi/${playlist.videoId}/mqdefault.jpg`;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className={`${config.bgColor} text-white p-4 rounded-full shadow-2xl`}
                initial={{ scale: 0.8, opacity: 0.8 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Play className="w-6 h-6" fill="currentColor" />
              </motion.div>
            </div>

            {playlist.is_burmese && (
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                <span className="text-sm font-semibold">🇲🇲</span>
              </div>
            )}

            <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {playlist.estDuration}
            </div>
          </div>
        </a>

        {toggleComplete && (
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleComplete(playlist.id);
            }}
            className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg hover:scale-110 transition-transform border-2 border-gray-300"
            aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </button>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <a
          href={playlist.playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3
            className={`font-bold line-clamp-2 group-hover:text-sky-600 transition-colors duration-200 text-base leading-snug ${
              isCompleted ? "text-gray-500 line-through" : "text-gray-900"
            }`}
          >
            {index}. {playlist.title}
          </h3>
        </a>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium">{playlist.channel}</span>
          </div>

          {isCompleted && (
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Completed
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
