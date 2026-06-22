'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { getMensagemErro, limparSessaoEExpirada } from '@/lib/apiErrors';

interface ItemPedido {
  id: number;
  quantity: number;
  price: number;
  product: { id: number; name: string };
}

interface Pedido {
  id: number;
  status: string;
  total: number;
  created_at: string;
  user: { id: number; name: string; email: string };
  items: ItemPedido[];
}

export default function AdminPedidosPage() {
  const autorizado = useAdminGuard();
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!autorizado) return;
    carregarPedidos();
  }, [autorizado]);

  async function carregarPedidos() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
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

      const data = await res.json();
      setPedidos(Array.isArray(data) ? data : []);
    } catch {
      setErro('Erro ao carregar pedidos.');
    } finally {
      setLoading(false);
    }
  }

  const statusCor: Record<string, string> = {
    pending: '#FFD45A',
    processing: '#22D3E6',
    completed: '#22c55e',
    cancelled: '#F554A7',
  };

  const statusLabel: Record<string, string> = {
    pending: 'Pendente',
    processing: 'Em andamento',
    completed: 'Concluído',
    cancelled: 'Cancelado',
  };

  if (!autorizado || loading) return <p className="text-center py-16">Carregando...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#1E5AA8' }}>Pedidos</h1>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}

      {pedidos.length === 0 ? (
        <p className="text-gray-500">Nenhum pedido encontrado.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {pedidos.map(pedido => (
            <div key={pedido.id} className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-bold text-lg" style={{ color: '#1E5AA8' }}>Pedido #{pedido.id}</span>
                  <span className="ml-3 text-sm text-gray-500">{new Date(pedido.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-bold text-white" style={{ backgroundColor: statusCor[pedido.status] || '#ccc' }}>
                  {statusLabel[pedido.status] || pedido.status}
                </span>
              </div>
              {pedido.user && (
                <p className="text-sm text-gray-600 mb-2">Cliente: <span className="font-medium">{pedido.user.name}</span> — {pedido.user.email}</p>
              )}
              <p className="text-sm font-bold" style={{ color: '#F6A623' }}>
                Total: R$ {Number(pedido.total).toFixed(2).replace('.', ',')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}