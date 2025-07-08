"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FAQ = {
  question: string;
  answer: string;
};

const faqsData: FAQ[] = [
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in DevOps and Automation technologies including Kubernetes, Terraform, Ansible, Azure, AWS, and CI/CD pipelines.",
  },
  {
    question: "Do you offer consulting services?",
    answer: "Yes, I provide DevOps consulting to help organizations improve their infrastructure automation, cloud adoption, and reliability.",
  },
  {
    question: "How can I contact you?",
    answer: "You can reach me via email at thaunghtikeoo.tho1234@gmail.com or connect with me on LinkedIn.",
  },
  {
    question: "Do you work long-term support?",
    answer: "Yes, I provide long-term support and maintenance for infrastructure and automation projects.",
  },
  {
    question: "Can you work in AI/MLOps?",
    answer: "Yes, I am actively exploring and working in AI and MLOps to streamline ML workflows and deployments.",
  },
  {
    question: "Do you make handover if clients hire in-house DevOps team?",
    answer: "Yes, I ensure proper handover and documentation if clients hire in-house DevOps engineers to take over ongoing operations.",
  },
];

export function MinimalFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayedFAQs = showAll ? faqsData : faqsData.slice(0, 6);

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4"
          >
            Need Help?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Quick answers to common questions about my services
          </motion.p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all"
            >
              <button
                className="w-full flex flex-col items-center p-6 text-center"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-600 text-sm px-4"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="mt-4">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {faqsData.length > 3 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center px-5 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              {showAll ? (
                <>
                  Show Less
                  <ChevronUp className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Show More FAQs
                  <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}