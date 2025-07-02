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
  title: "DevOps Engineer & Cloud Architect",
  location: "Myanmar",
  email: "thaunghtike@example.com", // Update with your actual email
  phone: "+95 9xxxxxxxxx", // Update with your actual phone
  summary:
    "Passionate DevOps Engineer with 5+ years of experience in cloud infrastructure, automation, and CI/CD pipelines. Specialized in AWS, Docker, Kubernetes, and modern DevOps practices. I believe in the power of automation, continuous learning, and sharing knowledge with the community.",
}

const workExperience = [
  {
    company: "Tech Solutions Co.",
    position: "Senior DevOps Engineer",
    duration: "2022 - Present",
    location: "Remote",
    responsibilities: [
      "Led migration of legacy applications to AWS cloud infrastructure",
      "Implemented CI/CD pipelines using Jenkins and GitLab CI",
      "Managed Kubernetes clusters serving 1M+ daily users",
      "Reduced deployment time by 80% through automation",
      "Mentored junior engineers on DevOps best practices",
    ],
    technologies: ["AWS", "Kubernetes", "Docker", "Jenkins", "Terraform", "Python"],
  },
  {
    company: "Digital Innovation Ltd.",
    position: "DevOps Engineer",
    duration: "2020 - 2022",
    location: "Yangon, Myanmar",
    responsibilities: [
      "Designed and maintained scalable cloud infrastructure",
      "Automated deployment processes for microservices architecture",
      "Implemented monitoring and logging solutions using ELK stack",
      "Collaborated with development teams on containerization",
      "Reduced infrastructure costs by 40% through optimization",
    ],
    technologies: ["Docker", "AWS", "Ansible", "Prometheus", "Grafana", "ELK Stack"],
  },
  {
    company: "StartupTech",
    position: "Junior DevOps Engineer",
    duration: "2019 - 2020",
    location: "Yangon, Myanmar",
    responsibilities: [
      "Maintained Linux servers and database systems",
      "Implemented backup and disaster recovery procedures",
      "Assisted in cloud migration projects",
      "Provided technical support for development teams",
      "Automated routine maintenance tasks using shell scripts",
    ],
    technologies: ["Linux", "MySQL", "Git", "AWS EC2", "Nginx", "Bash"],
  },
]

const education = [
  {
    degree: "Bachelor of Computer Science",
    institution: "University of Computer Studies, Yangon",
    duration: "2015 - 2019",
    details: "Specialized in Software Engineering and System Administration. Graduated with honors.",
    gpa: "3.8/4.0",
  },
]

const certifications = [
  {
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    year: "2023",
    credentialId: "AWS-SAA-123456",
    validUntil: "2026",
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    year: "2022",
    credentialId: "CKA-789012",
    validUntil: "2025",
  },
  {
    name: "Docker Certified Associate",
    issuer: "Docker Inc.",
    year: "2021",
    credentialId: "DCA-345678",
    validUntil: "2024",
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    year: "2023",
    credentialId: "HC-TA-901234",
    validUntil: "2025",
  },
]

const skills = {
  "Cloud Platforms": ["AWS", "Azure", "Google Cloud Platform"],
  Containerization: ["Docker", "Kubernetes", "OpenShift", "Podman"],
  "CI/CD Tools": ["Jenkins", "GitLab CI", "GitHub Actions", "Azure DevOps", "CircleCI"],
  "Infrastructure as Code": ["Terraform", "CloudFormation", "Ansible", "Pulumi"],
  Monitoring: ["Prometheus", "Grafana", "ELK Stack", "CloudWatch", "Datadog"],
  Programming: ["Python", "Bash", "Go", "JavaScript", "YAML"],
  Databases: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "DynamoDB"],
  "Operating Systems": ["Linux (Ubuntu, CentOS)", "Windows Server"],
  "Version Control": ["Git", "GitHub", "GitLab", "Bitbucket"],
  Security: ["AWS IAM", "Vault", "SSL/TLS", "Security Scanning"],
}

const projects = [
  {
    name: "Multi-Cloud Infrastructure Migration",
    description: "Led the migration of a monolithic application to microservices across AWS and Azure",
    technologies: ["AWS", "Azure", "Kubernetes", "Terraform"],
    impact: "Reduced infrastructure costs by 45% and improved scalability",
  },
  {
    name: "CI/CD Pipeline Automation",
    description: "Built comprehensive CI/CD pipelines for 20+ applications",
    technologies: ["Jenkins", "Docker", "Kubernetes", "GitLab"],
    impact: "Reduced deployment time from 4 hours to 15 minutes",
  },
  {
    name: "Monitoring & Alerting System",
    description: "Implemented centralized monitoring for entire infrastructure",
    technologies: ["Prometheus", "Grafana", "ELK Stack", "PagerDuty"],
    impact: "Improved incident response time by 70%",
  },
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