# Donuts shop (React)

React 18 + Vite + React Router. No backend: cart, favourites, account and orders are saved in the browser (localStorage).

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build
```

## Where things are
- `src/data/shop.js`: all donuts, prices, box sizes, branches, FAQ and story text. Edit content here.
- `src/components/Donut.jsx`: draws every donut as SVG from its data (glaze colours + sprinkle type).
- `src/context/ShopContext.jsx`: cart, promo code, favourites, account, orders (the "store").
- `src/components/Layout.jsx`: header, footer, cart drawer, toast.
- `src/components/ui.jsx`: icons, page theme hook, shared controls.
- `src/pages/`: Home, Menu, Shop, DonutPage, Cart, Checkout, Order, Auth (sign in + account), Info (story, locations, contact, FAQ, 404).
- `src/styles.css`: all styling. Colours are CSS variables on `:root`; each page sets them from a donut's `theme`.

## Routes
`/` `/menu` `/shop` `/donut/:id` `/cart` `/checkout` `/order/:id` `/signin` `/account` `/story` `/locations` `/contact` `/faq`

Uses `HashRouter` so it works on any static host. For clean URLs, switch to `BrowserRouter` in `src/main.jsx` and add a rewrite of all paths to `index.html` on your host.

## Connecting a real backend
Placeholders to replace: `placeOrder` and `signIn` in `ShopContext.jsx`, the contact form submit in `pages/Info.jsx`.
Promo code for testing: `DONUT10`.
