import Image from 'next/image';
import React from 'react';

/**
 * Spark Studios Logo Component
 * Usage: <Logo className="w-40 h-auto" />
 */
const Logo: React.FC<{ className?: string; alt?: string }> = ({ className = '', alt = 'Spark Studios Logo' }) => (
  <span className={className} style={{ display: 'inline-block', lineHeight: 0 }}>
    {/* Prefer SVG for crispness, fallback to PNG if needed */}
    <picture>
      <source srcSet="/sparkstudios-logo.svg" type="image/svg+xml" />
      <Image src="/sparkstudios-logo.png" alt={alt} width={240} height={60} priority />
    </picture>
  </span>
);

export default Logo;
