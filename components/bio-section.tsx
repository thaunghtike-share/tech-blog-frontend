import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  User,
  MapPin,
  Calendar,
  Briefcase,
  Download,
  ExternalLink,
} from "lucide-react"

const personalInfo = {
  name: "Thaung Htike Oo",
  title: "Senior DevOps Engineer",
  location: "Yangon, Myanmar",
  bio: "DevOps Engineer with over 5 years of experience designing, automating, and optimizing cloud-native infrastructure in fast-paced, high-availability environments. Skilled in building robust CI/CD pipelines, managing containerized applications with Kubernetes and Docker, and implementing infrastructure as code using Terraform and Ansible. Proficient across major cloud platforms including Azure and AWS, with a strong focus on reliability, scalability, and automation. Currently expanding into the AI/MLOps space — learning to streamline machine learning workflows, manage model lifecycles, and deploy scalable ML solutions using tools like MLflow, Kubeflow, and Azure Machine Learning. Passionate about bridging the gap between software engineering, data science, and infrastructure through automation and modern DevOps practices.",
}

const workExperience = [
  {
    company: "Maharbawga Company Ltd",
    position: "Senior DevOps Engineer",
    duration: "November 2024 - Present",
    location: "Yangon, Myanmar",
    description:
      "Led Azure infrastructure migration to Terraform using dynamic for_each patterns to manage resources like VMs, NSGs, NICs, public IPs, and AKS clusters. Built reusable Terraform modules and implemented CI/CD pipelines with GitHub Actions and ArgoCD. Managed AKS clusters with Azure AD and CNI (overlay) integration. Optimized NAT gateway and network setups while supporting ML workloads alongside developers and data scientists.",
  },
  {
    company: "Dinger Company Ltd",
    position: "Senior DevOps Engineer",
    duration: "June 2022 - August 2024",
    location: "Yangon, Myanmar",
    description:
      "Designed and maintained AKS/EKS infrastructure with GitHub Actions, ArgoCD, and Istio. Released the MTB Pay wallet in 2024 and optimized cloud architecture for cost and performance. Set up automated CI/CD pipelines, service mesh, and system monitoring using Prometheus, Grafana, and Loki.",
  },
  {
    company: "OpsZero",
    position: "DevOps Engineer",
    duration: "December 2021 - June 2023",
    location: "Remote",
    description:
      "Automated AWS infrastructure using Terraform and managed EKS clusters for scaling containerized apps. Built CI/CD pipelines with GitHub Actions and GitLab CI. Wrote Python/Django features, automated tasks using Bash, and secured secrets using Vault and Packer.",
  },
  {
    company: "Frontiir (Myanmar Net)",
    position: "Junior DevOps Engineer",
    duration: "December 2020 - December 2021",
    location: "Yangon, Myanmar",
    description:
      "Developed CI/CD pipelines using GitHub and GitLab. Managed hybrid Kubernetes clusters, integrated ArgoCD for GitOps, and monitored systems with Grafana, Elasticsearch, and Loki. Automated deployment workflows using Ansible and Bash scripts.",
  },
]

export function BioSection() {
  return (
    <section className="mt-24 pt-16 border-t border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Personal Bio Card */}
        <div className="lg:col-span-1">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 sticky top-8">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <User className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-2">{personalInfo.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{personalInfo.title}</p>
                <div className="flex items-center justify-center text-gray-600 mb-6">
                  <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                  {personalInfo.location}
                </div>
              </div>

              <div className="mb-8">
                <p className="text-gray-600 font-light leading-relaxed text-sm">{personalInfo.bio}</p>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </Button>
                <Button variant="outline" className="w-full bg-transparent hover:bg-blue-50">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  LinkedIn Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Work Experience */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-light mb-8 flex items-center text-gray-900">
            <Briefcase className="h-6 w-6 mr-3 text-blue-600" />
            Work Experience
          </h3>
          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <Card key={index} className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-medium text-gray-900 mb-1">{job.position}</h4>
                      <p className="text-blue-600 font-medium mb-2">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {job.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 font-light leading-relaxed">{job.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}