// app/(pages)/filmes/[id]/ImageWithFallback.tsx
'use client';

import { useRef, useEffect } from "react";
import { Image } from "@nextui-org/react";

export default function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleError = () => {
      img.src = "https://placehold.co/600x800/cccccc/ffffff?text=Imagem+Indisponível";
    };

    img.addEventListener("error", handleError);
    return () => img.removeEventListener("error", handleError);
  }, []);

  return (
    <Image
      ref={imgRef}
      src={src}
      alt={alt}
      className="object-cover w-full h-64 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
      removeWrapper
      isZoomed
    />
  );
}
