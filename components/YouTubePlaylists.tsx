"use client";
import { useState, useRef } from "react";
import {
  Globe,
  ExternalLink,
  Clock,
  ChevronDown,
  ChevronUp,
  Play,
  Users,
  Lightbulb,
  Rocket,
  Gauge,
  Shield,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

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
  Prerequisite: {
    color: "from-gray-500 to-slate-600",
    text: "text-gray-700",
    border: "border-white-500",
    iconBg: "bg-gradient-to-r from-gray-500 to-slate-600",
    iconText: "text-white",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  Beginner: {
    color: "from-green-500 to-emerald-600",
    text: "text-green-700",
    border: "border-green-500",
    iconBg: "bg-gradient-to-r from-green-500 to-emerald-600",
    iconText: "text-white",
    icon: <Rocket className="w-5 h-5" />,
  },
  Intermediate: {
    color: "from-blue-500 to-indigo-600",
    text: "text-blue-700",
    border: "border-blue-500",
    iconBg: "bg-gradient-to-r from-blue-500 to-indigo-600",
    iconText: "text-white",
    icon: <Gauge className="w-5 h-5" />,
  },
  Advanced: {
    color: "from-purple-500 to-pink-600",
    text: "text-purple-700",
    border: "border-purple-500",
    iconBg: "bg-gradient-to-r from-purple-500 to-pink-600",
    iconText: "text-white",
    icon: <Shield className="w-5 h-5" />,
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
      title: "AWS Cloud Computing For Beginners",
      videoId: "3XFODda6YXo",
      playlistUrl:
        "https://www.youtube.com/playlist?list=PLEiEAq2VkUULlNtIFhEQHo8gacvme35rz",
      channel: "Simplilearn",
      difficulty: "Beginner",
      estDuration: "3-4 weeks",
      is_burmese: false,
    },
    {
      id: 2,
      title: "AWS Course Certification",
      videoId: "YqWuL3an-5o",
      playlistUrl: "https://www.youtube.com/watch?v=YqWuL3an-5o",
      channel: "Intellipaat",
      difficulty: "Beginner",
      estDuration: "3-4 weeks",
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
      estDuration: "3-5 weeks",
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
      estDuration: "2-3 weeks",
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
      estDuration: "3-5 weeks",
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
      estDuration: "3-5 weeks",
      is_burmese: false,
    },
    {
      id: 7,
      title: "Docker Crash Course Tutorial",
      videoId: "31ieHmcTUOk",
      playlistUrl:
        "https://www.youtube.com/playlist?list=PL4cUxeGkcC9hxjeEtdHFNYMtCpjNBm3h7",
      channel: "Net Ninja",
      difficulty: "Intermediate",
      estDuration: "2-3 weeks",
      is_burmese: false,
    },
    {
      id: 8,
      title: "Docker Tutorial",
      videoId: "zJ6WbK9zFpI",
      playlistUrl: "https://www.youtube.com/watch?v=zJ6WbK9zFpI&t=11s",
      channel: "Kode Kloud",
      difficulty: "Intermediate",
      estDuration: "2-3 weeks",
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
      estDuration: "8 weeks",
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
      estDuration: "3-5 weeks",
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
      estDuration: "3-5 weeks",
      is_burmese: false,
    },
    {
      id: 12,
      title: "Git – Full Course for Beginners",
      videoId: "zTjRZNkhiEU",
      playlistUrl: "https://www.youtube.com/watch?v=zTjRZNkhiEU",
      channel: "freeCodeCamp.org",
      difficulty: "Intermediate",
      estDuration: "3-5 weeks",
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
      estDuration: "8-10 weeks",
      is_burmese: false,
    },
    {
      id: 14,
      title: "Ansible Tutorials",
      videoId: "3RiVKs8GHYQ",
      playlistUrl:
        "https://www.youtube.com/playlist?list=PLT98CRl2KxKEUHie1m24-wkyHpEsa4Y70",
      channel: "Learn Linux TV",
      difficulty: "Intermediate",
      estDuration: "4-5 weeks",
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
      estDuration: "3 weeks",
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
        "https://www.youtube.com/watch?v=tbv1lTF1wFU&list=PL8VzFQ8k4U1Jp6eWgHSXHiiRWRvPyCKRj",
      channel: "Sanjeev Thiyagarajan",
      difficulty: "Advanced",
      estDuration: "2 weeks",
      is_burmese: false,
    },
  ];

  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyLevel>("Beginner");
  const [internalShowAll, setInternalShowAll] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const actualShowAll = showAll !== undefined ? showAll : internalShowAll;
  const actualSetShowAll =
    setShowAll !== undefined ? setShowAll : setInternalShowAll;

  const filteredPlaylists = staticPlaylists
    .filter((pl) => pl.difficulty === selectedDifficulty)
    .sort((a, b) => a.title.localeCompare(b.title));

  const displayedPlaylists = actualShowAll
    ? filteredPlaylists
    : filteredPlaylists.slice(0, 6); // Show first 6 by default

  const allDifficulties: DifficultyLevel[] = [
    "Prerequisite",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="text-center mb-6 md:mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-4"
        >
          <div className="p-2 md:p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-lg">
            <Globe className="w-4 h-4 md:w-4 md:h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-2 py-1 md:px-4 md:py-1 rounded-full text-sm md:text-sm font-medium bg-red-100 text-red-700 border border-red-200">
            <Play className="w-4 h-4 md:w-4 md:h-4 mr-1 md:mr-2" /> Youtube
            Playlists
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-red-800 to-pink-800 bg-clip-text text-transparent mb-4 md:mb-4"
        >
          Learn DevOps on Youtube
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Recommended video playlists to learn DevOps tools like Linux, Docker,
          Kubernetes, AWS, Terraform, and more.
        </motion.p>
      </div>

      {/* Difficulty Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex overflow-x-auto sm:overflow-x-visible flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-3 mb-4 md:mb-8 pb-4"
      >
        {allDifficulties.map((difficultyKey) => {
          const config = difficultyConfig[difficultyKey];
          const isActive = selectedDifficulty === difficultyKey;
          const hasPlaylists = staticPlaylists.some(
            (pl) => pl.difficulty === difficultyKey
          );

          if (!hasPlaylists) return null;

          return (
            <motion.button
              key={difficultyKey}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedDifficulty(difficultyKey);
                actualSetShowAll(false);
              }}
              className={`group relative flex-shrink-0 flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? `bg-gradient-to-r ${config.color} text-white`
                  : `bg-white text-gray-700 hover:bg-gray-50 border border-gray-200`
              }`}
            >
              <div
                className={`p-1.5 rounded-xl ${
                  isActive
                    ? "bg-white/20"
                    : `${config.iconBg} ${config.iconText}`
                }`}
              >
                {config.icon}
              </div>
              <span>{difficultyKey}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Playlists */}
      {filteredPlaylists.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center py-8 md:py-12"
        >
          <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-3 md:mb-4">
            <Play className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
          </div>
          <h4 className="text-gray-700 font-medium text-base md:text-lg mb-2">
            No playlists available for this difficulty
          </h4>
          <p className="text-gray-500 text-sm md:text-base">
            Please select another difficulty or check back later.
          </p>
        </motion.div>
      ) : (
        <div className="relative">
          {/* Mobile scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 sm:gap-8 pb-4 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-x-visible lg:snap-none"
          >
            {displayedPlaylists.map((pl, idx) => {
              const config = difficultyConfig[pl.difficulty];
              return (
                <motion.div
                  key={pl.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`flex-shrink-0 w-[75vw] snap-center sm:w-auto group bg-white rounded-xl shadow-lg border-l-4 ${config.border} overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col`}
                >
                  <div className="relative aspect-video bg-gray-900 overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${pl.videoId}?modestbranding=1&rel=0`}
                      title={pl.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4 md:p-5 flex-grow">
                    <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      {pl.title}
                      {pl.is_burmese && (
                        <span
                          role="img"
                          aria-label="Burmese"
                          className="text-xl select-none"
                          title="Burmese"
                        >
                          🇲🇲
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-2 mb-2 text-sm md:text-sm text-gray-600">
                      <Users className="w-4 h-4 md:w-4 md:h-4 text-gray-500" />
                      <span>
                        <strong>{pl.channel}</strong>
                      </span>
                    </div>
                    <div className="flex items-center text-sm md:text-sm text-gray-500 mb-4 md:mb-5">
                      <Clock className="w-4 h-4 md:w-4 md:h-4 mr-1 text-red-500" />
                      <span>
                        Estimated: <strong>{pl.estDuration}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="p-4 md:p-5 pt-0">
                    <a
                      href={pl.playlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r ${config.color} text-white font-medium rounded-lg transition-colors duration-200 text-sm md:text-base`}
                    >
                      <Play className="w-3 h-3 md:w-4 md:h-4 mr-2" /> Watch
                      Playlist{" "}
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Centered scroll indicator (right side) */}
          {displayedPlaylists.length > 1 && (
            <div className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 pr-2">
              <motion.button
                onClick={scrollRight}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm text-red-600 rounded-full shadow-lg border border-gray-200"
              >
                <div className="relative">
                  <ChevronRight className="w-5 h-5" />
                  <motion.div
                    animate={{
                      x: [0, 4, 0],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                    }}
                    className="absolute -right-1 -top-1 w-2 h-2 bg-red-600 rounded-full"
                  />
                </div>
              </motion.button>
            </div>
          )}
        </div>
      )}
      {/* Show More/Less Button */}
      {filteredPlaylists.length > 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-3 text-center hidden sm:block"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const newState = !actualShowAll;
              actualSetShowAll(newState);
              if (!newState && sectionRef.current) {
                sectionRef.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className={`inline-flex items-center gap-2 px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r ${difficultyConfig[selectedDifficulty].color} text-white font-medium rounded-2xl transition-colors duration-200 text-sm md:text-base`}
          >
            {actualShowAll ? (
              <>
                Show Less <ChevronUp className="w-4 h-4 mr-2" />
              </>
            ) : (
              <>
                See All Playlists <ChevronDown className="w-4 h-4 mr-2" />
              </>
            )}
          </motion.button>
        </motion.div>
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