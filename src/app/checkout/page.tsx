'use client';

import { useCarrinho } from '@/contexts/CarrinhoContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const { itens, total, limparCarrinho } = useCarrinho();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');
  const [form, setForm] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zip_code: '',
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) router.push('/login');
  }, []);

  async function handleFinalizarPedido() {
    if (itens.length === 0) { setErro('Seu carrinho está vazio.'); return; }
    setLoading(true); setErro('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          items: itens.map(item => ({ product_id: item.id, quantity: item.quantidade, price: item.price })),
          address: form,
          total,
        }),
      });

      if (!res.ok) { setErro('Erro ao finalizar pedido.'); return; }
      limparCarrinho();
      setSucesso(true);
    } catch {
      setErro('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  }

  if (sucesso) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🎉</p>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1E5AA8' }}>Pedido realizado!</h1>
        <p className="text-gray-500 mb-6">Obrigada pela compra. Seu pedido foi registrado com sucesso.</p>
        <button onClick={() => router.push('/')} style={{ backgroundColor: '#22D3E6' }} className="text-white px-6 py-3 rounded-full font-bold hover:opacity-90">
          Voltar à loja
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">

      <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold" style={{ color: '#1E5AA8' }}>Endereço de entrega</h2>

        {[
          { field: 'zip_code', label: 'CEP', placeholder: '00000-000' },
          { field: 'street', label: 'Rua', placeholder: 'Nome da rua' },
          { field: 'number', label: 'Número', placeholder: '123' },
          { field: 'complement', label: 'Complemento', placeholder: 'Apto, bloco... (opcional)' },
          { field: 'neighborhood', label: 'Bairro', placeholder: 'Seu bairro' },
          { field: 'city', label: 'Cidade', placeholder: 'Sua cidade' },
          { field: 'state', label: 'Estado', placeholder: 'SP' },
        ].map(({ field, label, placeholder }) => (
          <div key={field}>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2"
              style={{ borderColor: '#22D3E6' }}
              placeholder={placeholder}
              value={form[field as keyof typeof form]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1E5AA8' }}>Resumo do pedido</h2>
          {itens.length === 0 ? (
            <p className="text-gray-500">Carrinho vazio.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {itens.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.name} x{item.quantidade}</span>
                  <span className="font-bold" style={{ color: '#F6A623' }}>R$ {(item.price * item.quantidade).toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span style={{ color: '#1E5AA8' }}>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          )}
        </div>

        {erro && <p className="text-red-500 text-sm">{erro}</p>}

        <button
          onClick={handleFinalizarPedido}
          disabled={loading || itens.length === 0}
          style={{ backgroundColor: '#1E5AA8' }}
          className="text-white py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Finalizando...' : 'Finalizar Pedido'}
        </button>
      </div>

    </div>
  );
}