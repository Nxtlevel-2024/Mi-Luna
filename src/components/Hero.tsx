import { ArrowRight } from '@phosphor-icons/react'
import { Container } from './Container'

// TODO: replace placeholder photography with Mi-Luna brand imagery (1200x1500).
const HERO_IMAGE = 'https://picsum.photos/seed/mi-luna-hero-moonlight/1200/1500'

export function Hero() {
  return (
    <section id="top" className="pt-12 pb-24 md:pt-20 md:pb-32">
      <Container className="grid grid-cols-1 items-end gap-12 md:grid-cols-12 md:gap-10">
        <div className="reveal md:col-span-5 md:pb-16">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-ink-muted">Nieuwe collectie</p>
          <h1 className="text-4xl leading-[1.05] font-medium tracking-tight md:text-5xl lg:text-6xl">
            Rust, met zorg gemaakt.
          </h1>
          <p className="mt-6 max-w-[38ch] text-base leading-relaxed text-ink-muted md:text-lg">
            Tijdloze stukken voor elke dag. Ontworpen om lang mee te gaan, rustig van vorm.
          </p>
          <a
            href="#collectie"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-ink transition-transform duration-200 active:scale-[0.98]"
          >
            Bekijk collectie
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <img
            src={HERO_IMAGE}
            alt="Mi-Luna sfeerbeeld"
            width={1200}
            height={1500}
            fetchPriority="high"
            className="aspect-[4/5] w-full rounded-[4px] bg-surface-raised object-cover"
          />
        </div>
      </Container>
    </section>
  )
}
