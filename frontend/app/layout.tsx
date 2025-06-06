'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as NextUILink, Button,
  NavbarMenuToggle, NavbarMenu, NavbarMenuItem
} from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoginPage = pathname === '/';

  const menuItems = [
    { label: "Catálogo", href: "/filmes" }
  ];

  const handleLogout = () => {
    window.location.href = '/';
  };

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
            <motion.main
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-grow"
            >
              {children}
            </motion.main>

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
