'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ConteudoFalha() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('external_reference') || '';
  const statusDetail = searchParams.get('status_detail') || '';

  function traduzirMotivo(detail: string): string {
    const motivos: Record<string, string> = {
      cc_rejected_insufficient_amount: 'Saldo insuficiente no cartão.',
      cc_rejected_bad_filled_card_number: 'Número do cartão incorreto.',
      cc_rejected_bad_filled_date: 'Data de validade inválida.',
      cc_rejected_bad_filled_security_code: 'Código de segurança incorreto.',
      cc_rejected_bad_filled_other: 'Dados do cartão preenchidos incorretamente.',
      cc_rejected_high_risk: 'Pagamento recusado por risco.',
      cc_rejected_call_for_authorize: 'Autorize o pagamento com seu banco.',
      cc_rejected_card_disabled: 'Cartão inativo.',
      cc_rejected_duplicated_payment: 'Pagamento duplicado.',
      cc_rejected_max_attempts: 'Limite de tentativas atingido.',
    };
    return motivos[detail] || '';
  }

  const motivo = traduzirMotivo(statusDetail);

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-2xl shadow p-8 flex flex-col gap-4">
        <p className="text-6xl">😔</p>

        <h1 className="text-3xl font-bold" style={{ color: '#1E5AA8' }}>
          Pagamento não aprovado
        </h1>

        <p className="text-gray-600">
          Não conseguimos processar seu pagamento. Tente novamente.
        </p>

        {motivo && (
          <div className="mt-2 rounded-xl p-4 text-left text-sm" style={{ backgroundColor: '#FFF3E6' }}>
            <p className="font-bold mb-1" style={{ color: '#F554A7' }}>Motivo:</p>
            <p className="text-gray-700">{motivo}</p>
          </div>
        )}

        {orderId && (
          <p className="text-xs text-gray-500 mt-2">
            Pedido #{orderId} — ainda aguardando pagamento
          </p>
        )}

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => router.push('/minha-conta')}
            style={{ backgroundColor: '#1E5AA8' }}
            className="text-white px-6 py-3 rounded-full font-bold hover:opacity-90"
          >
            Tentar novamente
          </button>
          <button
            onClick={() => router.push('/')}
            className="text-gray-600 px-6 py-3 rounded-full font-bold hover:text-gray-800"
          >
            Voltar à loja
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FalhaPage() {
  return (
    <Suspense fallback={<p className="text-center py-16">Carregando...</p>}>
      <ConteudoFalha />
    </Suspense>
  );
}