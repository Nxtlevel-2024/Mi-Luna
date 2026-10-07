import { Container } from './Container'

const steps = [
  { title: 'Kies je maat', body: 'S, M of L. Je kunt je maat altijd aanpassen.' },
  { title: 'Elke maand verrast', body: 'Een nieuwe string in premium kant, discreet in je brievenbus.' },
  { title: 'Jij hebt de regie', body: 'Pauzeren, overslaan of stoppen doe je met een klik.' },
]

export function HowItWorks() {
  return (
    <section id="zo-werkt-het" className="scroll-mt-6 bg-white py-24 md:py-32">
      <Container>
        <h2 className="max-w-xl text-4xl leading-none font-bold tracking-tight uppercase md:text-5xl">
          Zo werkt het
        </h2>
        <ol className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 border-t border-sand pt-10 md:mt-20 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.title}>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 max-w-[32ch] leading-relaxed text-espresso-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
