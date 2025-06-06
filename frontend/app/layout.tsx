'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/';

  return (
    <html lang="pt-BR" className="dark">
      <head>
        <title>Cineverse Catalog</title>
        <meta name="description" content="Explore um universo de filmes e séries." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} bg-background text-foreground`}>
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <main
              key={pathname}
              className="flex-grow"
            >
              {children}
            </main>

            {!isLoginPage && (
              <footer className="w-full flex items-center justify-center py-6 border-t border-divider">
                <p className="text-sm text-foreground-500">
                  © {new Date().getFullYear()} Cineverse Catalog. Todos os direitos reservados.
                </p>
              </footer>
            )}
          </div>
        </Providers>
      </body>
    </html>
  );
}
