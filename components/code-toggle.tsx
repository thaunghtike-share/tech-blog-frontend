"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Code } from "lucide-react"

interface CodeToggleProps {
  children: React.ReactNode
  title: string
  defaultOpen?: boolean
}

export function CodeToggle({ children, title, defaultOpen = false }: CodeToggleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="w-full">
      <Button
        variant="outline"
        className="w-full justify-start text-left px-4 py-2 mb-2 border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Code className="w-4 h-4 mr-2 text-gray-600" />
        <span className="font-semibold text-gray-800">{title}</span>
        {isOpen ? (
          <ChevronUp className="ml-auto w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="ml-auto w-4 h-4 text-gray-500" />
        )}
      </Button>
      {isOpen && <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">{children}</div>}
    </div>
  )
}
