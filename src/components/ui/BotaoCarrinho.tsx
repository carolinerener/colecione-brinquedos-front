'use client';

import { useCarrinho } from '@/contexts/CarrinhoContext';
import { useState } from 'react';

interface Produto {
  id: number;
  name: string;
  price: number;
}

export default function BotaoCarrinho({ produto }: { produto: Produto }) {
  const { adicionarItem } = useCarrinho();
  const [adicionado, setAdicionado] = useState(false);

  function handleAdicionar() {
    adicionarItem({
      id: produto.id,
      name: produto.name,
      price: Number(produto.price),
    });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  }

  return (
    <button
      onClick={handleAdicionar}
      style={{ backgroundColor: adicionado ? '#22D3E6' : '#F6A623' }}
      className="text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all"
    >
      {adicionado ? '✓ Adicionado!' : 'Adicionar ao Carrinho'}
    </button>
  );
}