import { media } from '../content/media'
import { Container } from './Container'
import { Photo } from './Photo'

/* Full-bleed mood shot followed by an offset two-up grid. */
export function Lookbook() {
  return (
    <section aria-label="Lookbook" className="bg-white pb-24 md:pb-32">
      <div className="relative">
        <Photo
          src={media.lookbookWide}
          alt="Model in Mi-Luna lingerie"
          loading="lazy"
          className="h-[80dvh] min-h-[480px] w-full"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-12 md:pb-16">
          <p className="max-w-lg text-3xl leading-tight font-bold tracking-tight text-ecru uppercase md:text-5xl">
            Gemaakt om gevoeld te worden.
          </p>
        </Container>
      </div>

      <Container className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
        <Photo
          src={media.lookbookA}
          alt="Detail van Mi-Luna kant"
          loading="lazy"
          className="aspect-[3/4] w-full md:col-span-5"
        />
        <Photo
          src={media.lookbookB}
          alt="Model in een Mi-Luna set"
          loading="lazy"
          className="aspect-[3/4] w-full md:col-span-7 md:aspect-auto md:h-full"
        />
      </Container>
    </section>
  )
}
