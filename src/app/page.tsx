'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// Mapa de imagens dos produtos seed (que ainda não têm campo image no banco)
const imagensSeed: { [key: number]: string } = {
  1: '/blocodemontar.png',
  2: '/kitpintura.png',
  3: '/quebracabeca.png',
  4: '/torredeencaixe.png',
  5: '/massinha.png',
};

interface Produto {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string | null;
}

interface RespostaPaginada {
  data: Produto[];
  current_page: number;
  last_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paginaAtualUrl = Number(searchParams.get('page')) || 1;

  const [resposta, setResposta] = useState<RespostaPaginada | null>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const baseUrl = apiUrl?.replace('/api', '');

  useEffect(() => {
    async function carregar() {
      setLoading(true);
      try {
        const res = await fetch(
          `${apiUrl}/products?page=${paginaAtualUrl}`,
          { cache: 'no-store' }
        );
        if (!res.ok) {
          setResposta(null);
          return;
        }
        const data = await res.json();
        setResposta(data);
      } catch {
        setResposta(null);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [paginaAtualUrl, apiUrl]);

  function irParaPagina(pagina: number) {
    router.push(`/?page=${pagina}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function urlDaImagem(produto: Produto): string | null {
    if (produto.image) {
      return `${baseUrl}/storage/${produto.image}`;
    }
    return imagensSeed[produto.id] || null;
  }

  if (loading) {
    return <p className="text-center py-16">Carregando...</p>;
  }

  if (!resposta || resposta.data.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#1E5AA8' }}>
          Nossos Produtos
        </h1>
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      </div>
    );
  }

  const { data: produtos, current_page, last_page, total, from, to } = resposta;

  const paginas: number[] = [];
  for (let i = 1; i <= last_page; i++) paginas.push(i);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-baseline justify-between mb-8 flex-wrap gap-2">
        <h1 className="text-3xl font-bold" style={{ color: '#1E5AA8' }}>
          Nossos Produtos
        </h1>
        <p className="text-sm text-gray-500">
          Mostrando {from}–{to} de {total} produto{total !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((produto) => {
          const imagem = urlDaImagem(produto);
          return (
            <Link key={produto.id} href={`/produto/${produto.id}`}>
              <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                {imagem && (
                  <div className="mb-4">
                    <img
                      src={imagem}
                      alt={produto.name}
                      className="w-full h-48 object-contain rounded-xl"
                    />
                    <p className="text-xs text-gray-400 text-center mt-1">
                      Imagem ilustrativa
                    </p>
                  </div>
                )}
                <h2 className="text-lg font-bold mb-2" style={{ color: '#1E5AA8' }}>
                  {produto.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{produto.description}</p>
                <p className="text-xl font-bold" style={{ color: '#F6A623' }}>
                  R$ {Number(produto.price).toFixed(2)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {last_page > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
          <button
            onClick={() => irParaPagina(current_page - 1)}
            disabled={current_page === 1}
            className="px-4 py-2 rounded-full font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#1E5AA8' }}
          >
            ← Anterior
          </button>

          {paginas.map((p) => (
            <button
              key={p}
              onClick={() => irParaPagina(p)}
              className="px-4 py-2 rounded-full font-bold transition-opacity hover:opacity-90"
              style={
                p === current_page
                  ? { backgroundColor: '#F6A623', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#1E5AA8', border: '2px solid #22D3E6' }
              }
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => irParaPagina(current_page + 1)}
            disabled={current_page === last_page}
            className="px-4 py-2 rounded-full font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#1E5AA8' }}
          >
            Próxima →
          </button>
        </div>
      )}
    </div>
  );
}