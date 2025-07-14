"use client"
import { useEffect, useState } from "react"
import type React from "react"

import MDEditor from "@uiw/react-md-editor"
import { MinimalHeader } from "@/components/minimal-header"
import { MinimalSidebar } from "@/components/minimal-sidebar"
import { MinimalFooter } from "@/components/minimal-footer"

interface Category {
  id: number
  name: string
}

interface Tag {
  id: number
  name: string
}

const API_BASE_URL = "http://192.168.1.131:8000/api"

export default function NewArticlePage() {
  // --- Auth state ---
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState<string | null>(null)

  // --- Article form state ---
  const [form, setForm] = useState({
    title: "",
    category: "",
    tags: [] as number[],
    featured: false,
    published_at: new Date().toISOString().slice(0, 10),
    content: "",
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // Load token from localStorage on client only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token")
      setToken(savedToken)
    }
  }, [])

  // Fetch categories & tags once
  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, tagRes] = await Promise.all([
          fetch(`${API_BASE_URL}/categories/`),
          fetch(`${API_BASE_URL}/tags/`),
        ])

        if (!catRes.ok) throw new Error("Failed to fetch categories")
        if (!tagRes.ok) throw new Error("Failed to fetch tags")

        const catData = await catRes.json()
        const tagData = await tagRes.json()

        setCategories(Array.isArray(catData) ? catData : catData.results || [])
        setTags(Array.isArray(tagData) ? tagData : tagData.results || [])
      } catch (error) {
        console.error("Error loading dropdown data:", error)
        setCategories([])
        setTags([])
      }
    }
    fetchData()
  }, [])

  // Login handler
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        setLoginError("Invalid username or password")
        return
      }

      const data = await res.json()
      setToken(data.token)
      localStorage.setItem("token", data.token)
      setUsername("")
      setPassword("")
    } catch (error) {
      setLoginError("Login failed")
    }
  }

  // Logout handler
  function handleLogout() {
    setToken(null)
    localStorage.removeItem("token")
    setMessage(null)
  }

  // Article form change handler
  function handleChange(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // Toggle tags
  function toggleTag(id: number) {
    setForm((prev) => {
      const isSelected = prev.tags.includes(id)
      if (isSelected) {
        return { ...prev, tags: prev.tags.filter((tagId) => tagId !== id) }
      } else {
        return { ...prev, tags: [...prev.tags, id] }
      }
    })
  }

  // Submit article
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) {
      setMessage("You must be logged in to submit an article.")
      return
    }

    setLoading(true)
    setMessage(null)

    const payload = {
      title: form.title,
      category: Number(form.category),
      tags: form.tags,
      featured: form.featured,
      published_at: form.published_at,
      content: form.content,
    }

    try {
      const res = await fetch(`${API_BASE_URL}/articles/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setMessage("Article submitted successfully!")
        setForm({
          title: "",
          category: "",
          tags: [],
          featured: false,
          published_at: new Date().toISOString().slice(0, 10),
          content: "",
        })
      } else {
        const errorData = await res.json()
        setMessage("Failed to submit article: " + JSON.stringify(errorData))
      }
    } catch (error) {
      setMessage("Error submitting article: " + String(error))
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative overflow-x-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      {/* Messenger Support Floating Button */}
      <a
        href="https://m.me/learndevopsnowbytho"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with me on Messenger"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white rounded-full shadow-lg px-3 py-2 cursor-pointer transition-transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="none" className="w-8 h-8 rounded-full">
          <defs>
            <linearGradient id="messengerGradient" x1="0" y1="0" x2="240" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E1306C" />
              <stop offset="1" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <circle cx="120" cy="120" r="120" fill="url(#messengerGradient)" />
          <path fill="#fff" d="M158.8 80.2l-37.8 44.3-19.2-22.6-41 44.4 56.2-58.7 21 23.7 41-44.3z" />
        </svg>
        <span className="font-medium text-gray-900 select-none text-sm whitespace-nowrap">Chat?</span>
      </a>
      <MinimalHeader />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-6 gap-10 relative z-10">
        {/* Main content */}
        <section className="lg:col-span-4">
          {!token ? (
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
              <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
              <label className="block mb-1 font-semibold text-sm">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-sm"
              />
              <label className="block mb-1 font-semibold text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-sm"
              />
              {loginError && <p className="text-red-600 mb-3 text-sm">{loginError}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm"
              >
                Login
              </button>
            </form>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold">New Article Editor</h1>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
                >
                  Logout
                </button>
              </div>
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto space-y-4">
                {/* Title */}
                <div>
                  <label className="block font-semibold mb-1 text-sm">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                {/* Category Dropdown */}
                <div>
                  <label className="block font-semibold mb-1 text-sm">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Tags as buttons */}
                <div>
                  <label className="block font-semibold mb-2 text-sm">Tags (select one or more)</label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => {
                      const selected = form.tags.includes(tag.id)
                      return (
                        <button
                          type="button"
                          key={tag.id}
                          onClick={() => toggleTag(tag.id)}
                          className={`px-3 py-1 rounded-full border text-sm ${
                            selected
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                          } focus:outline-none`}
                        >
                          {tag.name}
                        </button>
                      )
                    })}
                  </div>
                </div>
                {/* Featured */}
                <div className="flex items-center space-x-2">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => handleChange("featured", e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="featured" className="font-semibold text-sm">
                    Featured Article
                  </label>
                </div>
                {/* Published At */}
                <div>
                  <label className="block font-semibold mb-1 text-sm">Published Date</label>
                  <input
                    type="date"
                    value={form.published_at}
                    onChange={(e) => handleChange("published_at", e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                {/* Content - Markdown Editor */}
                <div>
                  <label className="block font-semibold mb-1 text-sm">Content (Markdown)</label>
                  <MDEditor
                    value={form.content}
                    onChange={(val) => handleChange("content", val || "")}
                    height={300}
                    preview="edit"
                    textareaProps={{
                      placeholder: "Write your article content here...",
                      className:
                        "border border-gray-300 rounded-lg p-4 text-sm leading-relaxed focus:outline-none focus:ring-4 focus:ring-blue-400 bg-white text-gray-900 shadow-sm transition-shadow",
                    }}
                    previewOptions={{
                      className: "bg-white text-gray-900 rounded-lg p-4 shadow-sm border border-gray-200",
                    }}
                  />
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition text-sm"
                >
                  {loading ? "Submitting..." : "Submit Article"}
                </button>
                {/* Message */}
                {message && <p className="mt-4 text-center text-sm">{message}</p>}
              </form>
            </>
          )}
        </section>
        {/* Sidebar always rendered on right side on large screens */}
        <aside className="lg:col-span-2">
          <MinimalSidebar />
        </aside>
      </main>
      <MinimalFooter />
    </div>
  )
}
