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
                      DevOps Engineer with over 5 years of experience designing, automating, and optimizing cloud-native infrastructure in fast-paced, high-availability environments. Skilled in building robust CI/CD pipelines, managing containerized applications with Kubernetes and Docker, and implementing infrastructure as code using Terraform and Ansible. Proficient across major cloud platforms including Azure and AWS, with a strong focus on reliability, scalability, and automation. Currently expanding into the AI/MLOps space — learning to streamline machine learning workflows, manage model lifecycles, and deploy scalable ML solutions using tools like MLflow, Kubeflow, and Azure Machine Learning. Passionate about bridging the gap between software engineering, data science, and infrastructure through automation and modern DevOps practices.
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
                        <p className="text-blue-600 font-medium mb-2">Maharbawga Company Ltd</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-500 mb-1">📅 November 2024 - Present</div>
                        <div className="flex items-center text-sm text-gray-500">📍 Yangon, Myanmar</div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Led Azure infrastructure migration to Terraform using dynamic patterns to manage resources like VMs, NSGs, NICs, public IPs, and AKS clusters. Built reusable Terraform modules and implemented CI/CD pipelines with GitHub Actions and ArgoCD. Managed AKS clusters with Azure AD and CNI (overlay) integration. Optimized NAT gateway and network setups while supporting ML workloads alongside developers and data scientists.
                    </p>
                  </div>

                  <div className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-medium text-gray-900 mb-1">Senior DevOps Engineer</h4>
                        <p className="text-blue-600 font-medium mb-2">Dinger Company Ltd</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-500 mb-1">📅 June 2022 - August 2024</div>
                        <div className="flex items-center text-sm text-gray-500">📍 Yangon, Myanmar</div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Designed and maintained AKS/EKS infrastructure with GitHub Actions, ArgoCD, and Istio. Released the MTB Pay wallet in 2024 and optimized cloud architecture for cost and performance. Set up automated CI/CD pipelines, service mesh, and system monitoring using Prometheus, Grafana, and Loki.
                    </p>
                  </div>

                  <div className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-medium text-gray-900 mb-1">DevOps Engineer</h4>
                        <p className="text-blue-600 font-medium mb-2">OpsZero</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-500 mb-1">📅 December 2021 - June 2023</div>
                        <div className="flex items-center text-sm text-gray-500">📍 Remote</div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Automated AWS infrastructure using Terraform and managed EKS clusters for scaling containerized apps. Built CI/CD pipelines with GitHub Actions and GitLab CI. Wrote Python/Django features, automated tasks using Bash, and secured secrets using Vault and Packer.
                    </p>
                  </div>

                  <div className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-medium text-gray-900 mb-1">Junior DevOps Engineer</h4>
                        <p className="text-blue-600 font-medium mb-2">Frontiir (Myanmar Net)</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-500 mb-1">📅 December 2020 - December 2021</div>
                        <div className="flex items-center text-sm text-gray-500">📍 Yangon, Myanmar</div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Developed CI/CD pipelines using GitHub and GitLab. Managed hybrid Kubernetes clusters, integrated ArgoCD for GitOps, and monitored systems with Grafana, Elasticsearch, and Loki. Automated deployment workflows using Ansible and Bash scripts.
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