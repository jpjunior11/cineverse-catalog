# Projeto: Cineverse Catalog com Next.js + NextUI

## Descrição
O **Cineverse Catalog** é uma aplicação web que simula um catálogo de filmes, desenvolvida com **Next.js (App Router)** e **TypeScript**. Os dados são obtidos em tempo real da **API do The Movie Database (TMDB)**, exibindo informações reais de filmes, como pôster, sinopse, avaliação, gêneros e mais.

O projeto aplica práticas modernas como **Server Components**, UI responsiva com **Tailwind CSS**, componentes elegantes do **NextUI**, gerenciamento de erros, carregamento assíncrono e metadados dinâmicos para SEO.

## Tecnologias Utilizadas
- **Next.js 15+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **NextUI**
- **The Movie Database API (TMDB)**
- **Vercel** (Deploy)

## Funcionalidades
- Página de login fictícia (`/`)
- Listagem de filmes com dados reais (`/filmes`)
- Página de detalhes para cada filme (`/filmes/[id]`)
- Exibição de banners e pôsteres reais com fallback
- Componentes com carregamento (`loading.tsx`) e tratamento de erro (`error.tsx`)
- Botão de voltar sempre visível e legível, mesmo com fundos escuros
- SEO dinâmico via `generateMetadata`

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
- **Deploy na Vercel:** [https://cineverse-catalog.vercel.app](https://cineverse-catalog.vercel.app)
- **Repositório GitHub:** [https://github.com/jpjunior11/cineverse-catalog](https://github.com/jpjunior11/cineverse-catalog)