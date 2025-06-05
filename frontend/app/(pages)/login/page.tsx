// frontend\app\(pages)\login\page.tsx
'use client';

import { Input, Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === "admin@gmail.com" && password === "admin12-") {
      setMessage("Login simulado com sucesso! Redirecionando...");
      
      setTimeout(() => {
        router.push('/');
      }, 1500);

    } else {
      setMessage("Email ou senha inválidos (simulação).");
      setIsLoading(false);
    }
  };

  return (
    <>
      <title>Login | Cineverse Catalog</title>

      <div className="flex justify-center items-center min-h-[calc(100vh-250px)]">
        <Card className="w-full max-w-md p-6">
          <CardHeader className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-sm text-gray-400">Acesse sua conta Cineverse</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                isRequired
                type="email"
                label="Email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="bordered"
                fullWidth
                isDisabled={isLoading && message.includes("sucesso")}
              />
              <Input
                isRequired
                type="password"
                label="Senha"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="bordered"
                fullWidth
                isDisabled={isLoading && message.includes("sucesso")}
              />
              <Button
                type="submit"
                color="primary"
                isLoading={isLoading}
                fullWidth
                size="lg"
                isDisabled={isLoading && message.includes("sucesso")}
              >
                {isLoading ? (message.includes("sucesso") ? "Redirecionando..." : "Entrando...") : "Entrar"}
              </Button>
              {message && <p className={`mt-4 text-center text-sm ${message.includes("sucesso") ? "text-green-500" : "text-red-500"}`}>{message}</p>}
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}