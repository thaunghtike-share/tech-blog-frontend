"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Zap,
  FlaskConical,
  HelpCircle,
  Info,
} from "lucide-react";
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
      "Yes! We provide services such as Cloud Migration, Infrastructure Automation, and Cloud-native App Deployment. Visit our Services page to learn more.",
  },
  {
    question: "How can I request a consultation?",
    answer:
      "Click the Messenger button at the right side of the site or reach out via our Contact Page.",
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
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const faqRef = useRef<HTMLElement | null>(null);

  // Detect screen size on mount
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (desktop) setShowAll(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFAQ = (id: number) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleToggleShowAll = () => {
    if (showAll && faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowAll(!showAll);
  };

  const displayedFAQs = isDesktop || showAll ? faqsData : faqsData.slice(0, 3);

  return (
    <section
      ref={faqRef}
      className="mt-20 w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center"
    >
      {/* FreeLab-style centered header */}
      <div className="text-center mb-7 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-md">
            <HelpCircle className="w-4 h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200">
            <Info className="w-4 h-4 mr-2" /> FAQs
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600"
        >
          Find answers to common questions about DevOps and our services
        </motion.p>
      </div>

      {/* Centered single column layout with reduced width */}
      <div className="w-full max-w-3xl space-y-4">
        {displayedFAQs.map((faq) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: faq.id * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl"
          >
            <button
              type="button"
              className="w-full flex flex-col items-center p-6 text-center"
              onClick={() => toggleFAQ(faq.id)}
              aria-expanded={openIds.has(faq.id)}
            >
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm md:text-lg font-medium text-gray-900 text-left flex-1">
                    {faq.question}
                  </h3>
                  <div className="ml-4 flex-shrink-0">
                    {openIds.has(faq.id) ? (
                      <Minus className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
                <AnimatePresence>
                  {openIds.has(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600 text-left leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Show More/Less button - only for mobile */}
      {!isDesktop && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleToggleShowAll}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-sm font-medium bg-white/50 text-gray-700 bg-gray-50 hover:bg-gray-50 transition-colors"
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp className="ml-2 w-4 h-4" />
              </>
            ) : (
              <>
                Show More
                <ChevronDown className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
