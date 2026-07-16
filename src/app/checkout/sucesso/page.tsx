'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ConteudoSucesso() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [detalhes, setDetalhes] = useState({
    paymentId: '',
    orderId: '',
    paymentType: '',
  });

  useEffect(() => {
    setDetalhes({
      paymentId: searchParams.get('payment_id') || '',
      orderId: searchParams.get('external_reference') || '',
      paymentType: searchParams.get('payment_type') || '',
    });
  }, [searchParams]);

  function formatarTipoPagamento(tipo: string): string {
    const tipos: Record<string, string> = {
      credit_card: 'Cartão de crédito',
      debit_card: 'Cartão de débito',
      ticket: 'Boleto',
      bank_transfer: 'PIX',
      account_money: 'Saldo Mercado Pago',
    };
    return tipos[tipo] || tipo || 'Não informado';
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-2xl shadow p-8 flex flex-col gap-4">
        <p className="text-6xl">🎉</p>

        <h1 className="text-3xl font-bold" style={{ color: '#1E5AA8' }}>
          Pagamento aprovado!
        </h1>

        <p className="text-gray-600">
          Sua compra foi confirmada. Em breve você receberá os detalhes por email.
        </p>

        {(detalhes.orderId || detalhes.paymentId) && (
          <div className="mt-4 rounded-xl p-4 text-left text-sm" style={{ backgroundColor: '#FFF3E6' }}>
            <p className="font-bold mb-2" style={{ color: '#1E5AA8' }}>Detalhes:</p>
            {detalhes.orderId && (
              <p><span className="text-gray-600">Pedido:</span> <span className="font-medium">#{detalhes.orderId}</span></p>
            )}
            {detalhes.paymentId && (
              <p><span className="text-gray-600">Pagamento:</span> <span className="font-medium">{detalhes.paymentId}</span></p>
            )}
            {detalhes.paymentType && (
              <p><span className="text-gray-600">Método:</span> <span className="font-medium">{formatarTipoPagamento(detalhes.paymentType)}</span></p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => router.push('/minha-conta')}
            style={{ backgroundColor: '#1E5AA8' }}
            className="text-white px-6 py-3 rounded-full font-bold hover:opacity-90"
          >
            Ver meus pedidos
          </button>
          <button
            onClick={() => router.push('/')}
            style={{ backgroundColor: '#22D3E6' }}
            className="text-white px-6 py-3 rounded-full font-bold hover:opacity-90"
          >
            Continuar comprando
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SucessoPage() {
  return (
    <Suspense fallback={<p className="text-center py-16">Carregando...</p>}>
      <ConteudoSucesso />
    </Suspense>
  );
}