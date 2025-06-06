import { Chip, Button, Divider } from "@nextui-org/react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";


interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

interface PageProps {
  params: { id: string };
}

async function getMovie(id: string): Promise<Movie> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5a3fb7b720c82415c7f2b45ea698f71c&language=pt-BR`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    if (res.status === 404) throw new Error(`Filme com ID ${id} não encontrado.`);
    throw new Error(`Falha ao buscar detalhes do filme ${id}`);
  }
  return res.json();
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = (await params).id;
  try {
    const movie = await getMovie(id);
    return {
      title: `${movie.title} | Cineverse Catalog`,
      description: movie.overview.substring(0, 160),
    };
  } catch {
    return {
      title: "Filme Não Encontrado",
      description: "Este filme não pôde ser encontrado em nosso catálogo.",
    };
  }
}

export default async function MovieDetailPage({ params }: PageProps) {
  const id = (await params).id;
  const movie = await getMovie(id);

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className="relative w-full">
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        {movie.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={`Cena do filme ${movie.title}`}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gray-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />

        <div className="absolute top-4 left-4 z-30 bg-black bg-opacity-60 rounded-md px-3 py-1.5 shadow-lg flex items-center gap-2">
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
          <Link href="/filmes" className="text-white font-medium select-none">
            Voltar ao Catálogo
          </Link>
        </div>

      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-52 pb-12 md:pb-20">
        <div className="md:flex md:items-end md:gap-8">
          <div className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-[240px] mx-auto md:mx-0">
            <Image
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-image-available.png'}
              alt={`Capa do filme ${movie.title}`}
              width={500}
              height={750}
              className="rounded-lg shadow-2xl"
            />
          </div>

          <div className="mt-6 md:mt-0 text-center md:text-left space-y-3 max-w-full">
            <h1
              className="text-3xl lg:text-5xl font-bold tracking-tight text-white break-words max-w-full"
              style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
            >
              {movie.title}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-4 text-foreground-400 font-medium flex-wrap">
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{movie.vote_average.toFixed(1)} / 10</span>
              </div>
              <span>{releaseYear}</span>
            </div>
            <div className="flex gap-2 justify-center md:justify-start flex-wrap">
              {movie.genres.map((genre) => (
                <Chip key={genre.id} color="secondary" variant="flat">
                  {genre.name}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Sinopse</h2>
            <p className="text-foreground-400 leading-relaxed">
              {movie.overview || "Sinopse não disponível em português."}
            </p>
          </div>
          <Divider className="my-6" />
        </div>
      </div>
    </div>
  );
}
