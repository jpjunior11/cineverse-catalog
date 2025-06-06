'use client';

import { Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/filmes');
  };

  return (
    <>
      <title>Cineverse Catalog</title>
      <div className="flex flex-col justify-between min-h-screen bg-black text-white">
        <motion.div
          className="flex justify-center items-center flex-grow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="w-full max-w-md p-6 bg-white/10 border border-white/10 backdrop-blur-md shadow-xl text-white">
            <CardHeader className="flex flex-col items-center">
              <motion.h1
                className="text-4xl font-bold uppercase tracking-wide text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Bem-vindo ao Cineverse!
              </motion.h1>
              <motion.p
                className="text-sm text-gray-300 mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Explore o catálogo de filmes populares.
              </motion.p>
            </CardHeader>
            <CardBody className="flex justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="w-full"
              >
                <Button
                  onClick={handleEnter}
                  className="bg-white text-black font-bold uppercase mt-4"
                  fullWidth
                  size="lg"
                >
                  Explorar Filmes
                </Button>
              </motion.div>
            </CardBody>
          </Card>
        </motion.div>

        <footer className="w-full text-center py-6 border-t border-white/10 text-white text-sm">
          © {new Date().getFullYear()} Cineverse Catalog. Todos os direitos reservados.
        </footer>
      </div>
    </>
  );
}
