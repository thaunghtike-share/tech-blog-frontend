import { Button } from "@/components/ui/button"

export function MinimalHero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 border-b border-blue-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-light text-white mb-6 leading-relaxed">
        <span className="font-semibold text-white">Learn DevOps Now</span>
        </h1>
        <p className="text-lg text-blue-100 font-light max-w-2xl mx-auto leading-relaxed mb-8">
          In-depth articles on DevOps, AI/ML, MLOps, cloud infrastructure, and automation. Curated for engineers who
          build scalable, intelligent systems.
        </p>

        <div className="flex justify-center">
          <Button className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-8 py-3 text-lg shadow-lg">
            Start Learning 📚
          </Button>
        </div>
      </div>
    </section>
  )
}
