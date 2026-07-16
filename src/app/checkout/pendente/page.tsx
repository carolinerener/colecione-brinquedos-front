'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ConteudoPendente() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('external_reference') || '';
  const paymentType = searchParams.get('payment_type') || '';

  function mensagemPorTipo(): string {
    if (paymentType === 'ticket') {
      return 'Você escolheu pagar com boleto. A confirmação pode levar até 3 dias úteis após o pagamento.';
    }
    if (paymentType === 'bank_transfer') {
      return 'Você escolheu pagar com PIX. Assim que a transferência for confirmada, seu pedido será processado.';
    }
    return 'Seu pagamento está em análise. Você receberá um email assim que for confirmado.';
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-2xl shadow p-8 flex flex-col gap-4">
        <p className="text-6xl">⏳</p>

        <h1 className="text-3xl font-bold" style={{ color: '#1E5AA8' }}>
          Pagamento em análise
        </h1>

        <p className="text-gray-600">
          {mensagemPorTipo()}
        </p>

        {orderId && (
          <p className="text-xs text-gray-500">
            Pedido #{orderId}
          </p>
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

export default function PendentePage() {
  return (
    <Suspense fallback={<p className="text-center py-16">Carregando...</p>}>
      <ConteudoPendente />
    </Suspense>
  );
}