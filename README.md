# 🧸 Colecione Brinquedos — Front-end

Front-end de um e-commerce de brinquedos educativos infantis, desenvolvido como projeto de portfólio.

> "Diversão que ensina"

---

## 🚀 Tecnologias

- Next.js (App Router)
- TypeScript
- Tailwind CSS

---

## ✨ Funcionalidades

- Catálogo de produtos com paginação
- Carrinho de compras e checkout
- Cupons de desconto
- Pagamento via Mercado Pago (Checkout Pro)
- Autenticação de usuários (cadastro e login)
- Área administrativa restrita (produtos, categorias, pedidos e cupons)
- Conformidade com a LGPD (consentimento de cookies, exportação e exclusão de dados)

---

## 🔧 Como rodar localmente

> Requer Node.js 18+ e a [API](https://github.com/carolinerener/colecione-brinquedos-api) rodando localmente.

```bash
git clone https://github.com/carolinerener/colecione-brinquedos-front.git
cd colecione-brinquedos-front
npm install
cp .env.example .env.local
npm run dev
```

> Configure o `.env.local` com a URL da API: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`

---

## 🔗 Back-end

[colecione-brinquedos-api](https://github.com/carolinerener/colecione-brinquedos-api)
