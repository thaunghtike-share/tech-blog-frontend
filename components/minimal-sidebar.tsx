import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Clock } from "lucide-react"

const topics = ["Programming", "Design", "Learning", "Productivity", "Career", "Technology"]

const featuredAuthors = [
  { name: "Sarah Chen", posts: 24, specialty: "React & Frontend" },
  { name: "Marcus Johnson", posts: 18, specialty: "UI/UX Design" },
  { name: "Dr. Emily Watson", posts: 12, specialty: "Learning Science" },
  { name: "Alex Rodriguez", posts: 15, specialty: "Backend & APIs" },
]

const readingStats = {
  totalArticles: 247,
  totalReaders: "12.5k",
  avgReadTime: "8 min",
}

export function MinimalSidebar() {
  return (
    <div className="space-y-12">
      {/* Reading Stats */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl border border-orange-100/50 backdrop-blur-sm">
        <h3 className="text-xl font-light mb-6 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-orange-400" />
          Reading Stats
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-light text-slate-900">{readingStats.totalArticles}</div>
            <div className="text-xs text-orange-600 font-light">Articles</div>
          </div>
          <div>
            <div className="text-2xl font-light text-slate-900">{readingStats.totalReaders}</div>
            <div className="text-xs text-orange-600 font-light">Readers</div>
          </div>
          <div>
            <div className="text-2xl font-light text-slate-900 flex items-center justify-center">
              <Clock className="h-4 w-4 mr-1" />
              {readingStats.avgReadTime}
            </div>
            <div className="text-xs text-orange-600 font-light">Avg Read</div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <Card className="border-0 bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-xl">
        <CardContent className="p-8">
          <h3 className="text-xl font-light mb-4">Weekly Insights</h3>
          <p className="text-purple-100 mb-6 font-light leading-relaxed">
            Join 2,500+ developers getting curated articles on programming, design, and career growth.
          </p>
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="your@email.com"
              className="border-0 bg-white/20 text-white placeholder-purple-200 focus:bg-white/30 backdrop-blur-sm"
            />
            <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-light">Subscribe</Button>
          </div>
          <p className="text-xs text-purple-200 mt-4 font-light">No spam. Unsubscribe anytime.</p>
        </CardContent>
      </Card>

      {/* Topics */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
        <h3 className="text-xl font-light mb-6">Topics</h3>
        <div className="space-y-3">
          {topics.map((topic) => (
            <div
              key={topic}
              className="flex items-center justify-between py-2 border-b border-slate-200/50 last:border-b-0"
            >
              <span className="text-slate-600 font-light hover:text-emerald-600 cursor-pointer transition-colors">
                {topic}
              </span>
              <span className="text-xs text-stone-400">→</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Authors */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100/50">
        <h3 className="text-xl font-light mb-6">Featured Authors</h3>
        <div className="space-y-6">
          {featuredAuthors.map((author) => (
            <div key={author.name} className="group cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-600 font-light group-hover:text-rose-600 transition-colors">
                  {author.name}
                </span>
                <span className="text-xs text-rose-400">{author.posts}</span>
              </div>
              <p className="text-xs text-rose-500 font-light">{author.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
