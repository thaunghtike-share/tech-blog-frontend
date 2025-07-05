"use client"

import { useState } from "react"

type FAQ = {
  question: string
  answer: string
}

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
]

export function MinimalFAQs() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null)
  const [showAllFaqs, setShowAllFaqs] = useState(false)

  function toggleFaq(idx: number) {
    setOpenFAQIndex(openFAQIndex === idx ? null : idx)
  }

  return (
    <div className="lg:col-span-3 bg-white/90 backdrop-blur-md border border-blue-100 rounded-2xl shadow-md p-6">
      <section aria-label="FAQs" className="text-left">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">❓ Frequently Asked Questions</h2>
        <div className="space-y-3">
          {(showAllFaqs ? faqsData : faqsData.slice(0, 5)).map((faq, idx) => {
            const isOpen = openFAQIndex === idx
            return (
              <div key={idx} className="border border-blue-100 rounded-md overflow-hidden transition-all duration-300 bg-white">
                <button
                  className="w-full flex justify-between items-center px-4 py-3 text-left text-sm text-blue-800 hover:bg-blue-50"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  {faq.question}
                  <svg
                    className={`w-4 h-4 text-blue-600 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`px-4 text-gray-700 text-xs transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 py-2" : "max-h-0 py-0"
                  } overflow-hidden`}
                >
                  {faq.answer}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAllFaqs(!showAllFaqs)}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            {showAllFaqs ? "Show less ▲" : "Show more ▼"}
          </button>
        </div>
      </section>
    </div>
  )
}