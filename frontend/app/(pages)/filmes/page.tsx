// frontend/app/(pages)/filmes/page.tsx
import { Link as NextUILink, Card, CardHeader, CardBody, CardFooter, Image, Button, Chip } from "@nextui-org/react";
import type { Metadata } from 'next';

interface MoviePost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getMovies(): Promise<MoviePost[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12', {
    next: { revalidate: 3600 }
  });
  if (!res.ok) {
    throw new Error('Falha ao buscar os filmes da API');
  }
  return res.json();
}

export const metadata: Metadata = {
  title: 'Catálogo | Cineverse Catalog',
  description: 'Descubra os filmes e séries mais recentes e populares em nosso catálogo.',
};

export default async function FilmesListPage() {
  const movies = await getMovies();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center tracking-tight">
        Nosso Catálogo
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {movies.map((movie) => (
          <Card 
            shadow="md"
            key={movie.id} 
            isPressable 
            as={NextUILink}
            href={`/filmes/${movie.id}`}
            className="hover:scale-105 transition-transform duration-200 ease-in-out group"
          >
            <CardHeader className="flex-col items-start px-4 pt-3 pb-1">
              <Chip size="sm" color="secondary" variant="flat" className="mb-1 self-start">FILME</Chip>
              <h4 className="font-bold text-lg leading-tight truncate group-hover:text-primary transition-colors">
                {movie.title}
              </h4>
              <small className="text-xs text-foreground-500">User ID: {movie.userId}</small>
            </CardHeader>
            <CardBody className="overflow-visible p-0 relative">
              <Image
                alt={`Capa do filme ${movie.title}`}
                className="object-cover rounded-none w-full h-[200px] sm:h-[250px]"
                src={`https://picsum.photos/seed/${movie.id}/400/300`}
              />
            </CardBody>
            <CardFooter className="flex-col items-start p-4 space-y-2">
              <p className="text-sm text-foreground-600 line-clamp-3">
                {movie.body}
              </p>
              
              <Button 
                color="primary" 
                size="sm" 
                variant="flat" 
                className="pointer-events-none mt-auto"
              >
                Ver Detalhes
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}