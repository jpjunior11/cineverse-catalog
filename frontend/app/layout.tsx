// frontend/app/layout.tsx
'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as NextUILink, Button,
  NavbarMenuToggle, NavbarMenu, NavbarMenuItem
} from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClientMounted, setIsClientMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsClientMounted(true);
    setIsLoggedIn(!!sessionStorage.getItem('simulatedLogin'));
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('simulatedLogin');
      setIsLoggedIn(false);
      window.location.href = '/'; 
    }
  };
  
  const isLoginPage = pathname === '/';

  const menuItems = [
    { label: "Catálogo", href: "/filmes", show: (isClientMounted && isLoggedIn) },
  ];

  return (
    <html lang="pt-BR" className='dark'>
      <head>
        <title>Cineverse Catalog</title>
        <meta name="description" content="Explore um universo de filmes e séries." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-background text-foreground`}>
        <Providers>
          <Navbar onMenuOpenChange={setIsMenuOpen} isBordered isMenuOpen={isMenuOpen}>
            <NavbarContent>
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
              />
              <NavbarBrand>
                <NextUILink href={(isClientMounted && isLoggedIn) ? "/filmes" : "/"} className="font-bold text-inherit text-2xl">
                  Cineverse
                </NextUILink>
              </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              {(isClientMounted && isLoggedIn) && (
                <NavbarItem isActive={pathname === "/filmes"}>
                  <NextUILink 
                    color={pathname === "/filmes" ? "primary" : "foreground"} 
                    href="/filmes" 
                    aria-current={pathname === "/filmes" ? "page" : undefined}
                  >
                    Catálogo
                  </NextUILink>
                </NavbarItem>
              )}
            </NavbarContent>

            <NavbarContent justify="end">
              {(isClientMounted && !isLoginPage && !isLoggedIn) && (
                <NavbarItem>
                  <Button as={NextUILink} color="primary" href="/" variant="flat">
                    Login
                  </Button>
                </NavbarItem>
              )}
              {(isClientMounted && isLoggedIn) && (
                 <NavbarItem>
                  <Button onClick={handleLogout} color="danger" variant="flat">
                    Logout
                  </Button>
                </NavbarItem>
              )}
            </NavbarContent>

            <NavbarMenu>
              {menuItems.map((item, index) => (
                item.show && (
                  <NavbarMenuItem key={`${item.label}-${index}`} isActive={pathname === item.href}>
                    <NextUILink
                      color={pathname === item.href ? "primary" : "foreground"}
                      className="w-full"
                      href={item.href}
                      size="lg"
                      aria-current={pathname === item.href ? "page" : undefined}
                      onPress={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </NextUILink>
                  </NavbarMenuItem>
                )
              ))}
              {(isClientMounted && !isLoggedIn) && (
                <NavbarMenuItem>
                   <Button 
                      as={NextUILink} 
                      color="primary" 
                      href="/" 
                      variant="ghost" 
                      className="w-full" 
                      onPress={() => setIsMenuOpen(false)}
                    >
                    Login
                  </Button>
                </NavbarMenuItem>
              )}
            </NavbarMenu>
          </Navbar>

          <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-grow py-8">
            {children}
          </main>

          <footer className="w-full flex items-center justify-center py-6 border-t border-divider">
            <p className="text-sm text-foreground-500">
              © {new Date().getFullYear()} Cineverse Catalog. Todos os direitos reservados.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}