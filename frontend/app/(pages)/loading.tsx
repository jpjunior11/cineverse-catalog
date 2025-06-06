import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] gap-4 text-center px-4">
      <Spinner size="lg" color="primary" />
      <p className="text-primary font-medium text-lg animate-pulse">
        Carregando conteúdo...
      </p>
    </div>
  );
}
