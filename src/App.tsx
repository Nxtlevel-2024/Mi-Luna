import { Collection } from './components/Collection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Newsletter } from './components/Newsletter'
import { Story } from './components/Story'
import { Values } from './components/Values'

/*
 * Mi-Luna one-page.
 * Taste-skill dials: DESIGN_VARIANCE 4 (offset grid, varied aspect ratios),
 * VISUAL_DENSITY 5 (py-24 / md:py-32 section rhythm), MOTION_INTENSITY 3 (CSS only).
 */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Collection />
        <Story />
        <Values />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
