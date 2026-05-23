const ITEMS = [
  'Scissor cuts', 'Hot-towel shaves', 'Skin fades', 'Beard sculpting',
  'Straight razors', 'House old-fashioneds', 'Walk-ins welcome',
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {row.map((t, i) => (
          <span key={i} className="marquee__item">
            {t}<span className="marquee__star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
