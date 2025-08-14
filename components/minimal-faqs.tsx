"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Info,
  MessageCircleQuestion,
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
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const faqRef = useRef<HTMLDivElement>(null);
  const faqContainerRef = useRef<HTMLDivElement>(null);

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
    const newShowAll = !showAll;
    setShowAll(newShowAll);

    // Wait for the state to update and DOM to render
    setTimeout(() => {
      if (faqContainerRef.current) {
        if (newShowAll) {
          // Scroll to the last FAQ when showing more
          const lastFaq = faqContainerRef.current.lastElementChild;
          lastFaq?.scrollIntoView({ behavior: "smooth" });
        } else {
          // Scroll to top of FAQ section when showing less
          faqRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 100);
  };

  const displayedFAQs = showAll ? faqsData : faqsData.slice(0, 4);

  return (
    <section
      ref={faqRef}
      className="mt-20 w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center"
    >
      {/* Header section */}
      <div className="text-center mb-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-2xl shadow-md">
            <HelpCircle className="w-4 h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-50 to-emerald-50 text-indigo-700 border border-indigo-200">
            <MessageCircleQuestion className="w-4 h-4 mr-2" /> FAQs
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-emerald-800 bg-clip-text text-transparent mb-2"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-gray-600"
        >
          Find answers to common questions about DevOps and our services
        </motion.p>
      </div>

      {/* FAQ items container */}
      <div ref={faqContainerRef} className="w-full max-w-4xl space-y-6">
        {displayedFAQs.map((faq) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: faq.id * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between p-6"
              onClick={() => toggleFAQ(faq.id)}
              aria-expanded={openIds.has(faq.id)}
            >
              <h3 className="text-sm md:text-lg font-medium text-gray-900 text-center flex-1">
                {faq.question}
              </h3>
              <div className="ml-4 flex-shrink-0">
                {openIds.has(faq.id) ? (
                  <Minus className="w-5 h-5 text-indigo-600" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </button>
            <AnimatePresence>
              {openIds.has(faq.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Show More/Less button */}
      {faqsData.length > 4 && (
        <div className="mt-8 flex justify-center">
          <motion.button
            onClick={handleToggleShowAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center px-6 py-3 rounded-2xl text-sm md:text-base font-medium transition-all duration-300 bg-gradient-to-r from-indigo-500 to-emerald-600 text-white shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-emerald-700"
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp className="ml-2 w-4 h-4" />
              </>
            ) : (
              <>
                Show More FAQs
                <ChevronDown className="ml-2 w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      )}
    </section>
  );
}