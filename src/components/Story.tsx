import { Container } from './Container'

// TODO: replace placeholder photography with Mi-Luna brand imagery (2400x1350).
const STORY_IMAGE = 'https://picsum.photos/seed/mi-luna-atelier-story/2400/1350'

export function Story() {
  return (
    <section id="verhaal" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <img
          src={STORY_IMAGE}
          alt="Het atelier van Mi-Luna"
          width={2400}
          height={1350}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-[4px] bg-surface-raised object-cover md:aspect-[16/9]"
        />

        {/* Text sits offset to the right of the image edge on desktop. */}
        <div className="mt-14 grid grid-cols-1 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-6">
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Ons verhaal</h2>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ink-muted">
              Mi-Luna begon met een eenvoudig idee: minder, maar beter. Elk stuk wordt in kleine
              oplages gemaakt, met materialen die we zelf uitkiezen.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
