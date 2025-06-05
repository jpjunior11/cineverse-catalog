import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Spinner label="Carregando conteúdo..." color="primary" labelColor="primary" />
    </div>
  );
}