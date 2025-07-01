import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"
import Image from "next/image"

export function MagazineHero() {
  return (
    <section className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-yellow-400 text-black mb-4 text-sm font-bold">FEATURED STORY</Badge>
            <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
              THE FUTURE OF
              <br />
              <span className="text-yellow-400">WEB DEVELOPMENT</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100 leading-relaxed">
              Explore the cutting-edge technologies and frameworks that are reshaping how we build for the web in 2024
              and beyond.
            </p>
            <div className="flex items-center text-sm mb-8 space-x-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Sarah Johnson
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Dec 15, 2024
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                15 min read
              </div>
            </div>
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold">
              READ FULL STORY
            </Button>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Featured article"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
