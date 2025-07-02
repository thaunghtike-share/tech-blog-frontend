import { MinimalHeader } from "@/components/minimal-header"
import { MinimalHero } from "@/components/minimal-hero"
import { MinimalBlogList } from "@/components/minimal-blog-list"
import { MinimalSidebar } from "@/components/minimal-sidebar"
import { MinimalFooter } from "@/components/minimal-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <MinimalHeader />
      <MinimalHero />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-100">
            <MinimalBlogList />
          </div>
          <div className="lg:col-span-1">
            <MinimalSidebar />
          </div>
        </div>
        <div className="bg-gradient-to-r from-white/80 to-blue-50/80 rounded-2xl p-8 mt-16 backdrop-blur-sm border border-blue-100">
          <section className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Personal Bio Card */}
              <div className="lg:col-span-1">
                <div className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 sticky top-8 rounded-2xl p-8 shadow-sm">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <div className="h-16 w-16 text-white text-4xl">👨‍💻</div>
                    </div>
                    <h3 className="text-2xl font-light text-gray-900 mb-2">Thaung Htike Oo</h3>
                    <p className="text-blue-600 font-medium mb-4">DevOps Engineer & Cloud Architect</p>
                    <div className="flex items-center justify-center text-gray-600 mb-6">
                      <span className="text-blue-500 mr-2">📍</span>
                      Myanmar
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-gray-600 font-light leading-relaxed text-sm">
                      Passionate DevOps Engineer with 5+ years of experience in cloud infrastructure, automation, and
                      CI/CD pipelines. I love sharing knowledge about modern DevOps practices, containerization, and
                      cloud technologies.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      📥 Download CV
                    </button>
                    <button className="w-full border border-blue-200 bg-transparent hover:bg-blue-50 text-blue-600 py-3 px-4 rounded-lg font-medium transition-colors">
                      🔗 LinkedIn Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-light mb-8 flex items-center text-gray-900">💼 Work Experience</h3>
                <div className="space-y-8">
                  <div className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-medium text-gray-900 mb-1">Senior DevOps Engineer</h4>
                        <p className="text-blue-600 font-medium mb-2">Tech Solutions Co.</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-500 mb-1">📅 2022 - Present</div>
                        <div className="flex items-center text-sm text-gray-500">📍 Remote</div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Leading cloud infrastructure projects and implementing CI/CD pipelines for enterprise
                      applications. Specialized in AWS, Kubernetes, and automation tools.
                    </p>
                  </div>

                  <div className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-medium text-gray-900 mb-1">DevOps Engineer</h4>
                        <p className="text-blue-600 font-medium mb-2">Digital Innovation Ltd.</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-500 mb-1">📅 2020 - 2022</div>
                        <div className="flex items-center text-sm text-gray-500">📍 Yangon, Myanmar</div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Designed scalable cloud infrastructure and automated deployment processes for microservices
                      architecture. Focused on monitoring, logging, and containerization.
                    </p>
                  </div>

                  <div className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-medium text-gray-900 mb-1">Junior DevOps Engineer</h4>
                        <p className="text-blue-600 font-medium mb-2">StartupTech</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-500 mb-1">📅 2019 - 2020</div>
                        <div className="flex items-center text-sm text-gray-500">📍 Yangon, Myanmar</div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Maintained Linux servers and assisted in cloud migration projects. Gained hands-on experience with
                      AWS services and infrastructure automation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <MinimalFooter />
    </div>
  )
}