'use client'; // Error components must be Client Components

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
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-center">
      <h2 className="text-2xl font-semibold mb-4">Algo deu errado!</h2>
      <p className="mb-4">{error.message || "Não foi possível carregar o conteúdo."}</p>
      <Button
        color="danger"
        variant="ghost"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Tentar Novamente
      </Button>
    </div>
  );
}