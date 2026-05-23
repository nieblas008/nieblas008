'use client';
import React from 'react';

interface ProductImageProps {
  tone?: string;
  tag?: string;
  ratio?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
  src?: string;
  alt?: string;
  focus?: string;
  eager?: boolean;
}

export default function ProductImage({
  tone = 'linen',
  tag,
  ratio = '4 / 5',
  style,
  children,
  className = '',
  src,
  alt = '',
  focus = 'center',
  eager = false,
}: ProductImageProps) {
  return (
    <div
      className={`vv-img vv-img--${tone} ${src ? 'vv-img--photo' : ''} ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          referrerPolicy="no-referrer-when-downgrade"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: focus,
            display: 'block',
          }}
        />
      )}
      {tag && !src && <span className="vv-img__tag">{tag}</span>}
      {children}
    </div>
  );
}
