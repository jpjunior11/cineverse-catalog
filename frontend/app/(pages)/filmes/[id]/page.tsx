// frontend\app\(pages)\filmes\[id]\page.tsx
import { Card, Chip, Button, Divider } from "@nextui-org/react";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";

interface MoviePost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

interface GenerateMetadataProps {
  params: Promise<{ id: string }>;
}

async function getMovie(id: string): Promise<MoviePost> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    if (res.status === 404) throw new Error(`Filme com ID ${id} não encontrado.`);
    throw new Error(`Falha ao buscar detalhes do filme ${id}`);
  }
  return res.json();
}

export async function generateMetadata(
  { params }: GenerateMetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie = await getMovie(id);
    return {
      title: movie.title,
      description: movie.body.substring(0, 160),
    };
  } catch {
    return {
      title: "Filme Não Encontrado",
      description: "Este filme não pôde ser encontrado em nosso catálogo.",
    };
  }
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovie(id);

  return (
    <>
    <title>Cineverse Catalog</title>

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <Button
          as={Link}
          href="/filmes"
          color="primary"
          variant="ghost"
          startContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          }
          className="self-start"
        >
          Voltar ao Catálogo
        </Button>

        <Card shadow="lg" className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 lg:w-2/5 xl:w-1/3">
              <ImageWithFallback
                src={`https://picsum.photos/seed/${movie.id}/600/800`}
                alt={`Capa do filme ${movie.title}`}
              />
            </div>
            <div className="p-6 md:p-8 flex-1 space-y-4">
              <div className="space-y-2">
                <Chip color="secondary" variant="bordered" size="sm">
                  Filme ID: {movie.id}
                </Chip>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-foreground">{movie.title}</h1>
                <div className="text-md text-foreground-500">
                  Postado pelo Usuário ID: <Chip size="sm" variant="flat">{movie.userId}</Chip>
                </div>
              </div>
              <Divider className="my-4" />
              <div>
                <h2 className="text-2xl font-semibold text-foreground-800 mb-3">Sinopse / Conteúdo</h2>
                <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground-600 leading-relaxed">
                  <p>{movie.body}</p>
                </article>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </> 
  );
}
