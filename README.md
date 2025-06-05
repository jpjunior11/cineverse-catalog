# Projeto: Cineverse Catalog com Next.js + NextUI

## Descrição
O Cineverse Catalog é uma aplicação web desenvolvida como parte de uma atividade prática, utilizando Next.js (com App Router) e TypeScript. O projeto simula um catálogo de filmes, onde os usuários podem visualizar uma listagem de "filmes" (obtidos da API pública JSONPlaceholder), acessar uma página de detalhes para cada filme e interagir com uma página de login simulada.

A aplicação demonstra conceitos modernos de desenvolvimento frontend, incluindo Server Components para consumo de API, estilização responsiva com Tailwind CSS e a biblioteca de componentes NextUI, além de seguir as melhores práticas de estrutura de projetos Next.js.

## Tecnologias Utilizadas
- **Next.js 15+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **NextUI**
- **JSONPlaceholder API** (para dados de filmes mockados)
- **Vercel** (para deploy)

## Funcionalidades Principais
- Página de Login simulada (rota raiz `/`).
- Listagem de Filmes (rota `/filmes`) com dados consumidos de uma API pública.
- Página de Detalhes de Filme dinâmica (rota `/filmes/[id]`).
- Layout persistente com navegação responsiva (incluindo menu mobile).
- Indicadores de carregamento (`loading.tsx`) e tratamento de erros (`error.tsx`).
- Geração de metadados para SEO.

## Como Rodar o Projeto Localmente

**Pré-requisitos:**
- Node.js (versão 18 ou superior)
- npm (ou yarn/pnpm)

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/jpjunior11/cineverse-catalog.git
    ```

2.  **Navegue até a pasta do frontend:**
    ```bash
    cd cineverse-catalog/frontend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Abra no navegador:**
    Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação em execução.

## Links
- **Deploy na Vercel:** 
- **Repositório GitHub:** 