# Verdant & Co. — website

A four-page marketing site (Home, Services, About, Contact) built with React, Vite and Tailwind CSS, including a per-service booking modal with Paystack checkout.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional, serves the production build locally
```

The production files are written to `dist/`.

## Before going live

- **Paystack key** — `src/App.jsx` has a placeholder public key:
  ```js
  const PAYSTACK_PUBLIC_KEY = "pk_test_00000000000000000000000000000000000";
  ```
  Replace it with your real public key from the Paystack dashboard (test or live). Never put your *secret* key in frontend code.
- **Payment verification** — the current flow trusts Paystack's client-side callback. For production, add a backend endpoint that verifies the transaction reference against Paystack's `/transaction/verify` API before marking an order as paid.
- **Images** — the hero image at the top of each page currently points to placeholder photography (Picsum). Swap the `src` values in the `PageHero` calls inside `src/App.jsx` for your own photography.
- **Copy & pricing** — company name, address, team names and service prices in `src/App.jsx` are placeholders — update them to your real details.

## Project structure

```
index.html
src/
  main.jsx        # React entry point
  App.jsx          # entire site: nav, pages, booking modal
  index.css        # Tailwind directives
tailwind.config.js
postcss.config.js
vite.config.js
```
