import { MinimalHeader } from "@/components/minimal-header"
import { MinimalFooter } from "@/components/minimal-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  User,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Download,
  ExternalLink,
  Server,
} from "lucide-react"

const personalInfo = {
  name: "Thaung Htike Oo",
  title: "Senior DevOps Engineer",
  location: "Yangon | Myanmar",
  email: "thaunghtike.tho1234@gmail.com", // Update with your actual email
  phone: "+959952492359", // Update with your actual phone
  summary:
    "DevOps Engineer with over 5 years of experience designing, automating, and optimizing cloud-native infrastructure in fast-paced, high-availability environments. Skilled in building robust CI/CD pipelines, managing containerized applications with Kubernetes and Docker, and implementing infrastructure as code using Terraform and Ansible. Proficient across major cloud platforms including Azure and AWS, with a strong focus on reliability, scalability, and automation. Currently expanding into the AI/MLOps space — learning to streamline machine learning workflows, manage model lifecycles, and deploy scalable ML solutions using tools like MLflow, Kubeflow, and Azure Machine Learning. Passionate about bridging the gap between software engineering, data science, and infrastructure through automation and modern DevOps practices."
}

const workExperience = [
{
  company: "Maharbawga Company Ltd",
  position: "Senior DevOps Engineer",
  duration: "November 2024 - Present",
  location: "Yangon, Myanmar",
  responsibilities: [
    "Migrated monolithic applications to microservices architecture",
    "Led the migration of complex Azure infrastructure into Terraform, using dynamic for_each patterns to manage VMs, NSGs, NICs, public IPs, and AKS clusters.",
    "Managed and maintained AKS clusters with multiple node pools, integrated with Azure AD authentication and Azure CNI (overlay) networking.",
    "Built reusable Terraform modules to streamline provisioning of scalable Kubernetes infrastructure and associated cloud components.",
    "Implemented CI/CD pipelines for AKS and VM-based applications using GitHub Actions and ArgoCD, ensuring reliable and automated deployments.",
    "Optimized network configurations and NAT gateway associations to ensure secure and cost-effective cloud infrastructure.",
    "Refactored legacy resources into modular, declarative infrastructure-as-code to enable consistency and version control.",
    "Worked closely with developers and data scientists to align infrastructure with application and machine learning needs."
  ],
  technologies: [
    "Azure", "AKS", "Terraform", "Kubernetes", "ArgoCD", "GitHub Actions",
    "Azure CNI", "Linux", "Prometheus", "Grafana"
  ],
  },
  {
    company: "Dinger Company Ltd",
    position: "Senior DevOps Engineer",
    duration: "June 2022 - August 2024",
    location: "Yangon, Myanmar",
    responsibilities: [
      "Managed cloud infrastructure using tools such as EKS, AKS, GitHub Actions, ArgoCD,Grafana, Istio, and Loki",
      "Successfully released the MTB Pay wallet in August 2024.",
      "Designed and implemented cloud infrastructure from ground up, including CI/CD pipelines for deployment on AKS",
      "Managed cloud cost optimization and infrastructure performance tuning for efficiency.",
      "Deployed and maintained Kubernetes clusters using AKS and EKS to manage containerizedapplications.",
      "Created and managed GitHub Actions and ArgoCD for automated deployments.",
      "Monitored and analyzed system performance using Grafana and Prometheus.",
      "Implemented service mesh (Istio) for better traffic control and security management."
    ],
    technologies: ["AWS", "AKS", "Kubernetes", "Terraform", "Github Actions", "Python"],
  },
  {
    company: "OpsZero",
    position: "DevOps Engineer",
    duration: "December 2021 - June 2023",
    location: "Remote",
    responsibilities: [
      "Developed Python Django models for improving application performance and functionality.",
      "Handled container management using Amazon EKS for scaling and deployment.",
      "Wrote Terraform scripts as code for automating cloud resource provisioning and management.",
      "Developed CI/CD workflows using GitHub Actions and GitLab CI for deployment processes.",
      "Developed Bash scripts to automate system tasks and simplify manual processes.",
      "Used HashiCorp Vault for secure management of sensitive data and Packer for creating machine images.",
      "Managed infrastructure on AWS with cost-effective scaling and performance improvements.",
    ],
    technologies: ["Azure", "AWS", "Terraform", "CICD", "Grafana", "Django"],
  },
  {
    company: "Frontiir (Myanmar Net)",
    position: "Junior DevOps Engineer",
    duration: "December 2020 - December 2021",
    location: "Yangon, Myanmar",
    responsibilities: [
      "Developed and managed CI/CD pipelines using GitHub and GitLab to automate application deployments",
      "Managed on-premise and cloud-based Kubernetes clusters to support containerized applications",
      "Used Bash scripting to automate tasks and for system management.",
      "Automated infrastructure tasks with Ansible for consistent and fast deployments.",
      "Integrated ArgoCD for GitOps-based continuous delivery, improving deployment speed and reliability.",
      "Monitored application health and performance using Grafana and Elasticsearch, and identified and resolved any issues.",
      "Centralized logging solutions with Loki for log aggregation and analysis across services."
    ],
    technologies: ["Linux", "ArgoCD", "Git", "AWS", "Bash", "Monitoring", "Kubernetes", "Grafana", "Loki"],
  },
]

const education = [
  {
    degree: "B.C.Tech",
    institution: "University of Information Technology, Yangon",
    duration: "2015 - 2020",
    details: "Specialized in Communication and Networking. Graduated with honors.",
    gpa: "3.8/4.0",
  },
]

const certifications = [
  {
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    year: "2022",
    credentialId: "AWS-SAA",
    validUntil: "expired",
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    year: "2022",
    credentialId: "CKA",
    validUntil: "expired",
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    year: "2023",
    credentialId: "HCP-TF",
    validUntil: "expired",
  },
    {
    name: "Azure Fundamentals Az-900",
    issuer: "Microsoft",
    year: "2023",
    credentialId: "Az-900",
    validUntil: "expired",
  },
]

const skills = {
  "Cloud Platforms": ["AWS", "Azure", "Google Cloud Platform"],
  Containerization: ["Docker", "Kubernetes", "OpenShift"],
  "CI/CD Tools": ["GitLab CI", "GitHub Actions", "Azure DevOps", "CircleCI", "ArgoCD", "Jenkins"],
  "Infrastructure as Code": ["Terraform", "CloudFormation", "Ansible", "Pulumi"],
  Monitoring: ["Prometheus", "Grafana", "ELK Stack", "CloudWatch", "Datadog"],
  Programming: ["Python", "Node", "Nest JS"],
  Databases: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "DynamoDB"],
  "Operating Systems": ["Linux", "Mac", "Windows Server"],
  "Version Control": ["Git", "GitHub", "GitLab"],
  Security: ["AWS IAM", "Vault", "SSL/TLS", "Security Scanning"],
}

const projects = [
  {
    name: "Monolithic to Cloud-Native Architecture Migration",
    description: "Led the end-to-end migration of legacy monolithic applications to modern microservices architecture at both Dinger and Maharbawga Co., Ltd. This included containerization, infrastructure redesign, and implementing CI/CD pipelines.",
    technologies: ["AWS", "Azure", "Kubernetes", "Terraform", "GitHub Actions", "ArgoCD"],
    impact: "Improved deployment speed by 60%, enhanced system scalability and fault tolerance, and reduced infrastructure and maintenance costs by over 45%."
  },
  {
    name: "MTB Pay Wallet Release",
    description: "Played a key role in the successful release of the MTB Pay wallet, contributing to infrastructure design, automation, and deployment processes.",
    technologies: ["AWS", "Azure", "Kubernetes", "Terraform", "GitHub Actions", "ArgoCD"],
    impact: "Enabled smooth and reliable product launch with improved deployment efficiency and system stability."
  },
{
    name: "Freelance DevOps Engineer",
    description: "Worked as a freelance DevOps engineer on Upwork, delivering infrastructure automation with Terraform, Kubernetes setup, and backend improvements in Python/Django.",
    technologies: ["Terraform", "Kubernetes", "AWS", "Azure", "Packer", "Grafana", "Prometheus", "CICD"],
    impact: "Helped clients accelerate infrastructure setup and backend delivery through automation and containerization.",
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MinimalHeader />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-violet-100/80 via-sky-100/80 to-emerald-100/80 py-16 border-b border-white/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-light text-slate-900 mb-4 leading-relaxed">
            About <span className="font-semibold text-emerald-600">Me</span>
          </h1>
          <p className="text-base text-slate-600 font-light max-w-lg mx-auto leading-relaxed">
            DevOps Engineer passionate about cloud infrastructure, automation, and sharing knowledge with the community.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Personal Info & Summary */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <User className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 mb-2">{personalInfo.name}</h3>
                  <p className="text-blue-600 font-medium">{personalInfo.title}</p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-3 text-blue-500" />
                    {personalInfo.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-3 text-blue-500" />
                    {personalInfo.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-3 text-blue-500" />
                    {personalInfo.phone}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-blue-200">
                  <p className="text-gray-600 font-light leading-relaxed text-sm">{personalInfo.summary}</p>
                </div>

                <div className="mt-6 flex space-x-3">
                  <Button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Technical Skills */}
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-light mb-6 flex items-center text-gray-900">
                  <Code className="h-5 w-5 mr-2 text-blue-600" />
                  Technical Skills
                </h3>
                <div className="space-y-6">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Experience, Education, Projects */}
          <div className="lg:col-span-2 space-y-12">
            {/* Work Experience */}
            <div>
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

                      <ul className="space-y-2 mb-6">
                        {job.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="text-gray-600 font-light flex items-start">
                            <span className="text-blue-500 mr-2 mt-1">•</span>
                            {responsibility}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Key Projects */}
            <div>
              <h3 className="text-2xl font-light mb-8 flex items-center text-gray-900">
                <Server className="h-6 w-6 mr-3 text-blue-600" />
                Key Projects
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {projects.map((project, index) => (
                  <Card key={index} className="border-0 bg-gradient-to-br from-purple-50 to-pink-50">
                    <CardContent className="p-8">
                      <h4 className="text-xl font-medium text-gray-900 mb-3">{project.name}</h4>
                      <p className="text-gray-600 font-light mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-green-600 font-medium">✅ {project.impact}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-2xl font-light mb-8 flex items-center text-gray-900">
                <GraduationCap className="h-6 w-6 mr-3 text-blue-600" />
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index} className="border-0 bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="p-8">
                      <h4 className="text-xl font-medium text-gray-900 mb-2">{edu.degree}</h4>
                      <p className="text-green-600 font-medium mb-2">{edu.institution}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        {edu.duration}
                      </div>
                      <p className="text-gray-600 font-light mb-2">{edu.details}</p>
                      <p className="text-sm text-green-600 font-medium">GPA: {edu.gpa}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-light mb-8 flex items-center text-gray-900">
                <Award className="h-6 w-6 mr-3 text-blue-600" />
                Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <Card key={index} className="border-0 bg-gradient-to-br from-orange-50 to-red-50">
                    <CardContent className="p-6">
                      <h4 className="font-medium text-gray-900 mb-2">{cert.name}</h4>
                      <p className="text-orange-600 font-medium text-sm mb-2">{cert.issuer}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>Issued: {cert.year}</span>
                        <span>Valid until: {cert.validUntil}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-mono">{cert.credentialId}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <MinimalFooter />
    </div>
  )
}