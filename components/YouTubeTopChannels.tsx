"use client"

import React from "react"

interface Channel {
  name: string
  description: string
  url: string
  videoId: string
}

const topDevOpsChannels: Channel[] = [
  {
    name: "TechWorld with Nana",
    description: "Clear and practical DevOps and Kubernetes tutorials.",
    url: "https://www.youtube.com/c/TechWorldwithNana",
    videoId: "1J2YOV6LcwY",
  },
  {
    name: "The DevOps Toolkit",
    description: "Hands-on DevOps tooling and cloud-native tech deep dives.",
    url: "https://www.youtube.com/c/DevOpsToolkit",
    videoId: "4N_MWAQEzWg",
  },
  {
    name: "Cloud Native Computing Foundation",
    description: "Official CNCF channel with talks and updates on cloud-native tech.",
    url: "https://www.youtube.com/c/cloudnativefdn",
    videoId: "WxgcRpWKWBs",
  },
  {
    name: "A Cloud Guru",
    description: "Cloud computing and DevOps courses & tutorials.",
    url: "https://www.youtube.com/c/ACloudGuru",
    videoId: "4SWsW8V8QV8",
  },
  {
    name: "KodeKloud",
    description: "DevOps, Kubernetes, Docker, Terraform and cloud tutorials.",
    url: "https://www.youtube.com/c/KodeKloud",
    videoId: "HuMREoq7gU0",
  },
  {
    name: "Tech Primers",
    description: "DevOps, Kubernetes, microservices, and cloud computing tutorials.",
    url: "https://www.youtube.com/c/TechPrimers",
    videoId: "mJsLK-iPagc",
  },
  {
    name: "Cloud Academy",
    description: "Cloud computing and DevOps learning resources and tutorials.",
    url: "https://www.youtube.com/c/CloudAcademy",
    videoId: "b-cHIoMbRCE",
  },
{
    name: "DevOps Directive",
    description: "DevOps, CI/CD, and cloud-native tutorials and best practices.",
    url: "https://www.youtube.com/c/DevOpsDirective",
    videoId: "2T86xAtR6Fo",
    },
    {
    name: "Just Me and Open Source",
    description: "Live coding sessions on DevOps, cloud, and web development.",
    url: "https://www.youtube.com/@justmeandopensource",
    videoId: "azh8J-RGdZM",
    }
]

export function YouTubeTopChannels() {
  return (
    <section className="mt-20 bg-white rounded-xl p-10 border border-gray-100 shadow-sm">
      <h3 className="text-3xl font-bold mb-4 text-gray-900 text-left select-none">
        📺 Top DevOps YouTube Channels
      </h3>
      <p className="text-gray-700 mb-10 text-left leading-relaxed max-w-4xl">
        Watch trusted creators explain DevOps, Cloud, CI/CD, and Infrastructure using hands-on tutorials.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {topDevOpsChannels.map(({ name, description, url, videoId }, idx) => (
          <article
            key={idx}
            className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                className="w-full h-full rounded-md"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`Latest video from ${name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h4 className="text-lg font-semibold text-blue-700 mb-1">{name}</h4>
            <p className="text-sm text-gray-700 mb-3">{description}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              Visit Channel →
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}