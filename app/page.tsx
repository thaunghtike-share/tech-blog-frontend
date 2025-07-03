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
                    <p className="text-blue-600 font-medium mb-4">Senior DevOps Engineer</p>
                    <div className="flex items-center justify-center text-gray-600 mb-6">
                      <span className="text-blue-500 mr-2">📍</span>
                      Yangon, Myanmar
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-gray-600 font-light leading-relaxed text-sm">
                        DevOps Engineer with 5+ years of experience building and automating cloud-native and on-prem infrastructure. Skilled in CI/CD pipelines, Kubernetes, Docker, Terraform, and Ansible. Experienced with Azure and AWS, focused on reliability and scalability. Currently exploring AI/MLOps to streamline ML workflows and deployment. Passionate about connecting software engineering, data science, and infrastructure through automation.                    </p>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      📥 Download CV
                    </button>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-light mb-8 flex items-center text-gray-900">💼 Work Experience</h3>
                <div className="space-y-6">

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-medium text-gray-900 mb-1">Senior DevOps Engineer</h4>
                        <p className="text-blue-600 font-medium mb-1">Maharbawga Company Ltd</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>📅 Nov 2024 - Present</div>
                        <div>📍 Yangon, Myanmar</div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-light leading-relaxed text-sm">
                      Led Azure infrastructure migration to Terraform with dynamic patterns managing VMs, NSGs, NICs, and AKS. Built reusable modules and CI/CD pipelines with GitHub Actions and ArgoCD. Managed AKS with Azure AD and CNI overlay, optimized NAT gateway, and supported ML workloads.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-medium text-gray-900 mb-1">Senior DevOps Engineer</h4>
                        <p className="text-blue-600 font-medium mb-1">Dinger Company Ltd</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>📅 Jun 2022 - Aug 2024</div>
                        <div>📍 Yangon, Myanmar</div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-light leading-relaxed text-sm">
                      Designed and maintained AKS/EKS infrastructure with GitHub Actions, ArgoCD, and Istio. Released MTB Pay wallet and optimized cloud cost/performance. Setup CI/CD, service mesh, and monitoring with Prometheus, Grafana, and Loki.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-medium text-gray-900 mb-1">DevOps Engineer</h4>
                        <p className="text-blue-600 font-medium mb-1">OpsZero</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>📅 Dec 2021 - Jun 2023</div>
                        <div>📍 Remote</div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-light leading-relaxed text-sm">
                      Automated AWS infrastructure with Terraform and managed EKS clusters. Built CI/CD with GitHub and GitLab. Developed Python/Django features and secured secrets using Vault and Packer.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-medium text-gray-900 mb-1">Junior DevOps Engineer</h4>
                        <p className="text-blue-600 font-medium mb-1">Frontiir (Myanmar Net)</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>📅 Dec 2020 - Dec 2021</div>
                        <div>📍 Yangon, Myanmar</div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-light leading-relaxed text-sm">
                      Developed CI/CD pipelines using GitHub/GitLab. Managed hybrid Kubernetes clusters, integrated ArgoCD, and monitored with Grafana and Elasticsearch. Automated deployments with Ansible and Bash.
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