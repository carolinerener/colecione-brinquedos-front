'use client';

import Link from 'next/link';
import { useCarrinho } from '@/contexts/CarrinhoContext';
import { useEffect, useState } from 'react';

export default function Header() {
  const { quantidade } = useCarrinho();
  const [usuario, setUsuario] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const nome = localStorage.getItem('nome');
    const role = localStorage.getItem('role');
    if (token && nome) setUsuario(nome);
    if (role === 'admin') setIsAdmin(true);
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    localStorage.removeItem('role');
    localStorage.removeItem('carrinho');
    setUsuario(null);
    setIsAdmin(false);
    window.location.href = '/login';
  }

  return (
    <header style={{ backgroundColor: '#1E5AA8' }} className="text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2">
          <span style={{ color: '#22D3E6' }} className="text-2xl font-bold">Colecione</span>
          <span style={{ color: '#F6A623' }} className="text-2xl font-bold">Brinquedos</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-yellow-300 transition-colors">Início</Link>
          <Link href="/categorias" className="hover:text-yellow-300 transition-colors">Categorias</Link>
          {isAdmin && (
            <Link href="/admin" className="hover:text-yellow-300 transition-colors">Painel Admin</Link>
          )}
          <Link href="/carrinho" className="relative hover:text-yellow-300 transition-colors">
            🛒
            {quantidade > 0 && (
              <span
                style={{ backgroundColor: '#F6A623' }}
                className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
              >
                {quantidade}
              </span>
            )}
          </Link>

          {usuario ? (
            <div className="flex items-center gap-3">
              <Link href="/minha-conta" style={{ color: '#22D3E6' }} className="font-bold hover:underline">Olá, {usuario}!</Link>
              <button
                onClick={handleLogout}
                style={{ backgroundColor: '#F6A623' }}
                className="text-white px-4 py-2 rounded-full font-bold hover:opacity-90 transition-opacity"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link href="/login" style={{ backgroundColor: '#22D3E6' }} className="text-white px-4 py-2 rounded-full font-bold hover:opacity-90 transition-opacity">
              Entrar
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
}