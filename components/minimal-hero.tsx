import { Button } from "@/components/ui/button"

export function MinimalHero() {
  return (
    <section className="bg-gradient-to-r from-violet-100/80 via-sky-100/80 to-emerald-100/80 py-12 border-b border-white/50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-2xl md:text-4xl font-light text-slate-900 mb-4 leading-relaxed">
          Thaung Hitke Oo -  <span className="font-semibold text-emerald-600">Learn DevOps Now</span>
        </h1>
        <p className="text-base text-slate-600 font-light max-w-lg mx-auto leading-relaxed mb-8">
          In-depth articles on DevOps, AI/ML, MLOps, cloud infrastructure, and automation. Curated for engineers who
          build scalable, intelligent systems.
        </p>

        <div className="flex justify-center">
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-light px-8 shadow-lg">
            Start Reading
          </Button>
        </div>
      </div>
    </section>
  )
}