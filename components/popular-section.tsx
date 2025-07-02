import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

const popularPosts = [
  {
    id: 1,
    title: "Understanding JavaScript Closures Once and For All",
    category: "JavaScript",
    views: "12.5k",
  },
  {
    id: 2,
    title: "The Complete Guide to CSS Grid Layout",
    category: "CSS",
    views: "9.8k",
  },
  {
    id: 3,
    title: "Building Your First React Application",
    category: "React",
    views: "8.2k",
  },
  {
    id: 4,
    title: "Git Workflow Best Practices for Teams",
    category: "Git",
    views: "7.1k",
  },
  {
    id: 5,
    title: "Introduction to TypeScript for Beginners",
    category: "TypeScript",
    views: "6.9k",
  },
]

export function PopularSection() {
  return (
    <section className="mt-24 pt-16 border-t border-gray-200">
      <div className="flex items-center mb-12">
        <TrendingUp className="h-6 w-6 mr-3 text-blue-600" />
        <h2 className="text-3xl font-light text-gray-900">Most Popular</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularPosts.map((post, index) => (
          <Link key={post.id} href={`/post/${post.id}`} className="group">
            <div className="flex items-start space-x-4 p-6 hover:bg-blue-50 rounded-lg transition-colors">
              <span className="text-2xl font-light text-gray-400 group-hover:text-blue-600 transition-colors">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <Badge variant="outline" className="text-xs mb-3 bg-blue-50 text-blue-700 border-blue-200">
                  {post.category}
                </Badge>
                <h3 className="font-light text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 font-light">{post.views} views</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}