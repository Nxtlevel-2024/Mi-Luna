import { Collection } from './components/Collection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Lookbook } from './components/Lookbook'
import { SubscriptionConfigurator } from './components/SubscriptionConfigurator'

/*
 * Mi-Luna one-page, centred on the string subscription.
 * Full-bleed hero, then the size configurator straight below it.
 */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SubscriptionConfigurator />
        <HowItWorks />
        <Lookbook />
        <Collection />
      </main>
      <Footer />
    </>
  )
}
