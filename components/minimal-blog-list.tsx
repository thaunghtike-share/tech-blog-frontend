import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"

const posts = [
  {
    id: 1,
    title: "The Art of Clean Code: Writing Maintainable Software",
    excerpt:
      "Explore the principles and practices that make code not just functional, but beautiful and maintainable for years to come.",
    author: "Sarah Chen",
    date: "December 15, 2024",
    readTime: "12 min",
    category: "Programming",
  },
  {
    id: 2,
    title: "Designing for Accessibility: A Complete Guide",
    excerpt:
      "Learn how to create inclusive digital experiences that work for everyone, regardless of their abilities or circumstances.",
    author: "Marcus Johnson",
    date: "December 12, 2024",
    readTime: "8 min",
    category: "Design",
  },
  {
    id: 3,
    title: "The Psychology of Learning: How Memory Works",
    excerpt:
      "Understanding how our brains process and retain information can dramatically improve how we learn new skills.",
    author: "Dr. Emily Watson",
    date: "December 10, 2024",
    readTime: "15 min",
    category: "Learning",
  },
  {
    id: 4,
    title: "Modern CSS: Grid, Flexbox, and Beyond",
    excerpt:
      "Master the latest CSS layout techniques and create responsive designs that work beautifully across all devices.",
    author: "Alex Rodriguez",
    date: "December 8, 2024",
    readTime: "10 min",
    category: "CSS",
  },
]

export function MinimalBlogList() {
  return (
    <div className="space-y-16">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-light text-slate-900">Latest Articles</h2>
        <Link href="/all" className="text-sm text-gray-500 hover:text-black transition-colors">
          View All →
        </Link>
      </div>

      <div className="space-y-12">
        {posts.map((post, index) => (
          <article key={post.id} className="group">
            <div className="flex items-start space-x-4 mb-4">
              <span className="text-sm text-stone-400 font-mono mt-1">{String(index + 1).padStart(2, "0")}</span>
              <Badge variant="outline" className="text-xs">
                {post.category}
              </Badge>
            </div>

            <Link href={`/post/${post.id}`} className="block">
              <h3 className="text-2xl font-light text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">{post.excerpt}</p>
            </Link>

            <div className="flex items-center text-sm text-stone-400 space-x-6">
              <span className="font-light">{post.author}</span>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </div>
            </div>

            <div className="mt-8 h-px bg-slate-200"></div>
          </article>
        ))}
      </div>
    </div>
  )
}
