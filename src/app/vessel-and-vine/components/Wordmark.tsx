'use client';
import Link from 'next/link';

interface WordmarkProps {
  size?: number;
  href?: string;
  color?: string;
}

export default function Wordmark({ size = 22, href = '/vessel-and-vine', color = 'var(--ink)' }: WordmarkProps) {
  return (
    <Link href={href} style={{
      textDecoration: 'none',
      color,
      fontFamily: 'var(--serif)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: size,
      letterSpacing: '-0.01em',
      lineHeight: 1,
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 2,
    }}>
      <span>Vessel</span>
      <span style={{
        fontStyle: 'normal',
        fontFamily: 'var(--sans)',
        fontSize: size * 0.6,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: color === 'var(--ink)' ? 'var(--muted)' : 'rgba(245,240,232,0.7)',
        margin: '0 4px',
      }}>&amp;</span>
      <span>Vine</span>
    </Link>
  );
}
