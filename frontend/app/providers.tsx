'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider
      navigate={(to) => router.push(to)}
    >
      {children}
    </NextUIProvider>
  );
}
