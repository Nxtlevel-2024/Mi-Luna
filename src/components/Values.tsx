import { Leaf, Package, ArrowsCounterClockwise } from '@phosphor-icons/react'
import { Container } from './Container'

// TODO: replace placeholder photography with Mi-Luna detail imagery (1200x1200).
const DETAIL_IMAGE = 'https://picsum.photos/seed/mi-luna-material-detail/1200/1200'

const values = [
  {
    icon: Leaf,
    title: 'Zorgvuldige materialen',
    body: 'We werken met een kleine groep leveranciers die we persoonlijk kennen.',
  },
  {
    icon: Package,
    title: 'Gratis verzending',
    body: 'Binnen Nederland en België, verpakt zonder plastic.',
  },
  {
    icon: ArrowsCounterClockwise,
    title: '30 dagen retour',
    body: 'Past het niet? Stuur het kosteloos terug.',
  },
]

/*
 * Bento: one image cell on the left, three value cells stacked beside it.
 * Exactly four cells for four pieces of content.
 */
export function Values() {
  const [first, ...others] = values

  return (
    <section aria-labelledby="values-title" className="py-24 md:py-32">
      <Container>
        <h2 id="values-title" className="sr-only">
          Waarom Mi-Luna
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <img
            src={DETAIL_IMAGE}
            alt="Detail van een Mi-Luna materiaal"
            width={1200}
            height={1200}
            loading="lazy"
            className="aspect-square w-full rounded-[4px] bg-surface-raised object-cover md:col-span-5 md:aspect-auto md:h-full"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-7">
            <ValueCell value={first} className="bg-accent text-accent-ink sm:col-span-2" muted="opacity-80" />
            {others.map((value) => (
              <ValueCell key={value.title} value={value} className="bg-surface-raised" muted="text-ink-muted" />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function ValueCell({
  value,
  className,
  muted,
}: {
  value: (typeof values)[number]
  className: string
  muted: string
}) {
  const Icon = value.icon

  return (
    <div className={`flex flex-col justify-between gap-12 rounded-[4px] p-8 md:p-10 ${className}`}>
      <Icon size={24} weight="light" />
      <div>
        <h3 className="text-lg font-medium">{value.title}</h3>
        <p className={`mt-2 max-w-[40ch] leading-relaxed ${muted}`}>{value.body}</p>
      </div>
    </div>
  )
}
