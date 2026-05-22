export const HERO_IMAGES = {
  cafe: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80&auto=format&fit=crop',
  pour: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop',
  table: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop',
};

export const MAP_IMAGE =
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80&auto=format&fit=crop';

export const NEIGHBORHOOD_IMG =
  'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=200&q=80&auto=format&fit=crop';

export const IG_IMAGES = [
  'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400&q=80&auto=format&fit=crop',
];

export const IG_STATS = [
  { likes: 482,  comments: 12 },
  { likes: 1203, comments: 34 },
  { likes: 766,  comments: 21 },
  { likes: 304,  comments: 8  },
  { likes: 921,  comments: 19 },
  { likes: 588,  comments: 15 },
];

export const SCHEDULE = [
  { open: [7, 0]  as [number, number], close: [21, 0] as [number, number] }, // Mon
  { open: [7, 0]  as [number, number], close: [21, 0] as [number, number] }, // Tue
  { open: [7, 0]  as [number, number], close: [21, 0] as [number, number] }, // Wed
  { open: [7, 0]  as [number, number], close: [21, 0] as [number, number] }, // Thu
  { open: [7, 0]  as [number, number], close: [22, 0] as [number, number] }, // Fri
  { open: [8, 0]  as [number, number], close: [22, 0] as [number, number] }, // Sat
  { open: [8, 0]  as [number, number], close: [21, 0] as [number, number] }, // Sun
];

export function formatTime(hours: number, minutes: number): string {
  const period = hours >= 12 ? 'PM' : 'AM';
  const h = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  const m = minutes.toString().padStart(2, '0');
  return `${h}:${m} ${period}`;
}
