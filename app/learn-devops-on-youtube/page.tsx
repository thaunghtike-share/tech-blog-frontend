"use client";

import { useState, useMemo } from "react";
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
} from "lucide-react";
import { motion } from "framer-motion";

// Using the same data structure from your YouTubePlaylists
const youtubePlaylists = [
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
  },
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
  },
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
  },
  {
    id: 4,
    title: "AZ-900 Azure Fundamentals",
    videoId: "IUCEFBmYIog",
    playlistUrl:
      "https://www.youtube.com/playlist?list=PLlVtbbG169nED0_vMEniWBQjSoxTsBYS3",
    channel: "John Savill's Technical Training",
    difficulty: "Beginner",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: false,
    description: "In-depth Azure certification preparation",
  },
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
  },
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
  },

  // Intermediate Playlists
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },

  // Advanced Playlists
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },

  // Prerequisite Playlists
  {
    id: 23,
    title: "Python For Beginners",
    videoId: "QXeEoD0pB3E",
    playlistUrl:
      "https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3",
    channel: "Telusko",
    difficulty: "Prerequisite",
    estDuration: "10 weeks",
    is_burmese: false,
    recommended: true,
    description: "Python programming fundamentals for automation",
  },
  {
    id: 24,
    title: "Computer Fundamentals",
    videoId: "OGM2BJ29Syg",
    playlistUrl:
      "https://www.youtube.com/watch?v=OGM2BJ29Syg&list=PLeH4ngtDM7eE-1_mdWuXWyZrI_FMHnyJ0",
    channel: "Professor Adam Morgan",
    difficulty: "Prerequisite",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: false,
    description: "Basic computer science concepts",
  },
  {
    id: 25,
    title: "Network+ Training",
    videoId: "k7IOn3TiUc8",
    playlistUrl:
      "https://www.youtube.com/watch?v=k7IOn3TiUc8&list=PLG49S3nxzAnl_tQe3kvnmeMid0mjF8Le8",
    channel: "Professor Messer",
    difficulty: "Prerequisite",
    estDuration: "6 weeks",
    is_burmese: false,
    recommended: true,
    description: "Networking fundamentals certification",
  },
  {
    id: 26,
    title: "Operating System",
    videoId: "vBURTt97EkA",
    playlistUrl:
      "https://www.youtube.com/watch?v=vBURTt97EkA&list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O",
    channel: "Neso Academy",
    difficulty: "Prerequisite",
    estDuration: "4 weeks",
    is_burmese: false,
    recommended: false,
    description: "Operating system concepts and principles",
  },
  {
    id: 27,
    title: "Virtualization Fundamentals",
    videoId: "CaDQuYKxYFU",
    playlistUrl:
      "https://www.youtube.com/watch?v=CaDQuYKxYFU&list=PLf7QeYWBebsdlJguAzRR8I1bUIxCHujNo",
    channel: "Tech Matters",
    difficulty: "Prerequisite",
    estDuration: "2 weeks",
    is_burmese: false,
    recommended: true,
    description: "Virtualization technology basics",
  },
  {
    id: 32,
    title: "Python (Burmese)",
    videoId: "q8GdtmrELvQ",
    playlistUrl:
      "https://www.youtube.com/watch?v=q8GdtmrELvQ&list=PL-ew_2kpx4xanABoHpggANt2mYoIakh2m",
    channel: "Technortal",
    difficulty: "Prerequisite",
    estDuration: "8 weeks",
    is_burmese: true,
    recommended: false,
    description: "Python programming in Burmese",
  },
  {
    id: 33,
    title: "Networking (Burmese)",
    videoId: "DhJ4kL2HbuA",
    playlistUrl:
      "https://www.youtube.com/watch?v=DhJ4kL2HbuA&list=PLuMzkmyfR9LY64pZl4zhYehlpXXAtGwZ-",
    channel: "Rhc Technologies",
    difficulty: "Prerequisite",
    estDuration: "4 weeks",
    is_burmese: true,
    recommended: false,
    description: "Networking basics in Burmese",
  },
];

const difficultyConfig = {
  Beginner: {
    gradient: "from-sky-600 to-blue-600",
    bgColor: "bg-gradient-to-r from-sky-600 to-blue-600",
    lightBg: "bg-sky-100",
    textColor: "text-sky-600",
    borderColor: "border-sky-200",
    icon: BookOpen,
  },
  Intermediate: {
    gradient: "from-blue-500 to-blue-700",
    bgColor: "bg-gradient-to-r from-blue-500 to-blue-700",
    lightBg: "bg-blue-100",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    icon: TrendingUp,
  },
  Advanced: {
    gradient: "from-indigo-500 to-indigo-700",
    bgColor: "bg-gradient-to-r from-indigo-500 to-indigo-700",
    lightBg: "bg-indigo-100",
    textColor: "text-indigo-600",
    borderColor: "border-indigo-200",
    icon: Star,
  },
  Prerequisite: {
    gradient: "from-gray-500 to-gray-700",
    bgColor: "bg-gradient-to-r from-gray-500 to-gray-700",
    lightBg: "bg-gray-100",
    textColor: "text-gray-600",
    borderColor: "border-gray-200",
    icon: BookOpen,
  },
};

const learningPaths = {
  Beginner: {
    title: "Start Your DevOps Journey",
    description:
      "Begin with foundational concepts and essential tools. Master Linux, networking, and cloud basics to build a solid foundation for your DevOps career.",
    recommendedOrder: [
      "Linux Essentials",
      "CCNA Free Course",
      "Cloud Fundamentals",
      "Azure (AZ-900) Full Course",
      "Docker Crash Course Tutorial",
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
    recommendedOrder: [
      "Docker Crash Course Tutorial",
      "CICD Tutorials",
      "Git – Full Course for Beginners",
      "Ansible Zero to Hero",
      "AWS Security Full Course",
    ],
    duration: "12-16 weeks",
    skills: ["Docker", "CI/CD", "Git", "Ansible", "AWS Security"],
  },
  Advanced: {
    title: "Master Production DevOps",
    description:
      "Advanced topics including Kubernetes, Terraform, GitOps, and security. Learn to manage complex infrastructure and implement enterprise-grade DevOps practices.",
    recommendedOrder: [
      "Kubernetes Administrator Course",
      "Terraform Full Course For Beginners",
      "DevOps Zero To Hero Course",
      "Hashicorp Vault",
      "Kubernetes Logging & Monitoring",
    ],
    duration: "16-20 weeks",
    skills: ["Kubernetes", "Terraform", "GitOps", "Security", "Monitoring"],
  },
  Prerequisite: {
    title: "Build Your Foundation",
    description:
      "Essential computer science and programming fundamentals. These courses provide the necessary background for understanding DevOps concepts and tools.",
    recommendedOrder: [
      "Python For Beginners",
      "Network+ Training",
      "Virtualization Fundamentals",
      "Operating System",
      "Computer Fundamentals",
    ],
    duration: "12-16 weeks",
    skills: ["Python", "Networking", "Virtualization", "OS Concepts"],
  },
};

export default function LearnDevOpsOnUtube() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const difficulties = [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced",
    "Prerequisite",
  ];

  const filteredPlaylists = useMemo(() => {
    let filtered = youtubePlaylists;

    if (searchQuery) {
      filtered = filtered.filter(
        (playlist) =>
          playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          playlist.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(
        (playlist) => playlist.difficulty === selectedDifficulty
      );
    }

    return filtered;
  }, [searchQuery, selectedDifficulty]);

  const playlistsByDifficulty = useMemo(() => {
    const groups: { [key: string]: typeof youtubePlaylists } = {
      Beginner: [],
      Intermediate: [],
      Advanced: [],
      Prerequisite: [],
    };

    filteredPlaylists.forEach((playlist) => {
      if (groups[playlist.difficulty]) {
        groups[playlist.difficulty].push(playlist);
      }
    });

    return groups;
  }, [filteredPlaylists]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MinimalHeader />

      <main className="relative z-10 pt-8">
        {/* Modern Header Section */}
        <section className="relative bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 8 + 2}px`,
                  height: `${Math.random() * 8 + 2}px`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-sky-100 bg-clip-text text-transparent">
                  Learn DevOps
                </h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-sky-100 text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed"
              >
                Curated YouTube playlists to master DevOps from fundamentals to
                advanced production-ready skills
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-2xl mx-auto relative"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search playlists, channels, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-sky-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sky-200 hover:text-white text-2xl"
                    >
                      ×
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Difficulty Filter */}
        <section className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sky-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-sky-600" />
                </div>
                <span className="text-gray-700 font-semibold text-lg">
                  Learning Path:
                </span>
              </div>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {difficulties.map((difficulty) => {
                  const config =
                    difficultyConfig[
                      difficulty as keyof typeof difficultyConfig
                    ];
                  const IconComponent = config?.icon;
                  return (
                    <motion.button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-2xl font-semibold text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                        selectedDifficulty === difficulty
                          ? difficulty === "All"
                            ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg"
                            : `${config.bgColor} text-white shadow-lg`
                          : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                      {difficulty}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Results */}
          {(searchQuery || selectedDifficulty === "All") &&
            filteredPlaylists.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-12 bg-gradient-to-b from-sky-600 to-blue-600 rounded-full"></div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {searchQuery
                        ? `Search Results (${filteredPlaylists.length})`
                        : "All Playlists"}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {searchQuery
                        ? "Playlists matching your search"
                        : "Complete collection of DevOps learning resources"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredPlaylists.map((playlist, index) => (
                    <motion.div
                      key={playlist.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <PlaylistCard playlist={playlist} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

          {/* Organized by Difficulty Sections */}
          {!searchQuery && selectedDifficulty !== "All" && (
            <div className="space-y-20">
              {Object.entries(playlistsByDifficulty).map(
                ([difficulty, playlists]) => {
                  if (playlists.length === 0) return null;

                  const config =
                    difficultyConfig[
                      difficulty as keyof typeof difficultyConfig
                    ];
                  const path =
                    learningPaths[difficulty as keyof typeof learningPaths];
                  const IconComponent = config.icon;

                  return (
                    <motion.section
                      key={difficulty}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="scroll-mt-20"
                    >
                      {/* Section Header with Learning Path */}
                      <div className="mb-12">
                        <div className="flex items-start gap-6 mb-8">
                          <div
                            className={`p-4 rounded-2xl ${config.bgColor} text-white shadow-lg`}
                          >
                            <IconComponent className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <h2 className="text-4xl font-bold text-gray-900">
                                {path.title}
                              </h2>
                              <span
                                className={`px-3 py-1 ${config.lightBg} ${config.textColor} rounded-full text-sm font-semibold`}
                              >
                                {playlists.length} playlists
                              </span>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mb-6">
                              {path.description}
                            </p>

                            {/* Learning Path Details */}
                            <div className="bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-sky-600" />
                                    Recommended Learning Order
                                  </h4>
                                  <ol className="space-y-2">
                                    {path.recommendedOrder
                                      .slice(0, 5)
                                      .map((course, index) => (
                                        <li
                                          key={index}
                                          className="flex items-center gap-3 text-gray-700"
                                        >
                                          <span
                                            className={`w-6 h-6 rounded-full ${config.bgColor} text-white text-sm flex items-center justify-center font-semibold`}
                                          >
                                            {index + 1}
                                          </span>
                                          {course}
                                        </li>
                                      ))}
                                  </ol>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-sky-600" />
                                    Path Details
                                  </h4>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                      <span className="text-gray-600">
                                        Estimated Duration:
                                      </span>
                                      <span className="font-semibold text-gray-900">
                                        {path.duration}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-gray-600 mb-2 block">
                                        Skills You'll Learn:
                                      </span>
                                      <div className="flex flex-wrap gap-2">
                                        {path.skills.map((skill, index) => (
                                          <span
                                            key={index}
                                            className={`px-3 py-1 ${config.lightBg} ${config.textColor} rounded-full text-sm font-medium`}
                                          >
                                            {skill}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Playlists Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {playlists.map((playlist, index) => (
                          <motion.div
                            key={playlist.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <PlaylistCard playlist={playlist} />
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  );
                }
              )}
            </div>
          )}

          {/* No Results */}
          {filteredPlaylists.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-gradient-to-r from-gray-200 to-gray-300 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No playlists found
              </h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">
                {searchQuery
                  ? "Try different search terms or clear the search to see all playlists"
                  : "Try selecting a different learning path to explore available courses"}
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}

// Enhanced Playlist Card Component
function PlaylistCard({
  playlist,
}: {
  playlist: (typeof youtubePlaylists)[0];
}) {
  const config =
    difficultyConfig[playlist.difficulty as keyof typeof difficultyConfig];

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:border-sky-200"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${playlist.videoId}/maxresdefault.jpg`}
          alt={playlist.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = `https://img.youtube.com/vi/${playlist.videoId}/hqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`${config.bgColor} text-white p-4 rounded-full shadow-2xl transform scale-75 group-hover:scale-100 transition-all duration-300 opacity-90 group-hover:opacity-100`}
          >
            <Play className="w-6 h-6" fill="currentColor" />
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            {playlist.recommended && (
              <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-current" />
                Recommended
              </div>
            )}
            <div
              className={`${config.bgColor} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}
            >
              {playlist.difficulty}
            </div>
          </div>

          {/* Burmese Flag */}
          {playlist.is_burmese && (
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg">
              <span className="text-sm" role="img" aria-label="Burmese">
                🇲🇲
              </span>
            </div>
          )}
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-black/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
          <Clock className="w-3 h-3 inline mr-1" />
          {playlist.estDuration}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-sky-600 transition-colors duration-200 text-lg leading-tight">
          {playlist.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {playlist.description}
        </p>

        {/* Channel */}
        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium">{playlist.channel}</span>
        </div>

        {/* Watch Button */}
        <motion.a
          href={playlist.playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full inline-flex items-center justify-center gap-2 ${config.bgColor} text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 group-hover:scale-105`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-4 h-4" />
          Watch Playlist
        </motion.a>
      </div>
    </motion.div>
  );
}
