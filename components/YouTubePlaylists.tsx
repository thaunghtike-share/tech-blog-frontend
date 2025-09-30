"use client";
import { useState, useRef } from "react";
import {
  Globe,
  ExternalLink,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Rocket,
  Gauge,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Playlist {
  id: number;
  title: string;
  videoId: string;
  playlistUrl: string;
  channel: string;
  difficulty: "Prerequisite" | "Beginner" | "Intermediate" | "Advanced";
  estDuration: string;
  is_burmese?: boolean;
}

const difficultyConfig = {
  Beginner: {
    color: "from-red-500 to-red-600",
    text: "text-red-400",
    border: "border-red-500",
    iconBg: "bg-gradient-to-r from-red-500 to-red-600",
    iconText: "text-white",
    icon: <Rocket className="w-5 h-5" />,
  },
  Intermediate: {
    color: "from-red-600 to-red-700",
    text: "text-red-400",
    border: "border-red-600",
    iconBg: "bg-gradient-to-r from-red-600 to-red-700",
    iconText: "text-white",
    icon: <Gauge className="w-5 h-5" />,
  },
  Advanced: {
    color: "from-red-700 to-red-800",
    text: "text-red-400",
    border: "border-red-700",
    iconBg: "bg-gradient-to-r from-red-700 to-red-800",
    iconText: "text-white",
    icon: <Shield className="w-5 h-5" />,
  },
  Prerequisite: {
    color: "from-gray-500 to-blue-600",
    text: "text-gray-400",
    border: "border-gray-500",
    iconBg: "bg-gradient-to-r from-gray-500 to-blue-600",
    iconText: "text-white",
    icon: <Sparkles className="w-5 h-5" />,
  },
};

interface YouTubePlaylistsProps {
  showAll?: boolean;
  setShowAll?: (show: boolean) => void;
}

type DifficultyLevel = keyof typeof difficultyConfig;

export function YouTubePlaylists({
  showAll,
  setShowAll,
}: YouTubePlaylistsProps) {
  // Static playlists data from your API response
  const staticPlaylists: Playlist[] = [
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
    },
    {
      id: 2,
      title: "AWS Course Certification",
      videoId: "YqWuL3an-5o",
      playlistUrl: "https://www.youtube.com/watch?v=YqWuL3an-5o",
      channel: "Intellipaat",
      difficulty: "Intermediate",
      estDuration: "2 weeks",
      is_burmese: false,
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
    },
    {
      id: 7,
      title: "Docker Crash Course Tutorial",
      videoId: "31ieHmcTUOk",
      playlistUrl:
        "https://www.youtube.com/playlist?list=PL4cUxeGkcC9hxjeEtdHFNYMtCpjNBm3h7",
      channel: "Net Ninja",
      difficulty: "Beginner",
      estDuration: "1 weeks",
      is_burmese: false,
    },
    {
      id: 8,
      title: "Docker Tutorial",
      videoId: "zJ6WbK9zFpI",
      playlistUrl: "https://www.youtube.com/watch?v=zJ6WbK9zFpI&t=11s",
      channel: "Kode Kloud",
      difficulty: "Beginner",
      estDuration: "2 weeks",
      is_burmese: false,
    },
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
    },
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
    },
  ];

  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyLevel>("Beginner");
  const [internalShowAll, setInternalShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const coursesPerView = 3;

  const actualShowAll = showAll !== undefined ? showAll : internalShowAll;
  const actualSetShowAll =
    setShowAll !== undefined ? setShowAll : setInternalShowAll;

  const filteredPlaylists = staticPlaylists
    .filter((pl) => pl.difficulty === selectedDifficulty)
    .sort((a, b) => a.title.localeCompare(b.title));

  const totalSlides = Math.ceil(filteredPlaylists.length / coursesPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getCurrentCourses = () => {
    const startIndex = currentIndex * coursesPerView;
    return filteredPlaylists.slice(startIndex, startIndex + coursesPerView);
  };

  const getDifficultyStats = (difficulty: DifficultyLevel) => {
    const playlists = staticPlaylists.filter(
      (pl) => pl.difficulty === difficulty
    );
    const totalHours = playlists.reduce((acc, pl) => {
      const duration = pl.estDuration;
      const weeks =
        Number.parseInt(duration.split("-")[0]) ||
        Number.parseInt(duration.split(" ")[0]) ||
        1;
      return acc + weeks * 10; // Estimate 10 hours per week
    }, 0);
    return {
      count: playlists.length,
      totalHours,
      avgWeeks: Math.round(totalHours / 10),
    };
  };

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Header with matching AuthorsHero theme - Updated layout */}
      <div className="text-center mb-6 md:mb-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-4 md:mb-4 relative z-10"
        >
          {/* Animated bubble icon matching AuthorsHero */}
          <motion.div
            className="relative p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            {/* Bubble effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-red-400/30 to-red-500/30 rounded-full blur-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <Globe className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          {/* Title text beside the icon */}
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Learn DevOps on YouTube
          </motion.h2>

          {/* Chevron with dotted trail matching AuthorsHero */}
          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-red-400 ml-2" />
          </motion.div>
        </motion.div>

        {/* Animated line matching AuthorsHero */}
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto relative mb-4"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
            animate={{ x: [0, 90, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto relative z-10"
        >
          Recommended video playlists to learn DevOps tools like Linux, Docker,
          Kubernetes, AWS, Terraform, and more.
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-4 md:mb-8 flex justify-center"
      >
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 px-6 py-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 hover:border-red-500/50 transition-all duration-300 min-w-[280px]"
          >
            <div
              className={`p-2 rounded-xl ${difficultyConfig[selectedDifficulty].iconBg} shadow-lg`}
            >
              <div className={difficultyConfig[selectedDifficulty].iconText}>
                {difficultyConfig[selectedDifficulty].icon}
              </div>
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm text-gray-400">Difficulty Level</div>
              <div
                className={`font-semibold ${difficultyConfig[selectedDifficulty].text}`}
              >
                {selectedDifficulty}
              </div>
            </div>
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 left-0 right-0 bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 overflow-hidden z-50"
              >
                {(
                  ["Beginner", "Intermediate", "Advanced"] as DifficultyLevel[]
                ).map((difficultyKey) => {
                  const config = difficultyConfig[difficultyKey];
                  const hasPlaylists = staticPlaylists.some(
                    (pl) => pl.difficulty === difficultyKey
                  );
                  const stats = getDifficultyStats(difficultyKey);

                  if (!hasPlaylists) return null;

                  return (
                    <motion.button
                      key={difficultyKey}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                      onClick={() => {
                        setSelectedDifficulty(difficultyKey);
                        setIsDropdownOpen(false);
                        setCurrentIndex(0);
                      }}
                      className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-700/50 transition-colors duration-200 border-b border-gray-700 last:border-b-0"
                    >
                      <div
                        className={`p-2 rounded-xl ${config.iconBg} shadow-lg`}
                      >
                        <div className={config.iconText}>{config.icon}</div>
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold ${config.text}`}>
                          {difficultyKey}
                        </div>
                        <div className="text-sm text-gray-400">
                          {stats.count} courses
                        </div>
                      </div>
                      {selectedDifficulty === difficultyKey && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-lg"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      {filteredPlaylists.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center py-8 md:py-12"
        >
          <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center mb-3 md:mb-4 backdrop-blur-sm border border-gray-600">
            <Play className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
          </div>
          <h4 className="text-gray-300 font-medium text-base md:text-lg mb-2">
            No playlists available for this difficulty
          </h4>
          <p className="text-gray-500 text-sm md:text-base">
            Please select another difficulty or check back later.
          </p>
        </motion.div>
      ) : (
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-red-500/50 transition-all duration-300 -ml-6"
              >
                <ChevronLeft className="w-5 h-5 text-red-500" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-red-500/50 transition-all duration-300 -mr-6"
              >
                <ChevronRight className="w-5 h-5 text-red-500" />
              </motion.button>
            </>
          )}

          {/* Carousel Container */}
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                    {filteredPlaylists
                      .slice(
                        slideIndex * coursesPerView,
                        (slideIndex + 1) * coursesPerView
                      )
                      .map((pl, idx) => {
                        const config =
                          difficultyConfig[pl.difficulty as DifficultyLevel];
                        return (
                          <motion.div
                            key={pl.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative overflow-hidden"
                          >
                            {/* Background glow effect matching AuthorsHero */}
                            <motion.div
                              className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-red-500/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"
                              animate={{
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                            />

                            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl hover:border-red-500/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
                              <div className="relative aspect-video bg-gray-900 overflow-hidden">
                                <iframe
                                  src={`https://www.youtube.com/embed/${pl.videoId}?modestbranding=1&rel=0`}
                                  title={pl.title}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="w-full h-full"
                                />
                                {pl.is_burmese && (
                                  <div className="absolute top-4 right-4">
                                    <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                      <span
                                        role="img"
                                        aria-label="Burmese"
                                        className="text-lg select-none"
                                        title="Burmese"
                                      >
                                        🇲🇲
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="p-4 md:p-6 flex-grow">
                                <h3 className="text-base md:text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-red-400 transition-colors">
                                  {pl.title}
                                </h3>

                                <div className="space-y-2 mb-4 md:mb-6">
                                  <div className="flex items-center gap-2 text-sm md:text-sm text-gray-400">
                                    <Users className="w-4 h-4 md:w-4 md:h-4 text-gray-500" />
                                    <span className="font-medium text-gray-300">
                                      {pl.channel}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm md:text-sm text-gray-400">
                                    <Clock className="w-4 h-4 md:w-4 md:h-4 text-gray-500" />
                                    <span>
                                      Duration:{" "}
                                      <span className="font-medium text-gray-300">
                                        {pl.estDuration}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 md:p-6 pt-0">
                                <a
                                  href={pl.playlistUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r ${config.color} text-white font-semibold rounded-xl transition-all duration-200 text-sm md:text-base hover:shadow-lg hover:scale-105 group border border-transparent hover:border-white/20`}
                                >
                                  <Play className="w-3 h-3 md:w-4 md:h-4 mr-2 group-hover:scale-110 transition-transform" />
                                  View Course
                                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? `bg-gradient-to-r ${difficultyConfig[selectedDifficulty].color} shadow-lg`
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {/* Hide scrollbar for mobile scroll */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}