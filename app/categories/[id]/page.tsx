"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MinimalHeader } from "@/components/minimal-header"
import { MinimalFooter } from "@/components/minimal-footer"

interface Category {
  id: number
  name: string
}

interface PageProps {
  params: {
    id: string
  }
}

const API_BASE_URL = "http://192.168.1.131:8000/api"

export default function CategoryPage({ params }: PageProps) {
  const { id } = params
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategory() {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE_URL}/categories/${id}/`)
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
        const data = await res.json()
        setCategory(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch category")
      } finally {
        setLoading(false)
      }
    }
    fetchCategory()
  }, [id])

  if (loading) return <div className="p-10 text-center">Loading category...</div>
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>
  if (!category) return <div className="p-10 text-center">Category not found</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MinimalHeader />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <Card className="p-8">
          <CardContent>
            <h1 className="text-3xl font-semibold mb-4 text-slate-900">{category.name}</h1>
            <p className="text-gray-700">Explore articles and tutorials related to {category.name.toLowerCase()}.</p>
          </CardContent>
        </Card>
      </main>

      <MinimalFooter />
    </div>
  )
}