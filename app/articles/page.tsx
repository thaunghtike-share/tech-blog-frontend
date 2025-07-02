import { MinimalHeader } from "@/components/minimal-header"
import { MinimalBlogList } from "@/components/minimal-blog-list"
import { MinimalSidebar } from "@/components/minimal-sidebar"
import { MinimalFooter } from "@/components/minimal-footer"

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MinimalHeader />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-violet-100/80 via-sky-100/80 to-emerald-100/80 py-16 border-b border-white/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-light text-slate-900 mb-4 leading-relaxed">
            All <span className="font-semibold text-emerald-600">Articles</span>
          </h1>
          <p className="text-base text-slate-600 font-light max-w-lg mx-auto leading-relaxed">
            Explore our complete collection of programming, design, and career growth articles. Find exactly what you're
            looking for.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Articles List */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/50">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-light text-slate-900">Latest Articles</h2>
              <div className="flex items-center space-x-4">
                <select className="bg-white/50 border border-white/50 rounded-lg px-3 py-2 text-sm">
                  <option>All Categories</option>
                  <option>Programming</option>
                  <option>Design</option>
                  <option>Learning</option>
                  <option>Career</option>
                </select>
                <select className="bg-white/50 border border-white/50 rounded-lg px-3 py-2 text-sm">
                  <option>Latest</option>
                  <option>Most Popular</option>
                  <option>Most Viewed</option>
                </select>
              </div>
            </div>
            <MinimalBlogList />

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-2 text-sm bg-emerald-500 text-white rounded-lg">1</button>
                <button className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">2</button>
                <button className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">3</button>
                <button className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <MinimalSidebar />
          </div>
        </div>
      </main>

      <MinimalFooter />
    </div>
  )
}