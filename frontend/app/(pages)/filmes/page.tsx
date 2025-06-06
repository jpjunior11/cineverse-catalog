'use client';

import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
}

export default function FilmesListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=5a3fb7b720c82415c7f2b45ea698f71c&language=pt-BR&page=${page}`
        );
        if (!res.ok) throw new Error("Falha ao buscar filmes. Tente novamente mais tarde.");
        const data = await res.json();
        setMovies(data.results);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchMovies();
  }, [page]);

  if (error)
    return <p className="text-danger text-center mt-10">{error}</p>;

  const getPageCards = () => {
    let start = page <= totalPages - 4 ? page : totalPages - 4;
    if (start < 1) start = 1;
    return Array.from({ length: 5 }, (_, i) => start + i);
  };

  const pageCards = getPageCards();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white px-4 sm:px-8">
      <header className="py-8 text-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-wide">Cineverse Catalog</h1>
      </header>

      <main className="flex-grow space-y-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <Card key={index} className="space-y-5 p-4 bg-white/10 rounded-lg">
                <div className="h-40 rounded-lg bg-white/20 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-3 w-4/5 rounded-lg bg-white/30 animate-pulse"></div>
                  <div className="h-3 w-2/5 rounded-lg bg-white/30 animate-pulse"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                isPressable
                className="group bg-white/5 border border-white/10 rounded-lg hover:scale-[1.03] transition-transform"
              >
                <Link href={`/filmes/${movie.id}`} className="block">
                  <CardBody className="p-0 overflow-hidden rounded-t-lg">
                    <Image
                      alt={`Capa do filme ${movie.title}`}
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                          : "/no-image-available.png"
                      }
                      width={300}
                      height={450}
                      className="object-cover w-full h-auto"
                      loading="lazy"
                    />
                  </CardBody>
                  <CardFooter className="flex flex-col items-center justify-start pt-3 px-2 min-h-[100px]">
                    <h4 className="text-base font-semibold text-white text-center">{movie.title}</h4>
                    <Button
                      size="sm"
                      color="default"
                      variant="bordered"
                      className="mt-2 text-white border-white"
                    >
                      Ver Detalhes
                    </Button>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2 py-8 select-none">
          {page > 1 && (
            <Card
              isPressable
              className="w-14 h-8 flex items-center justify-center cursor-pointer bg-white text-black text-xs font-semibold rounded"
              onClick={() => setPage(1)}
            >
              1ª
            </Card>
          )}

          {pageCards.map((p) => (
            <Card
              key={p}
              isPressable
              className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded text-xs border ${
                page === p
                  ? "bg-white text-black font-bold border-black"
                  : "bg-black text-white border-white"
              }`}
              onClick={() => setPage(p)}
            >
              {p}
            </Card>
          ))}
          {page < totalPages && (
            <Card
              isPressable
              className="w-14 h-8 flex items-center justify-center cursor-pointer bg-white text-black text-xs font-semibold rounded"
              onClick={() => setPage(totalPages)}
            >
              Últ.
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
