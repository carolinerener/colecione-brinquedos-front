'use client';

import { useCarrinho } from '@/contexts/CarrinhoContext';
import Image from 'next/image';
import Link from 'next/link';

const imagensProdutos: { [key: number]: string } = {
  1: '/blocodemontar.png',
  2: '/kitpintura.png',
  3: '/quebracabeca.png',
  4: '/torredeencaixe.png',
  5: '/massinha.png',
};

export default function CarrinhoPage() {
  const { itens, removerItem, aumentarQuantidade, diminuirQuantidade, limparCarrinho, total, quantidade } = useCarrinho();

  if (itens.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold mb-4" style={{ color: '#1E5AA8' }}>
          Seu carrinho está vazio
        </h1>
        <Link href="/produtos">
          <button
            style={{ backgroundColor: '#22D3E6' }}
            className="text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Ver Produtos
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#1E5AA8' }}>
        Meu Carrinho ({quantidade} {quantidade === 1 ? 'item' : 'itens'})
      </h1>

      <div className="flex flex-col gap-4 mb-8">
        {itens.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
            {imagensProdutos[item.id] && (
              <Image
                src={imagensProdutos[item.id]}
                alt={item.name}
                width={80}
                height={80}
                className="w-20 h-20 object-contain rounded-xl"
              />
            )}
            <div className="flex-1">
              <h2 className="font-bold" style={{ color: '#1E5AA8' }}>{item.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => diminuirQuantidade(item.id)}
                  style={{ backgroundColor: '#22D3E6' }}
                  className="text-white w-7 h-7 rounded-full font-bold hover:opacity-90"
                >
                  −
                </button>
                <span className="font-bold min-w-[24px] text-center">{item.quantidade}</span>
                <button
                  onClick={() => aumentarQuantidade(item.id)}
                  style={{ backgroundColor: '#22D3E6' }}
                  className="text-white w-7 h-7 rounded-full font-bold hover:opacity-90"
                >
                  +
                </button>
              </div>
              <p className="font-bold mt-1" style={{ color: '#F6A623' }}>
                R$ {(item.price * item.quantidade).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removerItem(item.id)}
              className="text-red-400 hover:text-red-600 font-bold text-sm"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold text-gray-700">Total:</span>
          <span className="text-2xl font-bold" style={{ color: '#F6A623' }}>
            R$ {total.toFixed(2)}
          </span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={limparCarrinho}
            className="flex-1 border-2 py-3 rounded-full font-bold text-gray-500 hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#22D3E6' }}
          >
            Limpar Carrinho
          </button>
          <Link href="/checkout" className="flex-1">
            <button
              style={{ backgroundColor: '#1E5AA8' }}
              className="w-full text-white py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              Finalizar Compra
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}