import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const articles = [
  {
    id: 1,
    title: "MASTERING REACT HOOKS",
    subtitle: "Advanced patterns for modern development",
    category: "TECH",
    author: "Mike Chen",
    date: "Dec 12",
    readTime: "8 min",
    image: "/placeholder.svg?height=300&width=400",
    trending: true,
  },
  {
    id: 2,
    title: "DESIGN SYSTEMS REVOLUTION",
    subtitle: "Building scalable UI components",
    category: "DESIGN",
    author: "Lisa Park",
    date: "Dec 10",
    readTime: "12 min",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "CAREER GROWTH STRATEGIES",
    subtitle: "From junior to senior developer",
    category: "CAREER",
    author: "Alex Rodriguez",
    date: "Dec 8",
    readTime: "10 min",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "AI IN WEB DEVELOPMENT",
    subtitle: "Tools that are changing the game",
    category: "TECH",
    author: "Emma Wilson",
    date: "Dec 6",
    readTime: "15 min",
    image: "/placeholder.svg?height=300&width=400",
    trending: true,
  },
]

const quickReads = [
  "5 CSS Tricks Every Developer Should Know",
  "The Psychology of Color in UI Design",
  "Building Your First API with Node.js",
  "Time Management for Developers",
  "Understanding TypeScript Generics",
]

export function MagazineGrid() {
  return (
    <div className="space-y-16">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-4xl font-black mb-4">LATEST STORIES</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Articles */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <Badge className="bg-black text-white font-bold">{article.category}</Badge>
                    {article.trending && (
                      <Badge className="bg-red-500 text-white">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        TRENDING
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <Link href={`/article/${article.id}`}>
                    <h3 className="text-xl font-black mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 font-medium">{article.subtitle}</p>
                  </Link>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="font-bold">{article.author}</span>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {article.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Reads */}
          <Card className="border-2 border-yellow-400">
            <CardContent className="p-6">
              <h3 className="text-2xl font-black mb-6 flex items-center">
                <span className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></span>
                QUICK READS
              </h3>
              <div className="space-y-4">
                {quickReads.map((title, index) => (
                  <Link
                    key={index}
                    href={`/quick-read/${index + 1}`}
                    className="block p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-start">
                      <span className="text-2xl font-black text-gray-300 mr-3 group-hover:text-yellow-400 transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-bold text-sm leading-tight group-hover:text-blue-600 transition-colors">
                        {title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter */}
          <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-black mb-4">STAY INFORMED</h3>
              <p className="mb-6 text-purple-100">Get the latest tech insights delivered weekly</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg text-black font-medium"
                />
                <button className="w-full bg-yellow-400 text-black p-3 rounded-lg font-black hover:bg-yellow-300 transition-colors">
                  SUBSCRIBE NOW
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
