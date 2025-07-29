"use client";

import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Download,
  Server,
  Linkedin,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const personalInfo = {
  name: "Thaung Htike Oo",
  title: "Senior DevOps Engineer",
  location: "Yangon | Myanmar",
  email: "thaunghtike.tho1234@gmail.com",
  phone: "+959952492359",
  summary:
    "DevOps Engineer with over 5 years of experience designing, automating, and optimizing cloud-native infrastructure in fast-paced, high-availability environments. Skilled in building robust CI/CD pipelines, managing containerized applications with Kubernetes and Docker, and implementing infrastructure as code using Terraform and Ansible. Proficient across major cloud platforms including Azure and AWS, with a strong focus on reliability, scalability, and automation. Currently expanding into the AI/MLOps space — learning to streamline machine learning workflows, manage model lifecycles, and deploy scalable ML solutions using tools like MLflow, Kubeflow, and Azure Machine Learning. Passionate about bridging the gap between software engineering, data science, and infrastructure through automation and modern DevOps practices.",
  avatar: "/me.png?height=150&width=150", // Placeholder for avatar
  linkedinUrl: "https://www.linkedin.com/in/thaung-htike-oo-devops/",
};

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
      "Worked closely with developers and data scientists to align infrastructure with application and machine learning needs.",
    ],
    technologies: [
      "Azure",
      "AKS",
      "Terraform",
      "Kubernetes",
      "ArgoCD",
      "GitHub Actions",
      "Azure CNI",
      "Linux",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    company: "Dinger Company Ltd",
    position: "Senior DevOps Engineer",
    duration: "June 2022 - August 2024",
    location: "Yangon, Myanmar",
    responsibilities: [
      "Managed cloud infrastructure using tools such as EKS, AKS, GitHub Actions, ArgoCD, Grafana, Istio, and Loki",
      "Successfully released the MTB Pay wallet in August 2024.",
      "Designed and implemented cloud infrastructure from ground up, including CI/CD pipelines for deployment on AKS",
      "Managed cloud cost optimization and infrastructure performance tuning for efficiency.",
      "Deployed and maintained Kubernetes clusters using AKS and EKS to manage containerized applications.",
      "Created and managed GitHub Actions and ArgoCD for automated deployments.",
      "Monitored and analyzed system performance using Grafana and Prometheus.",
      "Implemented service mesh (Istio) for better traffic control and security management.",
    ],
    technologies: [
      "AWS",
      "AKS",
      "Kubernetes",
      "Terraform",
      "Github Actions",
      "Python",
    ],
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
      "Centralized logging solutions with Loki for log aggregation and analysis across services.",
    ],
    technologies: [
      "Linux",
      "ArgoCD",
      "Git",
      "AWS",
      "Bash",
      "Monitoring",
      "Kubernetes",
      "Grafana",
      "Loki",
    ],
  },
];

const education = [
  {
    degree: "B.C.Tech",
    institution: "University of Information Technology, Yangon",
    duration: "2015 - 2020",
    details:
      "Specialized in Communication and Networking. Graduated with honors.",
    gpa: "3.8/4.0",
  },
];

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
];

const skills = {
  "Cloud Platforms": ["AWS", "Azure", "Google Cloud Platform"],
  Containerization: ["Docker", "Kubernetes", "OpenShift"],
  "CI/CD Tools": [
    "GitLab CI",
    "GitHub Actions",
    "Azure DevOps",
    "CircleCI",
    "ArgoCD",
    "Jenkins",
  ],
  "Infrastructure as Code": [
    "Terraform",
    "CloudFormation",
    "Ansible",
    "Pulumi",
  ],
  Monitoring: ["Prometheus", "Grafana", "ELK Stack", "CloudWatch", "Datadog"],
  Programming: ["Python", "Node", "Nest JS"],
  Databases: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "DynamoDB"],
  "Operating Systems": ["Linux", "Mac", "Windows Server"],
  "Version Control": ["Git", "GitHub", "GitLab"],
  Security: ["AWS IAM", "Vault", "SSL/TLS", "Security Scanning"],
};

const projects = [
  {
    name: "Monolithic to Cloud-Native Architecture Migration",
    description:
      "Led the end-to-end migration of legacy monolithic applications to modern microservices architecture at both Dinger and Maharbawga Co., Ltd. This included containerization, infrastructure redesign, and implementing CI/CD pipelines.",
    technologies: [
      "AWS",
      "Azure",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "ArgoCD",
    ],
    impact:
      "Improved deployment speed by 60%, enhanced system scalability and fault tolerance, and reduced infrastructure and maintenance costs by over 45%.",
  },
  {
    name: "MTB Pay Wallet Release",
    description:
      "Played a key role in the successful release of the MTB Pay wallet, contributing to infrastructure design, automation, and deployment processes.",
    technologies: [
      "AWS",
      "Azure",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "ArgoCD",
    ],
    impact:
      "Enabled smooth and reliable product launch with improved deployment efficiency and system stability.",
  },
  {
    name: "Freelance DevOps Engineer",
    description:
      "Worked as a freelance DevOps engineer on Upwork, delivering infrastructure automation with Terraform, Kubernetes setup, and backend improvements in Python/Django.",
    technologies: [
      "Terraform",
      "Kubernetes",
      "AWS",
      "Azure",
      "Packer",
      "Grafana",
      "Prometheus",
      "CICD",
    ],
    impact:
      "Helped clients accelerate infrastructure setup and backend delivery through automation and containerization.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      <MinimalHeader />
      {/* Page Header */}
      <section className="-mt-14 md:-mt-4 bg-gray-50 py-12 border-b border-white/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-relaxed">
            <span className="text-gray-700">About </span>
            <span className="text-blue-600">Me</span>
          </h1>
          <p className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            From CI/CD to MLOps — streamlining software delivery in the cloud
            era.
          </p>
        </div>
      </section>
      <main className="-mt-24 md:-mt-10 max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Personal Info & Summary */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 bg-gray-50 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={personalInfo.avatar || "/me.png"}
                      alt={personalInfo.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {personalInfo.name}
                  </h3>
                  <p className="text-blue-600 font-semibold text-base">
                    {personalInfo.title}
                  </p>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-3 text-blue-500" />
                    {personalInfo.location}
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-blue-500" />
                    {personalInfo.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-blue-500" />
                    {personalInfo.phone}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-blue-200">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {personalInfo.summary}
                  </p>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 font-semibold transition-all bg-transparent"
                    onClick={() =>
                      window.open(personalInfo.linkedinUrl, "_blank")
                    }
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* Technical Skills */}
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                  <Code className="h-6 w-6 mr-3 text-blue-600" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-5">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category}>
                      <h4 className="text-base font-semibold text-gray-800 mb-2">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                  <Briefcase className="h-6 w-6 mr-3 text-green-600" />
                  Freelance Earnings (Upwork)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700 font-medium">
                    Total Earnings
                  </p>
                  <Badge className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                    $17,000+
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Worked long-term as a Kubernetes Engineer providing reliable
                  support and infrastructure automation to global clients. Also
                  attempted DevOps content writing, but had to pause due to
                  limited time.
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Kubernetes cluster setup, management, and scaling</li>
                  <li>
                    Terraform-based infrastructure provisioning (AWS & Azure)
                  </li>
                  <li>CI/CD pipeline design using GitHub Actions</li>
                  <li>Monitoring and alerting with Grafana & Prometheus</li>
                  <li>
                    DevOps content creation (paused due to time constraints)
                  </li>
                </ul>

                {/* Earnings Screenshot */}
                <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <Image
                    src="/earnings.png" // ← your image file
                    alt="Upwork Earnings"
                    width={800}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Upwork profile button */}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 font-semibold transition-all bg-transparent"
                  onClick={() =>
                    window.open(
                      "https://www.upwork.com/freelancers/~thaunghtike",
                      "_blank"
                    )
                  }
                >
                  View Upwork Profile
                </Button>
              </CardContent>
            </Card>
          </div>
          {/* Experience, Education, Projects, Certifications */}
          <div className="-mt-5 md:-mt-5 lg:col-span-2 space-y-10">
            {/* Work Experience */}
            <div>
              <h3 className="text-2xl font-bold mb-3 flex items-center text-gray-900">
                <Briefcase className="h-6 w-6 mr-3 text-blue-600" />
                Work Experience
              </h3>
              <div className="space-y-8">
                {workExperience.map((job, index) => (
                  <Card
                    key={index}
                    className="border-0 bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-1">
                            {job.position}
                          </h4>
                          <p className="text-blue-700 font-semibold text-base mb-2">
                            {job.company}
                          </p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div className="flex items-center justify-end mb-1">
                            <Calendar className="h-4 w-4 mr-2" />
                            {job.duration}
                          </div>
                          <div className="flex items-center justify-end">
                            <MapPin className="h-4 w-4 mr-2" />
                            {job.location}
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-4 list-disc pl-5">
                        {job.responsibilities.map((responsibility, idx) => (
                          <li
                            key={idx}
                            className="text-gray-700 text-sm leading-relaxed"
                          >
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-sm bg-indigo-100 text-indigo-800 border-indigo-300 px-3 py-1 rounded-full font-medium"
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
              <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
                <Server className="h-6 w-6 mr-3 text-blue-600" />
                Key Projects
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {projects.map((project, index) => (
                  <Card
                    key={index}
                    className="border-0 bg-gray-50 shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {project.name}
                      </h4>
                      <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium"
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
            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
                <GraduationCap className="h-6 w-6 mr-3 text-blue-600" />
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card
                    key={index}
                    className="border-0 bg-gray-50 shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {edu.degree}
                      </h4>
                      <p className="text-green-700 font-semibold text-base mb-2">
                        {edu.institution}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {edu.duration}
                      </div>
                      <p className="text-gray-700 mb-2 text-sm leading-relaxed">
                        {edu.details}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
                <Award className="h-6 w-6 mr-3 text-blue-600" />
                Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <Card
                    key={index}
                    className="border-0 bg-gray-50 to-red-50 shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <h4 className="font-bold text-gray-900 mb-2 text-base">
                        {cert.name}
                      </h4>
                      <p className="text-orange-700 font-semibold text-sm mb-2">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <span>Issued: {cert.year}</span>
                        <span>Valid until: {cert.validUntil}</span>
                      </div>
                      <p className="text-sm text-gray-700 font-mono">
                        {cert.credentialId}
                      </p>
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
  );
}
