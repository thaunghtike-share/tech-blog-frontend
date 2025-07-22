"use client";
import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
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
      "A DevOps Engineer usually knows how to code, and not only that but they typically have great coding skills. After all, they use code on pretty much everything they do. DevOps Engineers also write infrastructure-as-code (IaC) using tools like Terraform or CloudFormation, build CI/CD pipelines with scripting languages, and automate system configurations with Ansible, Chef, or Puppet",
  },
  {
    question: "How are DevOps Engineers different from developers?",
    answer:
      "DevOps Engineers and developers are different from each other, however, their roles complement themselves nicely in the context of software development. Developers focus on writing application code, implementing features, and optimizing performance, while DevOps Engineers ensure that the software runs smoothly in production by managing deployment pipelines, automating infrastructure, and maintaining system reliability. A key difference is that developers primarily work on building and improving applications, whereas DevOps Engineers handle the processes and tools that enable continuous integration, automated testing, and efficient deployments.",
  },
  {
    question: "What is the difference between SRE and DevOps?",
    answer:
      "The difference between DevOps vs SRE lies in focus: DevOps Engineers improve software delivery and infrastructure automation, bridging development and operations, while Site Reliability Engineers (SREs) ensure system reliability and performance, applying software engineering to operations. DevOps emphasizes CI/CD and collaboration, whereas SREs prioritize monitoring, incident response, and scalability.",
  },
];

const faqsData: FAQ[] = rawFaqs.map((faq, index) => ({
  id: index,
  ...faq,
}));

export function MinimalFAQs() {
  // Use Set for open FAQ IDs
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const faqRef = useRef<HTMLElement | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      console.log("Toggled ID:", id, "Open IDs:", Array.from(newSet));
      return newSet;
    });
  };

  const handleToggleShowAll = () => {
    if (showAll && faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowAll(!showAll);
  };

  const displayedFAQs = showAll ? faqsData : faqsData.slice(0, 8);

  return (
    <section
      ref={faqRef}
      className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </section>
  );
}
