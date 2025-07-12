"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp, Plus, Minus, HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type FAQ = {
  question: string
  answer: string
}

const faqsData: FAQ[] = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in DevOps and Automation technologies including Kubernetes, Terraform, Ansible, Azure, AWS, and CI/CD pipelines.",
  },
  {
    question: "Do you offer consulting services?",
    answer:
      "Yes, I provide DevOps consulting to help organizations improve their infrastructure automation, cloud adoption, and reliability.",
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
    answer:
      "Yes, I ensure proper handover and documentation if clients hire in-house DevOps engineers to take over ongoing operations.",
  },
]

export function MinimalFAQs() {
  // store multiple open indexes instead of just one
  const [openIndexes, setOpenIndexes] = useState<number[]>([])
  const [showAll, setShowAll] = useState(false)

  // toggle an index in openIndexes array
  const toggleFAQ = (index: number) => {
    setOpenIndexes(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index) // remove if already open
        : [...prev, index] // add if not open
    )
  }

  const displayedFAQs = showAll ? faqsData : faqsData.slice(0, 6)

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ... header code remains same ... */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedFAQs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl"
          >
            <button
              className="w-full flex flex-col items-center p-6 text-center"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndexes.includes(index)}
            >
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 text-left flex-1">{faq.question}</h3>
                  <div className="ml-4 flex-shrink-0">
                    {openIndexes.includes(index) ? (
                      <Minus className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
                <AnimatePresence>
                  {openIndexes.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-gray-600 text-sm text-left leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {faqsData.length > 6 && (
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
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
          </motion.button>
        </div>
      )}
    </section>
  )
}