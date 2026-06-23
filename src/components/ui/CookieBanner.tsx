'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'cookies-aceitos';

export default function CookieBanner() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aceito = localStorage.getItem(STORAGE_KEY);
    if (!aceito) setVisivel(true);
  }, []);

  function aceitar() {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisivel(false);
  }

  if (!visivel) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 shadow-lg text-white"
      style={{ backgroundColor: '#1E5AA8', borderTop: '3px solid #22D3E6' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm flex-1">
          🍪 Utilizamos cookies essenciais para o funcionamento da loja, como manter você logado e armazenar
          os itens do carrinho. Ao continuar navegando, você concorda com o uso desses cookies.{' '}
          <Link
            href="/politica-de-cookies"
            className="font-bold hover:underline"
            style={{ color: '#22D3E6' }}
          >
            Saiba mais
          </Link>
        </p>
        <button
          onClick={aceitar}
          style={{ backgroundColor: '#F6A623' }}
          className="text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Entendi
        </button>
      </div>
    </div>
  );
}