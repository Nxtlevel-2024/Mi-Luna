import type { MouseEvent } from 'react'
import { ArrowDown } from '@phosphor-icons/react'
import { media } from '../content/media'
import { smoothScrollTo } from '../lib/smoothScroll'
import { Container } from './Container'
import { Photo } from './Photo'

function scrollToConfigurator(event: MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById('abonnement')
  if (!target) return
  event.preventDefault()
  smoothScrollTo(target)
}

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-sand">
      <Photo
        src={media.hero}
        alt="Model in Mi-Luna premium lingerie"
        fetchPriority="high"
        className="absolute inset-0 -z-10 size-full object-[65%_center]"
      />
      {/* Warm sand wash from the left keeps the copy readable over the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ecru/90 via-ecru/55 to-transparent md:via-ecru/30"
      />

      <Container className="pt-24 pb-16 md:pb-24">
        <div className="max-w-2xl lg:max-w-5xl">
          <h1 className="reveal text-5xl leading-[0.98] font-extrabold tracking-[-0.035em] text-espresso sm:text-6xl lg:text-7xl xl:text-8xl">
            One subscription, endless confidence.
          </h1>
          <p className="reveal reveal-delay mt-7 max-w-[46ch] text-base leading-relaxed text-espresso-soft md:text-lg">
            Ontdek het Mi-Luna string abonnement. Premium materialen, een feilloze pasvorm en elke maand
            een nieuw moment van ultieme zelfverzekerdheid in je brievenbus.
          </p>
          <a
            href="#abonnement"
            onClick={scrollToConfigurator}
            className="reveal reveal-delay group mt-10 inline-flex h-16 items-center gap-3 rounded-full bg-espresso px-10 text-base font-semibold text-ecru transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            Kies jouw maat
            <ArrowDown
              size={18}
              weight="bold"
              className="transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </Container>
    </section>
  )
}
