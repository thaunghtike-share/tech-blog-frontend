"use client";
import { motion } from "framer-motion";
import {
  Cloud,
  Cog,
  Globe,
  ArrowRight,
  Sparkles,
  Server,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Cloud Migration",
    desc: "Modernize with Kubernetes & GitOps",
    icon: Cloud,
    gradient: "from-sky-500 to-blue-600",
    url: "/services/cloud-migration",
  },
  {
    title: "Infrastructure Automation",
    desc: "Automate your infra with iac tools",
    icon: Cog,
    gradient: "from-orange-500 to-red-600",
    url: "/services/infrastructure-automation",
  },
  {
    title: "Part Time DevOps Support",
    desc: "Flexible support for your DevOps needs",
    icon: Globe,
    gradient: "from-cyan-500 to-blue-600",
    url: "/services/part-time-devops-support",
  },
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace all spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars except hyphen
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

export function ServicesHero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20">
      {/* Header with bubble icon and dotted animations */}
      <motion.div
        className="text-center mb-16 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background pattern with dotted signs */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(100,100,100,0.05)_50%,transparent_75%)] bg-[length:20px_20px]" />

        <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
          {/* Animated bubble icon */}
          <motion.div
            className="relative p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            {/* Bubble effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-orange-400/30 to-red-500/30 rounded-full blur-lg"
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
            <Server className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            DevOps Services
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
                className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
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
          className="h-1 w-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto relative"
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
          Professional solutions to accelerate your digital transformation
        </p>
      </motion.div>

      {/* Services Grid with background images and animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative overflow-hidden"
            >
              {/* Background image effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl" />
              <div className="absolute inset-0 bg-[url('/abstract-tech-pattern.jpg')] bg-cover bg-center opacity-10 rounded-2xl" />

              {/* Animated background glow */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2">
                {/* Animated bubble icon */}
                <motion.div
                  className={`inline-flex p-4 bg-gradient-to-r ${service.gradient} rounded-full shadow-lg mb-6 relative`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Bubble rings */}
                  <motion.div
                    className="absolute -inset-2 border-2 border-white/20 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <motion.div
                    className="absolute -inset-4 border border-white/10 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.5,
                    }}
                  />
                  <Icon className="w-8 h-8 text-white relative z-10" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 mb-8 leading-relaxed">
                  {service.desc}
                </p>

                {/* Animated dotted line separator */}
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>

                {/* CTA Button with chevron */}
                <Link
                  href={`/services/${slugify(service.title)}`}
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium group-hover:gap-3 transition-all"
                >
                  Learn More
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA with animated elements */}
      <motion.div
        className="text-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {/* Dotted background pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-orange-400/30 rounded-full mx-4"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <Link
          href="/services/cloud-migration"
          className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl hover:shadow-orange-500/25 border border-orange-400/30 z-10"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          Explore Services
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
}
