export type Review = { quote: string; name: string; size: string }

/*
 * Reviews shown on the page. Leave empty until there are real customer reviews:
 * the section stays hidden in production while this list is empty.
 */
export const reviews: Review[] = []

/*
 * Sample copy to preview the layout during local development only
 * (`npm run dev`). These are not real customers and never ship to production.
 */
export const sampleReviews: Review[] = [
  {
    quote: 'Eindelijk een string die je echt niet voelt zitten. De pasvorm is perfect.',
    name: 'Sophie V.',
    size: 'S',
  },
  {
    quote: 'Elke maand kijk ik uit naar de brievenbus. Zacht, mooi afgewerkt en het blijft zitten.',
    name: 'Lotte de B.',
    size: 'M',
  },
  {
    quote: 'Onzichtbaar onder mijn werkbroek. Ik draag niets anders meer.',
    name: 'Noor K.',
    size: 'L',
  },
]
