import { ArrowRight } from '@phosphor-icons/react'
import { media } from '../content/media'
import { Container } from './Container'
import { Photo } from './Photo'

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100dvh] items-end overflow-hidden bg-espresso">
      <Photo
        src={media.hero}
        alt="Model in Mi-Luna kant"
        fetchPriority="high"
        className="absolute inset-0 -z-10 size-full object-[60%_center]"
      />
      {/* Warm scrim from the left keeps the copy readable over the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso/75 via-espresso/35 to-transparent"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-espresso/60 to-transparent" />

      <Container className="pb-16 text-ecru md:pb-24">
        <div className="max-w-2xl">
          <h1 className="reveal text-5xl leading-[0.95] font-bold tracking-tight uppercase sm:text-6xl lg:text-7xl">
            Comfort Made Sexy.
            <span className="mt-3 block text-2xl leading-tight font-medium tracking-normal normal-case text-ecru/90 sm:text-3xl lg:text-4xl">
              Elke maand in jouw brievenbus.
            </span>
          </h1>
          <p className="reveal reveal-delay mt-6 max-w-[44ch] text-base leading-relaxed text-ecru/85 md:text-lg">
            Ontdek het Mi-Luna string abonnement. Premium kant, perfecte pasvorm, elke maand een nieuw
            moment van luxe.
          </p>
          <a
            href="#abonnement"
            className="reveal reveal-delay group mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-ecru px-8 text-sm font-semibold tracking-wide text-espresso uppercase transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            Kies je maat
            <ArrowRight
              size={16}
              weight="bold"
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </Container>
    </section>
  )
}
