import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React Hooks: A Complete Guide",
    excerpt:
      "Learn how to use React Hooks to manage state and side effects in your functional components. This comprehensive guide covers useState, useEffect, and custom hooks.",
    category: "React",
    author: "Sarah Johnson",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 2,
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt:
      "Understanding the differences between CSS Grid and Flexbox will help you choose the right layout method for your projects.",
    category: "CSS",
    author: "Mike Chen",
    date: "Dec 12, 2024",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Building RESTful APIs with Node.js and Express",
    excerpt:
      "Step-by-step tutorial on creating robust REST APIs using Node.js, Express, and MongoDB with proper error handling and authentication.",
    category: "Node.js",
    author: "Alex Rodriguez",
    date: "Dec 10, 2024",
    readTime: "12 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "The Psychology of Learning: How to Study More Effectively",
    excerpt:
      "Discover evidence-based techniques to improve your learning efficiency and retention using cognitive science principles.",
    category: "Learning",
    author: "Dr. Emily Watson",
    date: "Dec 8, 2024",
    readTime: "10 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "TypeScript Best Practices for Large Applications",
    excerpt:
      "Learn advanced TypeScript patterns and practices that will help you build maintainable and scalable applications.",
    category: "TypeScript",
    author: "David Kim",
    date: "Dec 5, 2024",
    readTime: "15 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Design Systems: Creating Consistent User Experiences",
    excerpt:
      "How to build and maintain design systems that ensure consistency across your products and improve team collaboration.",
    category: "Design",
    author: "Lisa Park",
    date: "Dec 3, 2024",
    readTime: "9 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export function BlogGrid() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
        <Link href="/all-posts" className="text-blue-600 hover:text-blue-700 font-medium">
          View All →
        </Link>
      </div>

      {featuredPost && (
        <Card className="overflow-hidden border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="md:flex">
            <div className="md:w-1/2">
              <Image
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title}
                width={400}
                height={250}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Featured
                </Badge>
                <Badge variant="outline">{featuredPost.category}</Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                <Link href={`/post/${featuredPost.id}`}>{featuredPost.title}</Link>
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{featuredPost.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {featuredPost.readTime}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regularPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 left-3" variant="secondary">
                {post.category}
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                <Link href={`/post/${post.id}`}>{post.title}</Link>
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
