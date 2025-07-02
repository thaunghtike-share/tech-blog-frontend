import { MinimalHeader } from "@/components/minimal-header"
import { MinimalFooter } from "@/components/minimal-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, MessageSquare, Users, Zap } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MinimalHeader />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-violet-100/80 via-sky-100/80 to-emerald-100/80 py-16 border-b border-white/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-light text-slate-900 mb-4 leading-relaxed">
            Get in <span className="font-semibold text-emerald-600">Touch</span>
          </h1>
          <p className="text-base text-slate-600 font-light max-w-lg mx-auto leading-relaxed">
            Have questions about DevOps, AI/ML, or MLOps? Want to contribute or collaborate? We'd love to hear from you.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/50">
            <h2 className="text-2xl font-light text-slate-900 mb-8">Send us a message</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" className="bg-white/50" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" className="bg-white/50" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>
                <Input id="subject" placeholder="What's this about?" className="bg-white/50" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Tell us more..."
                  rows={6}
                  className="bg-white/50 flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-light">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info & Options */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-xl w-fit mx-auto mb-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Email Us</h3>
                  <p className="text-slate-600 text-sm">hello@learnblog.dev</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl w-fit mx-auto mb-4">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Community</h3>
                  <p className="text-slate-600 text-sm">Join our Discord</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 bg-gradient-to-br from-emerald-50 to-teal-50">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3 rounded-xl mr-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Contribute</h3>
                    <p className="text-slate-600 text-sm">Share your expertise</p>
                  </div>
                </div>
                <p className="text-slate-600 font-light leading-relaxed mb-6">
                  Are you a DevOps engineer, ML practitioner, or cloud architect? We're always looking for expert
                  contributors to share practical insights and real-world experiences.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Learn More About Contributing
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-xl mr-4">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Partnership</h3>
                    <p className="text-slate-600 text-sm">Collaborate with us</p>
                  </div>
                </div>
                <p className="text-slate-600 font-light leading-relaxed mb-6">
                  Interested in partnering with us? Whether it's content collaboration, tool reviews, or community
                  events, let's explore how we can work together.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Discuss Partnership
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MinimalFooter />
    </div>
  )
}