import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, MapPin, Calendar, Briefcase, Download, ExternalLink } from "lucide-react"

const personalInfo = {
  name: "Thaung Htike Oo",
  title: "DevOps Engineer & Cloud Architect",
  location: "Myanmar",
  bio: "Passionate DevOps Engineer with 5+ years of experience in cloud infrastructure, automation, and CI/CD pipelines. I love sharing knowledge about modern DevOps practices, containerization, and cloud technologies. Through this blog, I aim to help fellow engineers navigate the ever-evolving world of DevOps and build scalable, reliable systems.",
}

const workExperience = [
  {
    company: "Tech Solutions Co.",
    position: "Senior DevOps Engineer",
    duration: "2022 - Present",
    location: "Remote",
    description:
      "Leading cloud infrastructure projects and implementing CI/CD pipelines for enterprise applications. Specialized in AWS, Kubernetes, and automation tools.",
  },
  {
    company: "Digital Innovation Ltd.",
    position: "DevOps Engineer",
    duration: "2020 - 2022",
    location: "Yangon, Myanmar",
    description:
      "Designed scalable cloud infrastructure and automated deployment processes for microservices architecture. Focused on monitoring, logging, and containerization.",
  },
  {
    company: "StartupTech",
    position: "Junior DevOps Engineer",
    duration: "2019 - 2020",
    location: "Yangon, Myanmar",
    description:
      "Maintained Linux servers and assisted in cloud migration projects. Gained hands-on experience with AWS services and infrastructure automation.",
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