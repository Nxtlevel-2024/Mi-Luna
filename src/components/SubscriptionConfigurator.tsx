import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Transition } from 'motion/react'
import { ArrowRight, Check } from '@phosphor-icons/react'
import { media } from '../content/media'
import { Container } from './Container'
import { Photo } from './Photo'

type Size = 'S' | 'M' | 'L'

const sizes: Array<{ value: Size; fit: string }> = [
  { value: 'S', fit: 'Past bij maat 34-36' },
  { value: 'M', fit: 'Past bij maat 38-40' },
  { value: 'L', fit: 'Past bij maat 42-44' },
]

// TODO: pull price and interval from the Shopify selling plan once it exists.
const PLAN = { price: '€19,95', interval: 'per maand' }

const perks = ['Elke maand een nieuwe premium string', 'Gratis en discreet verzonden', 'Pauzeer of stop wanneer je wilt']

/*
 * Soft spring for the selected-size pill: subtle bounce, interruptible when
 * the customer changes her mind mid-motion.
 */
const pillSpring: Transition = { type: 'spring', duration: 0.45, bounce: 0.18 }

export function SubscriptionConfigurator() {
  const [size, setSize] = useState<Size | null>(null)
  const reduceMotion = useReducedMotion()
  const selected = sizes.find((s) => s.value === size)

  return (
    <section id="abonnement" tabIndex={-1} aria-labelledby="abonnement-title" className="bg-ecru py-20 outline-none md:py-28">
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <Photo
          src={media.configurator}
          alt="Mi-Luna string in zacht kant"
          loading="lazy"
          className="aspect-[4/5] w-full md:col-span-7"
        />

        {/* Floating panel: sticks beside the photo on desktop. */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-8">
            <h2 id="abonnement-title" className="text-4xl leading-none font-extrabold tracking-[-0.03em] md:text-5xl">
              Jouw string abonnement
            </h2>
            <p className="mt-4 max-w-[40ch] leading-relaxed text-espresso-soft">
              Kies je maat. Wij zorgen dat er elke maand iets nieuws in je brievenbus valt.
            </p>
            <p className="mt-5 text-2xl font-medium">
              {PLAN.price}
              <span className="ml-2 text-base font-normal text-espresso-soft">{PLAN.interval}</span>
            </p>

            <fieldset className="mt-10">
              <legend className="text-sm font-semibold tracking-wide uppercase">Kies je maat</legend>

              <div className="mt-4 grid grid-cols-3 gap-1 rounded-full bg-white p-1">
                {sizes.map((option) => {
                  const isSelected = option.value === size
                  return (
                    <label
                      key={option.value}
                      className="relative isolate flex h-14 cursor-pointer items-center justify-center rounded-full text-base font-semibold transition-transform duration-150 ease-out active:scale-[0.97]"
                    >
                      <input
                        type="radio"
                        name="size"
                        value={option.value}
                        checked={isSelected}
                        onChange={() => setSize(option.value)}
                        className="peer sr-only"
                      />
                      {isSelected && (
                        <motion.span
                          layoutId="size-pill"
                          transition={reduceMotion ? { duration: 0 } : pillSpring}
                          className="absolute inset-0 -z-10 rounded-full bg-espresso"
                        />
                      )}
                      <span
                        className={`transition-colors duration-200 ${isSelected ? 'text-ecru' : 'text-espresso'}`}
                      >
                        {option.value}
                      </span>
                      <span className="pointer-events-none absolute inset-0 rounded-full peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-espresso" />
                    </label>
                  )
                })}
              </div>

              {/* Fit hint crossfades with a light blur so the swap reads as one motion. */}
              <div className="mt-3 h-5 text-sm text-espresso-soft" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={selected?.value ?? 'none'}
                    initial={{ opacity: 0, filter: 'blur(2px)', transform: 'translateY(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(2px)', transform: 'translateY(-4px)' }}
                    transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {selected ? selected.fit : 'Twijfel je? Kies je normale slipmaat.'}
                  </motion.p>
                </AnimatePresence>
              </div>
            </fieldset>

            <button
              type="button"
              disabled={!size}
              // TODO: add the selling-plan variant to a Shopify cart and redirect to checkout.
              className="group mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-espresso px-8 text-sm font-semibold tracking-wide text-ecru uppercase transition-[transform,opacity] duration-150 ease-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
            >
              {size ? `Start abonnement, maat ${size}` : 'Kies eerst je maat'}
              {size && <ArrowRight size={16} weight="bold" />}
            </button>

            <ul className="mt-8 space-y-3 text-sm">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <Check size={16} weight="bold" className="shrink-0 text-sand-deep" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
