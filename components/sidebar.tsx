import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, TrendingUp, BookOpen, Code, Palette, Brain } from "lucide-react"
import Link from "next/link"

const categories = [
  { name: "React", count: 24, icon: Code, color: "bg-blue-100 text-blue-700" },
  { name: "CSS", count: 18, icon: Palette, color: "bg-purple-100 text-purple-700" },
  { name: "Node.js", count: 15, icon: Code, color: "bg-green-100 text-green-700" },
  { name: "Learning", count: 12, icon: Brain, color: "bg-orange-100 text-orange-700" },
  { name: "TypeScript", count: 10, icon: Code, color: "bg-indigo-100 text-indigo-700" },
  { name: "Design", count: 8, icon: Palette, color: "bg-pink-100 text-pink-700" },
]

const recentPosts = [
  {
    title: "Advanced React Patterns You Should Know",
    date: "Dec 14, 2024",
    category: "React",
  },
  {
    title: "Modern CSS Techniques for 2024",
    date: "Dec 11, 2024",
    category: "CSS",
  },
  {
    title: "Microservices Architecture Explained",
    date: "Dec 9, 2024",
    category: "Architecture",
  },
  {
    title: "The Future of Web Development",
    date: "Dec 6, 2024",
    category: "Web Dev",
  },
]

const popularTags = [
  "JavaScript",
  "React",
  "CSS",
  "Node.js",
  "TypeScript",
  "Python",
  "Design",
  "UI/UX",
  "API",
  "Database",
  "Testing",
  "Performance",
]

export function Sidebar() {
  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input type="search" placeholder="Search..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
            Stay Updated
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">Get the latest articles and tutorials delivered to your inbox.</p>
          <div className="space-y-2">
            <Input type="email" placeholder="Enter your email" />
            <Button className="w-full">Subscribe</Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.name}
                  href={`/category/${category.name.toLowerCase()}`}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`p-1.5 rounded-md mr-3 ${category.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                <Link href={`/post/${index + 1}`} className="block">
                  <h4 className="font-medium text-sm hover:text-blue-600 transition-colors mb-1">{post.title}</h4>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
                <Badge variant="outline" className="hover:bg-blue-50 hover:border-blue-300 cursor-pointer">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
