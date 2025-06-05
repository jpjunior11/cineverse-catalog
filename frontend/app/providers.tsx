// app/providers.tsx
'use client'; // Necessário para o provedor do NextUI

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation'; // Correção: usar next/navigation

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      {children}
    </NextUIProvider>
  );
}