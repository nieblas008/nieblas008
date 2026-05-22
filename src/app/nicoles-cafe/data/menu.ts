export type MenuCategory = 'drinks' | 'food' | 'pastries';

export interface MenuItem {
  cat: MenuCategory;
  name: { en: string; es: string };
  price: string;
  img: string;
  desc: { en: string; es: string };
  tag?: string;
}

export const MENU: MenuItem[] = [
  // drinks
  {
    cat: 'drinks',
    name: { en: 'Café de Olla', es: 'Café de Olla' },
    price: '$5',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&auto=format&fit=crop',
    desc: {
      en: 'House roast brewed with cinnamon, piloncillo & orange peel.',
      es: 'Café de la casa con canela, piloncillo y cáscara de naranja.',
    },
    tag: 'Signature',
  },
  {
    cat: 'drinks',
    name: { en: 'Cortado', es: 'Cortado' },
    price: '$4.50',
    img: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&q=80&auto=format&fit=crop',
    desc: {
      en: 'Double espresso cut with warm whole milk.',
      es: 'Doble espresso cortado con leche entera caliente.',
    },
  },
  {
    cat: 'drinks',
    name: { en: 'Horchata Latte', es: 'Latte de Horchata' },
    price: '$6',
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80&auto=format&fit=crop',
    desc: {
      en: 'Espresso, rice-almond horchata, cinnamon.',
      es: 'Espresso, horchata de arroz y almendra, canela.',
    },
  },
  {
    cat: 'drinks',
    name: { en: 'Agua de Jamaica', es: 'Agua de Jamaica' },
    price: '$4',
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&auto=format&fit=crop',
    desc: {
      en: 'Hibiscus tea, lightly sweetened, served cold.',
      es: 'Té de flor de jamaica, poco dulce, bien frío.',
    },
    tag: 'Cold',
  },
  // food
  {
    cat: 'food',
    name: { en: 'Huevos Divorciados', es: 'Huevos Divorciados' },
    price: '$14',
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80&auto=format&fit=crop',
    desc: {
      en: 'Two eggs on tortillas — one in salsa roja, one in verde, refried beans.',
      es: 'Dos huevos sobre tortilla — uno en roja, otro en verde, frijoles refritos.',
    },
    tag: 'Brunch',
  },
  {
    cat: 'food',
    name: { en: 'Avocado Toast', es: 'Pan con Aguacate' },
    price: '$12',
    img: 'https://images.unsplash.com/photo-1603046891744-1f76eb10aebd?w=600&q=80&auto=format&fit=crop',
    desc: {
      en: 'Sourdough, smashed avocado, queso fresco, chile crisp.',
      es: 'Pan de masa madre, aguacate, queso fresco, chile crujiente.',
    },
  },
  {
    cat: 'food',
    name: { en: 'Mole Chicken Sandwich', es: 'Sándwich de Mole' },
    price: '$15',
    img: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=600&q=80&auto=format&fit=crop',
    desc: {
      en: 'Slow-braised chicken in mole poblano, brioche, pickled onion.',
      es: 'Pollo en mole poblano, pan brioche, cebolla encurtida.',
    },
  },
  {
    cat: 'food',
    name: { en: 'Quinoa Bowl', es: 'Bowl de Quinoa' },
    price: '$13',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80&auto=format&fit=crop',
    desc: {
      en: 'Roasted vegetables, black beans, avocado, lime-cilantro dressing.',
      es: 'Verduras al horno, frijoles negros, aguacate, vinagreta de cilantro.',
    },
    tag: 'V',
  },
  // pastries
  {
    cat: 'pastries',
    name: { en: 'Concha', es: 'Concha' },
    price: '$3.50',
    img: 'https://images.unsplash.com/photo-1568827999250-3f6afff96e66?w=600&q=80&auto=format&fit=crop',
    desc: {
      en: 'Sweet bread with a shell-patterned vanilla crust.',
      es: 'Pan dulce con costra de vainilla.',
    },
    tag: 'Daily',
  },
  {
    cat: 'pastries',
    name: { en: 'Almond Croissant', es: 'Croissant de Almendra' },
    price: '$5',
    img: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=600&q=80&auto=format&fit=crop',
    desc: {
      en: 'Buttery croissant filled with frangipane, toasted almonds.',
      es: 'Croissant relleno de frangipán, almendras tostadas.',
    },
  },
  {
    cat: 'pastries',
    name: { en: 'Tres Leches', es: 'Pastel Tres Leches' },
    price: '$7',
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80&auto=format&fit=crop',
    desc: {
      en: 'Sponge cake soaked in three milks, cinnamon cream.',
      es: 'Bizcocho remojado en tres leches, crema de canela.',
    },
  },
  {
    cat: 'pastries',
    name: { en: 'Pan de Elote', es: 'Pan de Elote' },
    price: '$4',
    img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=80&auto=format&fit=crop',
    desc: {
      en: 'Sweet corn bread, served warm with butter.',
      es: 'Pan de elote dulce, servido tibio con mantequilla.',
    },
  },
];
