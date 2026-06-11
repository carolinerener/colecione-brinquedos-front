'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Produto {
  id: number;
  name: string;
  price: number;
}

interface ItemPedido {
  id: number;
  quantity: number;
  price: number;
  product: Produto;
}

interface Pedido {
  id: number;
  status: string;
  total: number;
  created_at: string;
  items: ItemPedido[];
}

export default function MinhaContaPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const nomeSalvo = localStorage.getItem('nome') || '';
    setNome(nomeSalvo);

    async function carregarDados() {
      try {
        const [meRes, pedidosRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const meData = await meRes.json();
        setEmail(meData.email || '');

        const pedidosData = await pedidosRes.json();
        setPedidos(pedidosData || []);
      } catch {
        console.error('Erro ao carregar dados.');
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    router.push('/');
  }

  if (loading) {
    return <p className="text-center py-16">Carregando...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#1E5AA8' }}>Minha Conta</h1>

      {/* Dados do usuário */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-lg font-bold mb-4" style={{ color: '#1E5AA8' }}>Dados Pessoais</h2>
        <p className="text-gray-700"><span className="font-medium">Nome:</span> {nome}</p>
        <p className="text-gray-700 mt-2"><span className="font-medium">E-mail:</span> {email}</p>
        <button
          onClick={handleLogout}
          style={{ backgroundColor: '#F6A623' }}
          className="mt-4 text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity"
        >
          Sair da conta
        </button>
      </div>

      {/* Pedidos */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-bold mb-4" style={{ color: '#1E5AA8' }}>Meus Pedidos</h2>
        {pedidos.length === 0 ? (
          <p className="text-gray-500">Você ainda não fez nenhum pedido.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="border rounded-xl p-4" style={{ borderColor: '#22D3E6' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold" style={{ color: '#1E5AA8' }}>Pedido #{pedido.id}</span>
                  <span className="text-sm text-gray-500">{new Date(pedido.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Status: <span className="font-medium">{pedido.status}</span></p>
                <p className="text-sm font-bold" style={{ color: '#F6A623' }}>
                  Total: R$ {Number(pedido.total).toFixed(2).replace('.', ',')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}