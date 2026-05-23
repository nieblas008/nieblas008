import type { ReactNode } from 'react';

interface Props {
  num: string;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  action?: ReactNode;
}

export default function SectionHead({ num, eyebrow, title, lede, action }: Props) {
  return (
    <div className="section-head">
      <div className="section-head__top">
        <div>
          <div className="eyebrow">{num} — {eyebrow}</div>
          <h2 className="h2" style={{ marginTop: 18 }}>{title}</h2>
        </div>
        {action}
      </div>
      {lede && <p className="lede" style={{ maxWidth: 700, margin: 0 }}>{lede}</p>}
    </div>
  );
}
