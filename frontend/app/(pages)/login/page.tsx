// Marcar como Client Component para interatividade (mesmo que simulada)
'use client';

import { Input, Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from 'next/navigation'; // 1. Importe o useRouter

// Metadata e comentários sobre ela permanecem os mesmos...

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter(); // 2. Inicialize o router

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Simulação de chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000)); // Diminuí um pouco o delay para o teste

    if (email === "admin@gmail.com" && password === "admin12-") { // Suas credenciais de teste
      setMessage("Login simulado com sucesso! Redirecionando...");
      
      // 3. Redirecionar após um pequeno delay para o usuário ver a mensagem
      setTimeout(() => {
        router.push('/'); // Redireciona para a página inicial (que lista os filmes)
      }, 1500); // Espera 1.5 segundos antes de redirecionar

    } else {
      setMessage("Email ou senha inválidos (simulação).");
      setIsLoading(false); // Certifique-se de parar o loading em caso de falha
    }
    // Não defina setIsLoading(false) aqui se o redirecionamento for ocorrer,
    // pois a página será desmontada. Apenas se o login falhar.
  };

  return (
    <>
      {/* Hack para definir o título da página em Client Component usando App Router */}
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
                isDisabled={isLoading && message.includes("sucesso")} // Desabilita input após sucesso
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
                isDisabled={isLoading && message.includes("sucesso")} // Desabilita input após sucesso
              />
              <Button
                type="submit"
                color="primary"
                isLoading={isLoading}
                fullWidth
                size="lg"
                isDisabled={isLoading && message.includes("sucesso")} // Desabilita botão após sucesso
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