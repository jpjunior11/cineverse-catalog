'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);
  const fallbackSrc = "https://placehold.co/600x800/cccccc/ffffff?text=Imagem+Indisponível";

  return (
    <Image
      src={hasError ? fallbackSrc : src}
      alt={alt}
      width={600}
      height={800}
      className="object-cover w-full h-64 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}
