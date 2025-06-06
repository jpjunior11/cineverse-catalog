'use client';

import { useEffect } from 'react';
import { Button } from '@nextui-org/react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-center"
      role="alert"
      aria-live="assertive"
    >
      <h2 className="text-2xl font-semibold mb-4">Algo deu errado!</h2>
      <p className="mb-4">{error.message || "Não foi possível carregar o conteúdo."}</p>
      <Button
        color="danger"
        variant="ghost"
        onClick={() => reset()}
      >
        Tentar Novamente
      </Button>
    </div>
  );
}
