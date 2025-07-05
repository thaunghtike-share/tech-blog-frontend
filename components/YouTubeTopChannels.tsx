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
]

export function YouTubeTopChannels() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h3 className="text-3xl font-extrabold mb-8 text-gray-900">📺 Top DevOps YouTube Channels</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {topDevOpsChannels.map(({ name, description, url, videoId }, idx) => (
          <article
            key={idx}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`Latest video from ${name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold text-blue-700 mb-2">{name}</h4>
              <p className="text-gray-700 mb-4">{description}</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 font-medium hover:underline"
              >
                Visit Channel →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}