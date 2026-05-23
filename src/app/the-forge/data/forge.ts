export const SHOP = {
  name: 'The Forge',
  tagline: 'Sharp cuts. Straight razors. Stiff drinks.',
  sub: 'A barbershop for men who give a damn. Est. 2014 — West Loop, Chicago.',
  address: '812 N. Damen Ave, Chicago, IL 60622',
  phone: '+52 (664) 174 7593',
  phoneHref: 'tel:+526641747593',
  email: 'shop@theforgebarbers.com',
  instagram: '@clancy_reimagined',
  instagramUrl: 'https://instagram.com/clancy_reimagined',
} as const;

export const NAV = [
  { id: 'services', label: 'Services' },
  { id: 'team',     label: 'The Crew' },
  { id: 'gallery',  label: 'Work' },
  { id: 'book',     label: 'Book' },
  { id: 'contact',  label: 'Visit' },
] as const;

export type NavId = typeof NAV[number]['id'];

export const HOURS = [
  { day: 'Monday',    hrs: 'Closed',         closed: true  },
  { day: 'Tuesday',   hrs: '10:00 — 8:00',   closed: false },
  { day: 'Wednesday', hrs: '10:00 — 8:00',   closed: false },
  { day: 'Thursday',  hrs: '10:00 — 9:00',   closed: false },
  { day: 'Friday',    hrs: '9:00 — 9:00',    closed: false },
  { day: 'Saturday',  hrs: '8:00 — 7:00',    closed: false },
  { day: 'Sunday',    hrs: '9:00 — 4:00',    closed: false },
] as const;

export interface Service {
  id: string;
  name: string;
  sub: string;
  desc: string;
  price: number;
  duration: string;
  tag?: string;
}

export const SERVICES: Service[] = [
  {
    id: 'haircut',
    name: 'The Classic',
    sub: 'Scissor cut + style',
    desc: 'Consultation, hot-towel rinse, scissor work and finish. The cornerstone.',
    price: 45,
    duration: '45 min',
    tag: 'Most booked',
  },
  {
    id: 'fade',
    name: 'Skin Fade',
    sub: 'Clipper + razor finish',
    desc: 'Bald-skin taper or low/mid/high fade. Straight-razor cleanup at the neck and sideburns.',
    price: 55,
    duration: '45 min',
  },
  {
    id: 'beard',
    name: 'Beard Sculpt',
    sub: 'Trim, line, condition',
    desc: 'Shape and line your beard with shears and razor. Beard oil and hot-towel close.',
    price: 35,
    duration: '30 min',
  },
  {
    id: 'shave',
    name: 'Hot-Towel Shave',
    sub: 'Straight razor, two passes',
    desc: 'Pre-shave oil, hot lather, two full passes with a straight razor, cold-towel close. Forty-five minutes of quiet.',
    price: 65,
    duration: '45 min',
    tag: 'House signature',
  },
  {
    id: 'combo',
    name: 'Cut & Shave',
    sub: 'Classic cut + hot-towel shave',
    desc: 'The whole reset. Cut, shampoo, hot-towel shave, scalp tonic. Two hours, one chair.',
    price: 95,
    duration: '1h 30m',
  },
  {
    id: 'kid',
    name: 'Young Gentleman',
    sub: 'Age 12 and under',
    desc: 'Same cut, smaller chair. Booster and a root beer included.',
    price: 30,
    duration: '30 min',
  },
  {
    id: 'gray',
    name: 'Camouflage Color',
    sub: 'Gray blending',
    desc: 'Subtle, men\'s-formula color to soften gray without looking dyed.',
    price: 40,
    duration: '30 min',
  },
  {
    id: 'father',
    name: 'Father & Son',
    sub: 'Two classics, side by side',
    desc: 'Two cuts booked next to each other. Free root beer floats.',
    price: 70,
    duration: '1h',
  },
];

export interface TeamMember {
  name: string;
  role: string;
  years: number;
  spec: string;
  bio: string;
  tone: 1 | 2 | 3 | 4;
}

export const TEAM: TeamMember[] = [
  {
    name: 'Marcus Vela',
    role: 'Master Barber / Owner',
    years: 18,
    spec: 'Scissor work, classic pomp',
    bio: 'Opened The Forge in 2014 after eight years in Manhattan. Cuts with a comb, a pair of Hikari shears, and very little patience for hype.',
    tone: 1,
  },
  {
    name: 'Andre Whitfield',
    role: 'Senior Barber',
    years: 11,
    spec: 'Fades, sharp lineups',
    bio: 'Decade with the clippers. Best fade in Cook County, probably. Don\'t quote us.',
    tone: 2,
  },
  {
    name: 'Sal Romero',
    role: 'Straight-Razor Specialist',
    years: 14,
    spec: 'Hot-towel shaves',
    bio: 'Trained in Sicily, transplanted to Chicago. The man you book when you want to fall asleep in the chair.',
    tone: 3,
  },
  {
    name: 'Jay Park',
    role: 'Barber',
    years: 6,
    spec: 'Modern textures, beards',
    bio: 'Newest to the chair, oldest soul in the shop. Specialty: messy-on-purpose textured cuts and beard architecture.',
    tone: 4,
  },
];

export interface GalleryTile {
  tone: 1 | 2 | 3 | 4;
  tall: boolean;
  label: string;
  photo: string;
}

const UP = 'https://images.unsplash.com';
const Q = '?auto=format&fit=crop&w=640&q=80';

export const GALLERY: GalleryTile[] = [
  { tone: 1, tall: true,  label: 'Skin fade · Andre',         photo: `${UP}/photo-1503951914875-452162b0f3f1${Q}` },
  { tone: 2, tall: false, label: 'Classic pomp · Marcus',     photo: `${UP}/photo-1585747860715-2ba37e788b70${Q}` },
  { tone: 3, tall: false, label: 'Beard sculpt · Jay',        photo: `${UP}/photo-1599351431202-1e0f0137899a${Q}` },
  { tone: 4, tall: true,  label: 'Hot-towel shave · Sal',     photo: `${UP}/photo-1622286342621-4bd786c2447c${Q}` },
  { tone: 2, tall: false, label: 'Textured crop · Jay',       photo: `${UP}/photo-1621605815971-fbc98d665033${Q}` },
  { tone: 1, tall: true,  label: 'Low fade + beard',          photo: `${UP}/photo-1605497788044-5a32c7078486${Q}` },
  { tone: 3, tall: false, label: 'The Forge — West Loop',     photo: `${UP}/photo-1541336032412-2048a678540d${Q}` },
  { tone: 4, tall: false, label: 'Straight razor detail',     photo: `${UP}/photo-1580618672591-eb180b1a973f${Q}` },
  { tone: 2, tall: true,  label: 'Father & son',              photo: `${UP}/photo-1560179707-f14e90ef3623${Q}` },
  { tone: 1, tall: false, label: 'Mid-fade · Andre',          photo: `${UP}/photo-1516975080664-ed2fc6a32937${Q}` },
  { tone: 3, tall: false, label: 'Pomade closeup',            photo: `${UP}/photo-1604054094723-3a949e4a6d1e${Q}` },
  { tone: 4, tall: true,  label: 'Shop interior',             photo: `${UP}/photo-1596462502278-27bfdc403348${Q}` },
];

export interface Testimonial {
  quote: string;
  who: string;
  meta: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Best barbershop in the city. Marcus has been cutting my hair for six years and I won\'t sit in another chair.',
    who: 'Daniel R.',
    meta: 'Customer since 2019',
  },
  {
    quote: 'Walked in for a beard trim, walked out with the best shave of my life. Sal is the real deal.',
    who: 'Marcus T.',
    meta: '5★ Google review',
  },
  {
    quote: 'Old-school feel, modern skill. Andre\'s fades are unreal. Worth the trip from Evanston.',
    who: 'Andre J.',
    meta: 'Customer since 2021',
  },
];
