'use client';

import { useCarrinho } from '@/contexts/CarrinhoContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMensagemErro, limparSessaoEExpirada } from '@/lib/apiErrors';

interface CupomAplicado {
  code: string;
  type: 'fixed' | 'percentage';
  value: string | number;
  discount: number;
  final_total: number;
  total_original: number;
}

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

  const [codigoCupom, setCodigoCupom] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState<CupomAplicado | null>(null);
  const [erroCupom, setErroCupom] = useState('');
  const [carregandoCupom, setCarregandoCupom] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) router.push('/login');
  }, []);

  useEffect(() => {
    if (cupomAplicado && cupomAplicado.total_original !== total) {
      setCupomAplicado(null);
      setErroCupom('Carrinho alterado. Reaplique o cupom.');
    }
  }, [total, cupomAplicado]);

  async function aplicarCupom() {
    if (!codigoCupom.trim()) {
      setErroCupom('Digite um código de cupom.');
      return;
    }
    if (itens.length === 0) {
      setErroCupom('Adicione produtos ao carrinho antes de aplicar cupom.');
      return;
    }

    setErroCupom('');
    setCarregandoCupom(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coupons/validate`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: codigoCupom.toUpperCase(),
          order_total: total,
        }),
      });

      if (res.status === 401) {
        limparSessaoEExpirada(router);
        return;
      }

      const data = await res.json();

      if (!res.ok || !data.valid) {
        setErroCupom(data.message || 'Cupom inválido.');
        return;
      }

      setCupomAplicado({
        code: data.coupon.code,
        type: data.coupon.type,
        value: data.coupon.value,
        discount: data.discount,
        final_total: data.final_total,
        total_original: total,
      });
      setCodigoCupom('');
    } catch {
      setErroCupom('Erro ao validar cupom. Tente novamente.');
    } finally {
      setCarregandoCupom(false);
    }
  }

  function removerCupom() {
    setCupomAplicado(null);
    setErroCupom('');
  }

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
          total: cupomAplicado ? cupomAplicado.final_total : total,
          coupon_code: cupomAplicado?.code || null,
        }),
      });

      if (res.status === 401) {
        limparSessaoEExpirada(router);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErro(getMensagemErro(res.status, data?.message));
        return;
      }

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

  const totalFinal = cupomAplicado ? cupomAplicado.final_total : total;

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

              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>

              {cupomAplicado && (
                <div className="flex justify-between text-sm" style={{ color: '#22D3E6' }}>
                  <span>Desconto ({cupomAplicado.code})</span>
                  <span className="font-bold">− R$ {cupomAplicado.discount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}

              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span style={{ color: '#1E5AA8' }}>R$ {totalFinal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1E5AA8' }}>Cupom de desconto</h2>
          {cupomAplicado ? (
            <div className="flex items-center justify-between rounded-xl p-3" style={{ backgroundColor: '#FFF3E6', border: '1px solid #22D3E6' }}>
              <div>
                <p className="font-bold" style={{ color: '#1E5AA8' }}>{cupomAplicado.code}</p>
                <p className="text-sm text-gray-600">
                  Desconto de {cupomAplicado.type === 'percentage'
                    ? `${Number(cupomAplicado.value).toFixed(0)}%`
                    : `R$ ${Number(cupomAplicado.value).toFixed(2).replace('.', ',')}`} aplicado
                </p>
              </div>
              <button
                onClick={removerCupom}
                className="text-sm font-medium hover:opacity-70"
                style={{ color: '#F554A7' }}
              >
                Remover
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2"
                style={{ borderColor: '#22D3E6' }}
                placeholder="Digite o código"
                value={codigoCupom}
                onChange={e => setCodigoCupom(e.target.value.toUpperCase())}
                disabled={carregandoCupom}
                onKeyDown={e => e.key === 'Enter' && aplicarCupom()}
              />
              <button
                onClick={aplicarCupom}
                disabled={carregandoCupom || itens.length === 0}
                style={{ backgroundColor: '#22D3E6' }}
                className="text-white px-5 py-2 rounded-full font-bold hover:opacity-90 disabled:opacity-50"
              >
                {carregandoCupom ? 'Aplicando...' : 'Aplicar'}
              </button>
            </div>
          )}
          {erroCupom && <p className="text-red-500 text-sm mt-2">{erroCupom}</p>}
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