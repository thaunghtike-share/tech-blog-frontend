"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const rawFaqs = [
  {
    question: "Do you offer professional DevOps services?",
    answer:
      "Yes! We offer a range of professional DevOps services designed to help teams accelerate development, improve deployment reliability, and optimize infrastructure. Our services include Cloud Migration (to AWS, Azure, or GCP), Infrastructure Automation using tools like Terraform and Ansible, CI/CD pipeline setup with GitHub Actions or Jenkins, Kubernetes cluster configuration and management, containerization with Docker, and Cloud-native Application Deployment. Whether you're just starting your cloud journey or looking to scale and automate your operations, we can help you build a robust, secure, and cost-effective DevOps environment tailored to your business goals. Visit our Services page to explore each offering in detail or get in touch for a consultation.",
  },
  {
    question: "How can I request a consultation?",
    answer:
      "You can request a consultation through several channels. Click the Messenger button on the bottom-right corner of the site to chat with us directly. You can also visit our Contact Page to fill out a quick form, reach out via LinkedIn for professional inquiries, or send us an email with your requirements and preferred time slots. We're happy to discuss your DevOps needs and find the best solution for your business.",
  },
  {
    question: "What skills are required to become a DevOps Engineer?",
    answer:
      "To become a DevOps Engineer, you need to have a combination of technical and soft skills. Technical skills include knowledge of programming languages, automation tools, containerization, cloud platforms, CI/CD pipelines, configuration management tools, and monitoring and logging tools.",
  },
  {
    question: "Does a DevOps Engineer know how to code?",
    answer:
      "A DevOps Engineer usually knows how to code, and not only that but they typically have great coding skills. After all, they use code on pretty much everything they do. DevOps Engineers also write infrastructure-as-code (IaC) using tools like Terraform or CloudFormation, build CI/CD pipelines with scripting languages, and automate system configurations with Ansible, Chef, or Puppet.",
  },
  {
    question: "How are DevOps Engineers different from developers?",
    answer:
      "DevOps Engineers and developers are different from each other, however, their roles complement themselves nicely in the context of software development. Developers focus on writing application code, implementing features, and optimizing performance, while DevOps Engineers ensure that the software runs smoothly in production by managing deployment pipelines, automating infrastructure, and maintaining system reliability.",
  },
  {
    question: "What is the difference between SRE and DevOps?",
    answer:
      "The difference between DevOps vs SRE lies in focus: DevOps Engineers improve software delivery and infrastructure automation, bridging development and operations, while Site Reliability Engineers (SREs) ensure system reliability and performance, applying software engineering to operations.",
  },
];

const faqsData: FAQ[] = rawFaqs.map((faq, index) => ({
  id: index,
  ...faq,
}));

export function MinimalFAQs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const nextFAQ = () => {
    setCurrentIndex((prev) => (prev + 1) % faqsData.length);
  };

  const prevFAQ = () => {
    setCurrentIndex((prev) => (prev - 1 + faqsData.length) % faqsData.length);
  };

  const goToFAQ = (index: number) => {
    setCurrentIndex(index);
  };

  const currentFAQ = faqsData[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-open-sans"
    >
      {/* Centered Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
        >
          Frequently Asked
          <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            Questions
          </span>
        </motion.h2>

        <motion.div
          className="h-1 w-32 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-black text-lg max-w-3xl mx-auto"
        >
          Find answers to frequently asked questions about DevOps and our
          services
        </motion.p>
      </motion.div>

      {/* FAQ Carousel Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* FAQ Content with integrated navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-300 p-8 shadow-xl relative">
          {/* Navigation Buttons - Positioned outside the card */}
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              onClick={prevFAQ}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm text-blue-500 rounded-full shadow-lg border border-gray-300 hover:border-blue-400 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="absolute -right-16 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              onClick={nextFAQ}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm text-blue-500 rounded-full shadow-lg border border-gray-300 hover:border-blue-400 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentFAQ.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center px-4"
            >
              {/* Question Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/95 rounded-2xl border border-sky-500/30">
                  <MessageCircleQuestion className="w-8 h-8 text-sky-600" />
                </div>
              </div>

              {/* Question */}
              <h3 className="text-xl md:text-2xl font-bold text-black mb-6 leading-tight">
                {currentFAQ.question}
              </h3>

              {/* Answer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-black text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
              >
                {currentFAQ.answer}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Quick Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {faqsData.map((faq, index) => (
          <motion.button
            key={faq.id}
            onClick={() => goToFAQ(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
              index === currentIndex
                ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
