"use client";

import { useState } from "react";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import {
  ExternalLink,
  Clock,
  Users,
  Play,
  ChevronDown,
  Globe,
} from "lucide-react";

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

const difficultyConfig = {
  Beginner: {
    color: "from-sky-600 to-blue-600",
    text: "text-blue-600",
    border: "border-blue-500",
    iconBg: "bg-gradient-to-r from-sky-600 to-blue-600",
    iconText: "text-white",
  },
  Intermediate: {
    color: "from-blue-500 to-purple-600",
    text: "text-purple-600",
    border: "border-purple-500",
    iconBg: "bg-gradient-to-r from-blue-500 to-purple-600",
    iconText: "text-white",
  },
  Advanced: {
    color: "from-green-500 to-emerald-600",
    text: "text-emerald-600",
    border: "border-emerald-500",
    iconBg: "bg-gradient-to-r from-green-500 to-emerald-600",
    iconText: "text-white",
  },
  Prerequisite: {
    color: "from-gray-500 to-gray-600",
    text: "text-gray-600",
    border: "border-gray-500",
    iconBg: "bg-gradient-to-r from-gray-500 to-gray-600",
    iconText: "text-white",
  },
};

export default function LearnDevOpsOnUtube() {
  const [showAll, setShowAll] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const difficulties = [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced",
    "Prerequisite",
  ];

  const filteredPlaylists =
    selectedDifficulty === "All"
      ? youtubePlaylists
      : youtubePlaylists.filter(
          (playlist) => playlist.difficulty === selectedDifficulty
        );

  const displayedPlaylists = showAll
    ? filteredPlaylists
    : filteredPlaylists.slice(0, 9);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 via-white to-gray-100 overflow-x-hidden relative">
      <MinimalHeader />

      <main className="relative z-10 -mt-8 md:-mt-5">
        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-2xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                Learn DevOps on YouTube
              </h1>
            </div>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Comprehensive collection of YouTube playlists and tutorials for
              all DevOps skill levels
            </p>

            {/* Difficulty Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => {
                    setSelectedDifficulty(difficulty);
                    setShowAll(false);
                  }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedDifficulty === difficulty
                      ? difficulty === "All"
                        ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg"
                        : `bg-gradient-to-r ${
                            difficultyConfig[
                              difficulty as keyof typeof difficultyConfig
                            ]?.color || "from-gray-500 to-gray-600"
                          } text-white shadow-lg`
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Playlists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedPlaylists.map((playlist) => {
              const config =
                difficultyConfig[
                  playlist.difficulty as keyof typeof difficultyConfig
                ];

              return (
                <div
                  key={playlist.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* YouTube Thumbnail */}
                  <div className="relative aspect-video bg-gray-900">
                    <iframe
                      src={`https://www.youtube.com/embed/${playlist.videoId}?modestbranding=1&rel=0`}
                      title={playlist.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                    {playlist.is_burmese && (
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <span
                            className="text-lg"
                            role="img"
                            aria-label="Burmese"
                          >
                            🇲🇲
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Playlist Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span
                        className={`inline-block ${config.iconBg} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                      >
                        {playlist.difficulty}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {playlist.title}
                    </h3>

                    <p className="text-gray-600 mb-4 font-semibold flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {playlist.channel}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          Duration:{" "}
                          <span className="font-semibold">
                            {playlist.estDuration}
                          </span>
                        </span>
                      </div>
                    </div>

                    <a
                      href={playlist.playlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${config.color} text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300`}
                    >
                      <Play className="w-4 h-4" />
                      Watch Playlist
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* See More / Show Less Button */}
          {filteredPlaylists.length > 9 && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold py-4 px-8 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {showAll
                  ? "Show Less"
                  : `See More Playlists (${filteredPlaylists.length - 9} more)`}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    showAll ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}

          {/* No playlists message */}
          {filteredPlaylists.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gradient-to-r from-gray-300 to-gray-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No playlists found
              </h3>
              <p className="text-gray-600">
                Try selecting a different difficulty level
              </p>
            </div>
          )}
        </section>
      </main>

      <div className="-mt-5 md:-mt-5">
        <MinimalFooter />
      </div>
    </div>
  );
}
