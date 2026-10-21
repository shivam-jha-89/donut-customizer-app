/* Everything the shop sells and says lives here, so content can be edited without touching components. */

export const rs = (n) => 'Rs. ' + Math.round(n).toLocaleString('en-US')

const T = (band, band2, ink, dark) => ({ band, band2, ink, dark: !!dark })

export const DONUTS = [
  { id: 'lemon-pearl', name: 'Lemon Pearl', cat: 'Fruity', price: 220, kcal: 290, tag: 'Bestseller',
    glaze: ['#fff59a', '#fde047', '#e5b800'], spr: 'pearls', theme: T('#ecc856', '#f5e193', '#4a3604'),
    blurb: 'Tangy lemon glaze on a pillowy yeast ring, topped with sugar pearls.',
    long: 'We squeeze real lemons into the glaze every morning, so it stays bright and a little sharp. The sugar pearls add a crunch against the soft dough.',
    notes: ['Lemon', 'Vanilla dough', 'Sugar pearls'], allergens: 'Gluten, egg, milk' },
  { id: 'strawberry-rush', name: 'Strawberry Rush', cat: 'Fruity', price: 240, kcal: 310,
    glaze: ['#ffb3c8', '#ff6f9c', '#e0407a'], spr: 'rainbow', theme: T('#e56d8e', '#f58aa8', '#3d0f1d'),
    blurb: 'Strawberry glaze with a shower of rainbow sprinkles.',
    long: 'The glaze is a slow-cooked strawberry reduction: sweet at first, with a little tartness at the end. The sprinkles are the classic kind, and there are a lot of them.',
    notes: ['Strawberry', 'Rainbow sprinkles'], allergens: 'Gluten, egg, milk' },
  { id: 'pistachio-zig', name: 'Pistachio Zig', cat: 'Special', price: 260, kcal: 330,
    glaze: ['#8fe07a', '#4fbe46', '#349a35'], spr: 'zigzag', theme: T('#6a9650', '#8cc06c', '#0c1a06'),
    blurb: 'Pistachio glaze striped with dark chocolate.',
    long: 'Ground pistachio goes into the glaze, then a dark chocolate zigzag goes over the top. Nutty, lightly salted and not too sweet.',
    notes: ['Pistachio', 'Dark chocolate'], allergens: 'Gluten, egg, milk, tree nuts' },
  { id: 'blueberry-sky', name: 'Blueberry Sky', cat: 'Fruity', price: 240, kcal: 300,
    glaze: ['#7fd8ff', '#2aa8e8', '#0f84c4'], spr: 'mixed', theme: T('#5bb8da', '#8bdcf2', '#07304a'),
    blurb: 'Blueberry glaze with a mix of chocolate and coloured sticks.',
    long: 'Blueberries are cooked down with a little vanilla until the glaze turns glossy. A handful of chocolate and coloured sticks finishes it.',
    notes: ['Blueberry', 'Vanilla', 'Chocolate sticks'], allergens: 'Gluten, egg, milk' },
  { id: 'choco-dream', name: 'Choco Dream', cat: 'Classic', price: 230, kcal: 340,
    glaze: ['#8a5a3c', '#5e3520', '#3d2012'], spr: 'rainbow', theme: T('#7b4a2d', '#9a6540', '#fff4d6', true),
    blurb: 'Thick, glossy milk chocolate glaze.',
    long: 'Plain and proper: milk chocolate melted over warm dough, then left to set with a snap. Rainbow sprinkles are optional, but we always add them.',
    notes: ['Milk chocolate', 'Rainbow sprinkles'], allergens: 'Gluten, egg, milk, soy' },
  { id: 'vanilla-cloud', name: 'Vanilla Cloud', cat: 'Classic', price: 200, kcal: 280,
    glaze: ['#fffaf0', '#f6e7c8', '#e2cd9d'], spr: 'choc', theme: T('#f0cf9e', '#f8e6c6', '#4a3604'),
    blurb: 'Vanilla bean glaze with dark chocolate sticks.',
    long: 'Real vanilla bean specks run through a soft white glaze. The chocolate sticks keep it from being too sweet.',
    notes: ['Vanilla bean', 'Chocolate sticks'], allergens: 'Gluten, egg, milk' },
  { id: 'caramel-crunch', name: 'Caramel Crunch', cat: 'Classic', price: 250, kcal: 360,
    glaze: ['#e9b36a', '#c98534', '#9c5f1c'], spr: 'crumb', theme: T('#c98a3c', '#e0a95a', '#2e1d03'),
    blurb: 'Salted caramel glaze with toasted biscuit crumbs.',
    long: 'We cook the caramel until it just starts to turn bitter, add a pinch of salt, and press biscuit crumbs into it while it is still soft.',
    notes: ['Salted caramel', 'Biscuit crumb'], allergens: 'Gluten, egg, milk' },
  { id: 'lavender-honey', name: 'Lavender Honey', cat: 'Special', price: 270, kcal: 310,
    glaze: ['#d9c7f5', '#a98be0', '#7e5cc4'], spr: 'drizzle', theme: T('#a78bd4', '#c9b6ea', '#1e1236'),
    blurb: 'Lavender glaze with a thin white honey drizzle.',
    long: 'Culinary lavender is steeped in milk for the glaze, and the honey drizzle goes on last. Floral without tasting like soap.',
    notes: ['Lavender', 'Honey'], allergens: 'Gluten, egg, milk' },
  { id: 'red-velvet', name: 'Red Velvet', cat: 'Special', price: 270, kcal: 350,
    glaze: ['#e86a74', '#c53a48', '#8f1f2e'], spr: 'drizzle', theme: T('#b3303c', '#d4565f', '#fff1dc', true),
    blurb: 'Red velvet glaze with a cream cheese drizzle.',
    long: 'Cocoa and a little buttermilk in the dough, a deep red glaze on top and cream cheese drizzled across. It tastes like the cake.',
    notes: ['Cocoa', 'Cream cheese'], allergens: 'Gluten, egg, milk' },
  { id: 'orange-zest', name: 'Orange Zest', cat: 'Fruity', price: 220, kcal: 285,
    glaze: ['#ffc58a', '#ff9a3d', '#e0701a'], spr: 'pearls', theme: T('#f08a3c', '#f8b574', '#3a1a02'),
    blurb: 'Fresh orange glaze with sugar pearls.',
    long: 'Orange juice and zest go straight into the glaze. It tastes like marmalade, only lighter.',
    notes: ['Orange', 'Sugar pearls'], allergens: 'Gluten, egg, milk' },
]

export const D = Object.fromEntries(DONUTS.map((d) => [d.id, d]))
export const HERO = ['lemon-pearl', 'strawberry-rush', 'pistachio-zig', 'blueberry-sky'].map((id) => D[id])
export const CATEGORIES = ['All', 'Classic', 'Fruity', 'Special']

export const BOX_PRICE = { 4: 780, 6: 1120, 12: 2100, 24: 4000 }
export const BOX_SIZES = [4, 6, 12, 24]
export const BOX_COLS = { 4: 2, 6: 3, 12: 4, 24: 6 }
export const FREE_DELIVERY_FROM = 2000
export const DELIVERY_FEE = 150
export const PROMO_CODE = 'DONUT10'

export const CURATED = [
  { id: 'sunrise', name: 'Sunrise Mix', size: 6, picks: { 'lemon-pearl': 2, 'orange-zest': 2, 'strawberry-rush': 2 }, blurb: 'Bright and fruity. Two each of lemon, orange and strawberry.' },
  { id: 'cocoa', name: 'Cocoa and Caramel', size: 6, picks: { 'choco-dream': 3, 'caramel-crunch': 3 }, blurb: 'For people who want it rich. Three chocolate, three caramel.' },
  { id: 'garden', name: 'Garden Party', size: 12, picks: { 'pistachio-zig': 3, 'lavender-honey': 3, 'blueberry-sky': 3, 'vanilla-cloud': 3 }, blurb: 'A dozen for sharing. Pistachio, lavender, blueberry and vanilla.' },
]

export const TESTIMONIALS = [
  { text: 'The pistachio one with the chocolate zigzag was gone before I got it home.', who: 'Ayesha K.', donut: 'pistachio-zig' },
  { text: 'Ordered a dozen for the office. Every box arrived on time and nobody argued about flavours.', who: 'Hamza R.', donut: 'blueberry-sky' },
  { text: 'Lemon Pearl is tangy in exactly the right way. My kids call it the sunshine donut.', who: 'Maryam S.', donut: 'lemon-pearl' },
]

export const BRANCHES = [
  { name: 'City Centre', addr: '12 Market Street, City Centre', hours: 'Daily, 8:00 am to 11:00 pm', phone: '0300 000 0001' },
  { name: 'Campus Branch', addr: 'Gate 2 Road, University Campus', hours: 'Monday to Saturday, 8:00 am to 9:00 pm', phone: '0300 000 0002' },
  { name: 'Airport Road', addr: 'Plot 48, Airport Road', hours: 'Daily, 7:00 am to 12:00 am', phone: '0300 000 0003' },
]

export const FAQ = [
  ['When do you bake?', 'The dough proofs overnight. The first tray comes out at 6:00 am and we bake again every two hours until we sell out.'],
  ['Do you have vegan or nut-free options?', 'No. Our dough contains egg and milk, so nothing is vegan. Pistachio Zig contains tree nuts, and everything is made in a kitchen that handles nuts.'],
  ['How much is delivery?', `Delivery is ${rs(DELIVERY_FEE)} within about 5 km of a branch, and free above ${rs(FREE_DELIVERY_FROM)}. Pickup is always free.`],
  ['How do I pay?', 'You pay when the order arrives or when you collect it. We accept cash and card.'],
  ['Can I order for an event?', 'Yes. For 24 donuts or more, contact us at least a day ahead and we will plan the trays around your time.'],
  ['Can I change my order?', 'Until it goes into the oven, which is usually within a few minutes. Call your branch as soon as you can.'],
  ['How do I use a promo code?', `Type ${PROMO_CODE} into the promo box in your cart and press Apply. It takes 10% off your donuts.`],
  ['How long will a donut stay fresh?', 'They are best within eight hours. Keep them in the box at room temperature, not in the fridge.'],
]

export const STORY_TIMELINE = [
  ['4:30 am', 'Dough comes out of the fridge', 'It has been proofing overnight and is ready to be cut and shaped.'],
  ['6:00 am', 'First tray', 'Rings go into the fryer a few at a time so the oil stays hot.'],
  ['7:30 am', 'Glazing', 'Every glaze is made fresh. Sprinkles go on while it is still wet.'],
  ['9:00 am', 'Doors open', 'Orders go out as each tray finishes.'],
  ['All day', 'Small batches, again and again', 'We bake every two hours until we sell out.'],
]

/* box helpers */
export const flattenPicks = (picks) => Object.entries(picks).flatMap(([id, n]) => Array(n).fill(id))
export const boxLine = (size, picks, name) => ({
  key: 'b:' + size + ':' + Object.keys(picks).sort().map((k) => k + '=' + picks[k]).join(','),
  kind: 'box',
  name: name || `Box of ${size}`,
  price: BOX_PRICE[size],
  qty: 1,
  picks: { ...picks },
})
