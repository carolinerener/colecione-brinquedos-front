'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegistroPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  async function handleRegistro(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro('');
    setSucesso('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.message || 'Erro ao cadastrar.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('nome', data.user.name);
      localStorage.removeItem('carrinho');
      setSucesso('Cadastro realizado com sucesso!');
      setTimeout(() => { window.location.href = '/'; }, 1500);
    } catch {
      setErro('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <Link href="/" className="flex items-center justify-center gap-2 mb-8">
        <span style={{ color: '#22D3E6' }} className="text-2xl font-bold">Colecione</span>
        <span style={{ color: '#F6A623' }} className="text-2xl font-bold">Brinquedos</span>
      </Link>

      <div className="bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: '#1E5AA8' }}>
          Criar Conta
        </h1>

        {erro && <p className="text-red-500 text-sm mb-4 text-center">{erro}</p>}
        {sucesso && <p className="text-green-500 text-sm mb-4 text-center">{sucesso}</p>}

        <form onSubmit={handleRegistro} className="flex flex-col gap-4" autoComplete="off">
          <div>
            <label className="text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="off"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2"
              style={{ borderColor: '#22D3E6' }}
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2"
              style={{ borderColor: '#22D3E6' }}
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2"
              style={{ borderColor: '#22D3E6' }}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Confirmar Senha</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2"
              style={{ borderColor: '#22D3E6' }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#1E5AA8' }}
            className="text-white py-3 rounded-full font-bold hover:opacity-90 transition-opacity mt-2"
          >
            {loading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-500">
          Já tem conta?{' '}
          <Link href="/login" style={{ color: '#22D3E6' }} className="font-bold hover:underline">
            Entrar
          </Link>
        </p>

        <p className="text-center text-sm mt-3">
          <Link href="/" className="text-gray-500 hover:underline">
            ← Voltar para a loja
          </Link>
        </p>
      </div>
    </div>
  );
}