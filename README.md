# Mi-Luna

One-page storefront voor Mi-Luna. React + TypeScript + Tailwind CSS v4, gebouwd met Vite, met producten uit de Shopify Storefront API.

## Starten

```bash
cp .env.example .env   # vul de Shopify Storefront-gegevens in
npm install
npm run dev
```

## Structuur

- `src/lib/shopify.ts` - Storefront API client (GraphQL)
- `src/lib/useProducts.ts` - producten ophalen met loading / error / empty states
- `src/components/` - secties van de one-page: Header, Hero, Collection, Story, Values, Newsletter, Footer
- `src/index.css` - design tokens (licht en donker) en Tailwind theme

Layout opgezet volgens de Taste-skill met `DESIGN_VARIANCE: 4`, `VISUAL_DENSITY: 5`.
