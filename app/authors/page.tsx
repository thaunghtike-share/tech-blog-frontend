"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MinimalHeader } from "@/components/minimal-header"
import { MinimalFooter } from "@/components/minimal-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin } from "lucide-react"

interface Author {
  id: number
  name: string
  bio: string
  avatar: string
  featured: boolean
  job_title: string
  company: string
  linkedin?: string
}

const API_BASE_URL = "http://192.168.100.7:8000/api"

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAuthors() {
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE_URL}/authors`)
        if (!res.ok) throw new Error("Failed to fetch authors")
        const data = await res.json()
        if (Array.isArray(data)) {
          setAuthors(data)
        } else if (Array.isArray(data.results)) {
          setAuthors(data.results)
        } else {
          setAuthors([])
          throw new Error("Unexpected data format from API")
        }
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchAuthors()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50">
      {/* Messenger Support Floating Button */}
      <a
        href="https://m.me/learndevopsnowbytho"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with me on Messenger"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-2 cursor-pointer transition-transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 240 240"
          fill="none"
          className="w-10 h-10 rounded-full"
        >
          <defs>
            <linearGradient id="messengerGradient" x1="0" y1="0" x2="240" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E1306C" />
              <stop offset="1" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <circle cx="120" cy="120" r="120" fill="url(#messengerGradient)" />
          <path
            fill="#fff"
            d="M158.8 80.2l-37.8 44.3-19.2-22.6-41 44.4 56.2-58.7 21 23.7 41-44.3z"
          />
        </svg>
        <span className="font-medium text-gray-900 select-none text-small whitespace-nowrap">
          Chat?
        </span>
      </a>
      <MinimalHeader />

      <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 py-14 border-b border-white/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-light text-slate-900 mb-4 leading-relaxed">
            <span className="font-tight text-black-700">Our </span>
            <span className="font-medium text-blue-600">Authors</span>
          </h1>
          <p className="text-base text-slate-600 font-light max-w-lg mx-auto leading-relaxed">
            Discover in-depth articles and expertise from passionate authors who are pioneering advancements in DevOps, cloud computing, AI, and cutting-edge infrastructure technologies
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <p className="text-center text-gray-600">Loading authors...</p>
        ) : error ? (
          <div className="text-center text-red-600">
            <p>Error: {error}</p>
            <button
              onClick={() => {
                setError(null)
                setLoading(true)
                setAuthors([])
                fetch(`${API_BASE_URL}/authors`)
                  .then((res) => res.json())
                  .then((data) => {
                    if (Array.isArray(data)) setAuthors(data)
                    else if (Array.isArray(data.results)) setAuthors(data.results)
                  })
                  .catch((e) => setError(e.message))
                  .finally(() => setLoading(false))
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : authors.length === 0 ? (
          <p className="text-center text-gray-600">No authors found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <Card
                key={author.id}
                className="border-0 bg-white shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm"
                  />
                  <Link
                    href={`/authors/${author.id}`}
                    className="text-xl font-semibold text-blue-600 hover:underline"
                  >
                    {author.name}
                  </Link>
                  <p className="text-sm text-gray-600 font-medium">
                    {author.job_title} at {author.company}
                  </p>
                  {author.bio && (
                    <p className="text-center text-gray-500 text-sm">
                      {author.bio}
                    </p>
                  )}
                  {author.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center space-x-1 text-blue-600 hover:underline text-sm font-medium"
                      aria-label={`Connect with ${author.name} on LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>Connect Me</span>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <MinimalFooter />
    </div>
  )
}