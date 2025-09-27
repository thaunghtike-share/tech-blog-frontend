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
import { motion, AnimatePresence } from "framer-motion";

interface DevOpsLab {
  id: number;
  title: string;
  platform: string;
  description: string;
  url: string;
  difficulty?: string;
}

const staticLabs: DevOpsLab[] = [
  {
    id: 1,
    title: "KodeKloud",
    platform: "KodeKloud",
    url: "https://studio.kodekloud.com/labs",
    description: "Hands-on labs with real-world scenarios covering Docker, Kubernetes, Terraform, and more. Perfect for beginners to advanced learners with guided exercises and instant feedback.",
    difficulty: "Beginner → Advanced"
  },
  {
    id: 2,
    title: "Killer Coda",
    platform: "killercoda", 
    url: "https://killercoda.com/",
    description: "Interactive browser-based labs that require no installation. Practice Kubernetes, Docker, Linux, and cloud technologies directly in your web browser with step-by-step tutorials.",
    difficulty: "Beginner → Intermediate"
  },
  {
    id: 3,
    title: "Kubernetes Lab",
    platform: "lets play with k8s",
    url: "https://labs.play-with-k8s.com/",
    description: "A fully functional Kubernetes playground where you can deploy pods, services, and explore cluster operations. Perfect for learning Kubernetes concepts hands-on.",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    title: "Docker Lab", 
    platform: "lets play with docker",
    url: "https://labs.play-with-docker.com",
    description: "Master containerization with this interactive Docker playground. Build, run, and manage containers while learning Docker commands and best practices.",
    difficulty: "Intermediate"
  },
  {
    id: 6,
    title: "Terraform Lab",
    platform: "kodekloud",
    url: "https://kodekloud.com/pages/free-labs/terraform",
    description: "Learn Infrastructure as Code with Terraform through practical labs. Create, manage, and deploy cloud resources using declarative configuration files.",
    difficulty: "Beginner"
  },
  {
    id: 7,
    title: "Linux Lab",
    platform: "kodekloud", 
    url: "https://kodekloud.com/free-labs/linux",
    description: "Essential Linux commands and administration tasks. Perfect for beginners to learn file systems, permissions, process management, and shell scripting.",
    difficulty: "Beginner"
  },
  {
    id: 8,
    title: "Cloud Computing Lab",
    platform: "KodeKloud",
    url: "https://kodekloud.com/cloud-playgrounds/aws",
    description: "Explore cloud services with hands-on labs in AWS, Azure, and GCP. Learn to deploy and manage cloud resources with practical exercises.",
    difficulty: "Beginner → Advanced"
  },
  {
    id: 9,
    title: "Git & GitHub Lab",
    platform: "GitHub Learning Lab",
    url: "https://lab.github.com/",
    description: "Master version control with interactive Git and GitHub tutorials. Learn branching, merging, pull requests, and collaborative workflows.",
    difficulty: "Beginner → Intermediate"
  },
  {
    id: 10,
    title: "Jenkins CI/CD",
    platform: "Jenkins Tutorials",
    url: "https://www.jenkins.io/doc/tutorials/",
    description: "Build continuous integration and deployment pipelines with Jenkins. Automate testing, building, and deployment processes with practical examples.",
    difficulty: "Intermediate"
  }
];

export function FreeLabs() {
  const [labs] = useState<DevOpsLab[]>(staticLabs);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % labs.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + labs.length) % labs.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [labs.length]);

  const currentLab = labs[currentSlide];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    })
  };

  return (
    <section ref={sectionRef} className="w-full max-w-4xl mx-auto px-4 py-16">
      {/* Enhanced Header */}
      <motion.div
        className="text-center mb-12 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
          {/* Animated bubble icon */}
          <motion.div
            className="relative p-4 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full shadow-2xl"
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
              className="absolute -inset-2 bg-gradient-to-r from-orange-400/30 to-yellow-500/30 rounded-full blur-lg"
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
            <FlaskConical className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Free DevOps Playgrounds
          </h2>

          {/* Chevron with dotted trail */}
          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"
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
            <ChevronRight className="w-6 h-6 text-orange-400 ml-2" />
          </motion.div>
        </div>

        <motion.div
          className="h-1 w-32 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full mx-auto relative"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Animated dots on the line */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
            animate={{ x: [0, 120, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto relative z-10">
          Explore these practical, free labs and playgrounds to level up your DevOps expertise
        </p>
      </motion.div>

      {/* Single Lab Display */}
      <div className="relative max-w-2xl mx-auto">
        {/* Navigation Buttons - Positioned outside the card */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="absolute -left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-2xl border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-orange-500/50 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-orange-400" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="absolute -right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-2xl border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-orange-500/50 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 text-orange-400" />
        </motion.button>

        {/* Lab Card */}
        <div className="relative h-80">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <div className="group relative h-full">
                {/* Animated background glow */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />

                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:border-orange-500/50 transition-all duration-300 h-full flex flex-col">
                  
                  {/* Title with Platform in Brackets */}
                  <motion.div 
                    className="text-center mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-3xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {currentLab.title}
                      <span className="text-orange-400 ml-2 text-2xl font-normal">
                        [{currentLab.platform}]
                      </span>
                    </h3>
                  </motion.div>

                  {/* Description */}
                  <motion.p 
                    className="text-gray-300 text-lg leading-relaxed mb-6 flex-grow text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentLab.description}
                  </motion.p>

                  {/* Updated Difficulty Style */}
                  {currentLab.difficulty && (
                    <motion.div 
                      className="flex justify-center mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full border border-orange-500/30">
                        <span className="text-orange-400 font-medium text-sm">
                          Level: {currentLab.difficulty}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Smaller Launch Button */}
                  <motion.div 
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <a
                      href={currentLab.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:scale-[1.02] hover:shadow-xl border border-orange-400/30 group/btn"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="mr-2"
                      >
                        <Play className="w-4 h-4" />
                      </motion.div>
                      Launch Playground
                      <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Dots */}
        <motion.div
          className="flex justify-center mt-8 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {labs.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-orange-500 to-yellow-600 shadow-lg scale-125"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </motion.div>

        {/* Slide Counter */}
        <motion.div 
          className="text-center mt-4 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {currentSlide + 1} / {labs.length}
        </motion.div>
      </div>
    </section>
  );
}