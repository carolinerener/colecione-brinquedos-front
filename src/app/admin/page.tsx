'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAdminGuard } from '@/hooks/useAdminGuard';

interface Resumo {
  produtos: number;
  categorias: number;
  pedidos: number;
}

export default function AdminPage() {
  const autorizado = useAdminGuard();
  const [resumo, setResumo] = useState<Resumo>({ produtos: 0, categorias: 0, pedidos: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!autorizado) return;

    const token = localStorage.getItem('token');

    async function carregarResumo() {
      try {
        const [prodRes, catRes, pedRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const produtos = await prodRes.json();
        const categorias = await catRes.json();
        const pedidos = await pedRes.json();

        setResumo({
          produtos: Array.isArray(produtos) ? produtos.length : 0,
          categorias: Array.isArray(categorias) ? categorias.length : 0,
          pedidos: Array.isArray(pedidos) ? pedidos.length : 0,
        });
      } catch {
        console.error('Erro ao carregar resumo.');
      } finally {
        setLoading(false);
      }
    }

    carregarResumo();
  }, [autorizado]);

  if (!autorizado || loading) return <p className="text-center py-16">Carregando...</p>;

  const cards = [
    { label: 'Produtos', valor: resumo.produtos, href: '/admin/produtos', cor: '#22D3E6' },
    { label: 'Categorias', valor: resumo.categorias, href: '/admin/categorias', cor: '#F6A623' },
    { label: 'Pedidos', valor: resumo.pedidos, href: '/admin/pedidos', cor: '#F554A7' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#1E5AA8' }}>Painel Admin</h1>
      <p className="text-gray-500 mb-10">Visão geral do sistema</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <p className="text-5xl font-bold mb-2" style={{ color: card.cor }}>{card.valor}</p>
              <p className="text-gray-600 font-medium">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/produtos" className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition-shadow">
          <span className="text-3xl">📦</span>
          <div>
            <p className="font-bold" style={{ color: '#1E5AA8' }}>Gerenciar Produtos</p>
            <p className="text-sm text-gray-500">Adicionar, editar, excluir</p>
          </div>
        </Link>
        <Link href="/admin/categorias" className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition-shadow">
          <span className="text-3xl">🗂️</span>
          <div>
            <p className="font-bold" style={{ color: '#1E5AA8' }}>Gerenciar Categorias</p>
            <p className="text-sm text-gray-500">Adicionar, editar, excluir</p>
          </div>
        </Link>
        <Link href="/admin/pedidos" className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition-shadow">
          <span className="text-3xl">🛒</span>
          <div>
            <p className="font-bold" style={{ color: '#1E5AA8' }}>Ver Pedidos</p>
            <p className="text-sm text-gray-500">Listagem de todos os pedidos</p>
          </div>
        </Link>
      </div>
    </div>
  );
}