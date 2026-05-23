export const uns = (id: string, w = 900): string =>
  `https://plus.unsplash.com/premium_photo-${id}?fm=jpg&q=80&w=${w}&auto=format&fit=crop`;

// Regular (non-premium) Unsplash photos — same params, different CDN subdomain
export const uph = (id: string, w = 900): string =>
  `https://images.unsplash.com/photo-${id}?fm=jpg&q=80&w=${w}&auto=format&fit=crop`;

export interface Product {
  id: string;
  name: string;
  sub: string;
  price: number;
  tone: string;
  img?: string;
  gallery?: string[];
  desc: string;
  materials?: string;
  care?: string;
  dimensions?: string;
  maker?: string;
  tag: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'linen-vase',
    name: 'Linen Vessel',
    sub: 'Hand-thrown stoneware',
    price: 92,
    tone: 'linen',
    img: uns('1757392183629-04b10718d68e'),
    gallery: [
      uns('1757392183629-04b10718d68e', 1400),
      uns('1668704252685-dba2ba091f8f', 1400),
      uns('1668704252691-91bd9451655f', 1400),
      uns('1668704252697-ca17f98516eb', 1400),
    ],
    desc: 'A wide-mouthed stoneware vase finished in raw, unglazed clay. Each piece carries the slight asymmetry of the hand — no two are alike.',
    materials: 'Unglazed stoneware, fired to 1240°C. Watertight interior.',
    care: 'Wipe clean with a damp cloth. Avoid harsh detergents.',
    dimensions: 'H 24 cm · W 18 cm · 1.1 kg',
    maker: 'Studio Asari, Kyoto',
    tag: 'stoneware',
  },
  {
    id: 'dune-bowl',
    name: 'Dune Bowl',
    sub: 'Wheel-thrown porcelain',
    price: 58,
    tone: 'bone',
    img: uns('1668704252691-91bd9451655f'),
    desc: 'A shallow porcelain bowl with a soft sand glaze. Made for slow breakfasts and quiet rooms.',
    materials: 'Porcelain with matte sand glaze.',
    care: 'Dishwasher safe on a gentle cycle. Not microwave safe.',
    dimensions: 'H 6 cm · W 22 cm · 480 g',
    maker: 'Anneli Berg, Gothenburg',
    tag: 'porcelain',
  },
  {
    id: 'quarry-planter',
    name: 'Quarry Planter',
    sub: 'Carved terracotta',
    price: 124,
    tone: 'clay',
    img: uns('1668704252697-ca17f98516eb'),
    desc: 'Hand-carved terracotta planter with a single drainage hole and an unfinished base. Designed to develop a soft patina over time.',
    materials: 'Natural terracotta, water-sealed interior.',
    care: 'Place on a saucer. Patina will deepen with use.',
    dimensions: 'H 28 cm · W 26 cm · 2.4 kg',
    maker: 'Forma Studio, Oaxaca',
    tag: 'terracotta',
  },
  {
    id: 'hollow-vessel',
    name: 'Hollow Vessel No. 4',
    sub: 'Black stoneware',
    price: 168,
    tone: 'shadow',
    img: uns('1668704252706-69734ac9817c'),
    desc: 'A sculptural vessel finished in a deep iron-rich black. Numbered as part of a limited series of twelve.',
    materials: 'Black stoneware with satin matte finish.',
    care: 'Decorative — not food safe. Dust gently.',
    dimensions: 'H 32 cm · W 20 cm · 1.8 kg',
    maker: 'Studio Asari, Kyoto',
    tag: 'limited',
  },
  {
    id: 'field-plate',
    name: 'Field Plate (Set of 2)',
    sub: 'Hand-glazed earthenware',
    price: 78,
    tone: 'sage',
    img: uns('1668704252693-961ef8122b38'),
    desc: 'Pair of dinner plates in a soft moss glaze. The surface is intentionally uneven, catching the light differently with every meal.',
    materials: 'Earthenware with food-safe matte glaze.',
    care: 'Dishwasher safe. Not microwave safe.',
    dimensions: 'W 26 cm each · 620 g',
    maker: 'Anneli Berg, Gothenburg',
    tag: 'set of 2',
  },
  {
    id: 'tide-pitcher',
    name: 'Tide Pitcher',
    sub: 'Slipcast stoneware',
    price: 96,
    tone: 'dusk',
    img: uns('1668704252687-173716305688'),
    desc: 'A balanced pitcher with a wide handle and a long, narrow spout. For water, milk, or a single tall stem.',
    materials: 'Slipcast stoneware, matte glaze.',
    care: 'Hand wash. Watertight.',
    dimensions: 'H 22 cm · W 16 cm · 880 g',
    maker: 'Forma Studio, Oaxaca',
    tag: 'stoneware',
  },
];

export const PLANTS: Product[] = [
  {
    id: 'monstera',
    name: 'Monstera Deliciosa',
    sub: 'Mature, 90 cm',
    price: 145,
    tone: 'moss',
    img: uns('1665408511179-237ccb828a69'),  // verified: monstera plant in pot
    desc: 'A well-rooted specimen with split, mature leaves. Delivered in a nursery pot, ready to repot.',
    tag: 'live plant',
  },
  {
    id: 'hoya',
    name: "Hoya Carnosa 'Krimson'",
    sub: 'Trailing, 60 cm',
    price: 38,
    tone: 'sage',
    img: uns('1675342786681-e33a19414cfd'),  // verified: hoya plant
    desc: 'Variegated trailing vines with waxy, pink-tipped leaves. Easy in bright, indirect light.',
    tag: 'trailing',
  },
  {
    id: 'pilea',
    name: 'Pilea Peperomioides',
    sub: 'Established, 30 cm',
    price: 24,
    tone: 'moss',
    img: uns('1674237276501-595398f90f87'),  // verified: pilea / round-leaf potted plant
    desc: 'Pancake-shaped leaves on slender stems. A forgiving favourite for sunlit shelves.',
    tag: 'starter',
  },
  {
    id: 'fern',
    name: "Bird's Nest Fern",
    sub: 'Lush, 40 cm',
    price: 32,
    tone: 'sage',
    img: uns('1673468196475-6ff05c0d2910'),  // verified: indoor fern
    desc: 'Wavy fronds in a tight rosette. Thrives in steamy bathrooms and shaded corners.',
    tag: 'low light',
  },
];

export const LOOKBOOK = [
  { tone: 'linen',  tag: 'shelf · 03',    span: 'wide', img: uns('1668704252685-dba2ba091f8f', 1600) },
  { tone: 'sage',   tag: 'studio · 11',   span: 'tall', img: uns('1668704252740-babcf0bfaf00', 1200) },
  { tone: 'clay',   tag: 'morning · 07',  span: 'tall', img: uns('1668704252697-ca17f98516eb', 1200) },
  { tone: 'bone',   tag: 'still · 02',    span: 'wide', img: uns('1668704252729-1a39e4ad8b32', 1400) },
  { tone: 'shadow', tag: 'interior · 04', span: '',     img: uns('1668704252909-dc78933fbc15', 1000) },
  { tone: 'dusk',   tag: 'window · 09',   span: '',     img: uns('1668704252726-452ce872b349', 1000) },
  { tone: 'moss',   tag: 'garden · 06',   span: 'wide', img: uph('1438109382753-8368e7e1e7cf', 1400) }, // plant: person holding green plant
  { tone: 'linen',  tag: 'table · 12',    span: '',     img: uns('1668704252706-69734ac9817c', 1000) },
];

export const INSTAGRAM = [
  { tone: 'linen',  tag: '@clancy_reimagined', img: uns('1668704252691-91bd9451655f', 700) },  // ceramic
  { tone: 'sage',   tag: 'new arrivals',       img: uph('1444392061186-9fc38f84f726', 700) },  // plant: flowering garden
  { tone: 'clay',   tag: 'studio visit',       img: uns('1668704252726-452ce872b349', 700) },  // ceramic
  { tone: 'dusk',   tag: 'behind the wheel',   img: uns('1668704252740-babcf0bfaf00', 700) },  // ceramic
  { tone: 'bone',   tag: 'morning light',      img: uns('1668704252693-961ef8122b38', 700) },  // ceramic
  { tone: 'moss',   tag: 'garden notes',       img: uph('1525498128493-380d1990a112', 700) },  // plant: lush green leaves
];

export const HERO_IMG  = uns('1668704252685-dba2ba091f8f', 1400);
export const STORY_IMG = uns('1668704252697-ca17f98516eb', 1200);

export function getProductBySlug(slug: string): Product | undefined {
  return [...PRODUCTS, ...PLANTS].find((p) => p.id === slug);
}
