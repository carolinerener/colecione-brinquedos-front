# 🧸 Colecione Brinquedos — Front-end

E-commerce de brinquedos educativos infantis (projeto de portfólio). Front-end em Next.js e TypeScript, consumindo a [API REST em Laravel](https://github.com/carolinerener/colecione-brinquedos-api).

## Funcionalidades

Catálogo com paginação, carrinho, checkout com cupons de desconto, pagamento via Mercado Pago, autenticação de usuários, área administrativa restrita (produtos, categorias, pedidos e cupons) e conformidade com a LGPD.

## Tecnologias

Next.js (App Router) · TypeScript · Tailwind CSS

## Como rodar

Requer Node.js 18+ e a [API](https://github.com/carolinerener/colecione-brinquedos-api) rodando localmente.

```bash
git clone https://github.com/carolinerener/colecione-brinquedos-front.git
cd colecione-brinquedos-front
npm install
```

Crie um `.env.local` com a URL da API:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Rode o servidor e acesse http://localhost:3000:

```bash
npm run dev
```
