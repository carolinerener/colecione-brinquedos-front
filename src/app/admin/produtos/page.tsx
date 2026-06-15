'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Produto {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
}

interface Categoria {
  id: number;
  name: string;
}

export default function AdminProdutosPage() {
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', category_id: '' });
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) { router.push('/login'); return; }
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
      ]);
      setProdutos(await prodRes.json());
      setCategorias(await catRes.json());
    } catch {
      setErro('Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSalvar() {
    setErro(''); setSucesso('');
    const url = editandoId
      ? `${process.env.NEXT_PUBLIC_API_URL}/products/${editandoId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/products`;
    const method = editandoId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock), category_id: parseInt(form.category_id) }),
      });
      if (!res.ok) { setErro('Erro ao salvar produto.'); return; }
      setSucesso(editandoId ? 'Produto atualizado!' : 'Produto criado!');
      setForm({ name: '', description: '', price: '', stock: '', category_id: '' });
      setEditandoId(null);
      setMostrarForm(false);
      carregarDados();
    } catch {
      setErro('Erro ao conectar com o servidor.');
    }
  }

  async function handleExcluir(id: number) {
    if (!confirm('Excluir este produto?')) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    carregarDados();
  }

  function handleEditar(produto: Produto) {
    setForm({ name: produto.name, description: produto.description, price: String(produto.price), stock: String(produto.stock), category_id: String(produto.category_id) });
    setEditandoId(produto.id);
    setMostrarForm(true);
  }

  if (loading) return <p className="text-center py-16">Carregando...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#1E5AA8' }}>Produtos</h1>
        <button
          onClick={() => { setMostrarForm(!mostrarForm); setEditandoId(null); setForm({ name: '', description: '', price: '', stock: '', category_id: '' }); }}
          style={{ backgroundColor: '#22D3E6' }}
          className="text-white px-5 py-2 rounded-full font-bold hover:opacity-90"
        >
          {mostrarForm ? 'Cancelar' : '+ Novo Produto'}
        </button>
      </div>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      {sucesso && <p className="text-green-500 mb-4">{sucesso}</p>}

      {mostrarForm && (
        <div className="bg-white rounded-2xl shadow p-6 mb-8 flex flex-col gap-4">
          <h2 className="font-bold text-lg" style={{ color: '#1E5AA8' }}>{editandoId ? 'Editar Produto' : 'Novo Produto'}</h2>
          <input className="border rounded-xl px-4 py-2" placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <textarea className="border rounded-xl px-4 py-2" placeholder="Descrição" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <input className="border rounded-xl px-4 py-2" placeholder="Preço (ex: 29.90)" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <input className="border rounded-xl px-4 py-2" placeholder="Estoque" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
          <select className="border rounded-xl px-4 py-2" value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
            <option value="">Selecione uma categoria</option>
            {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <button onClick={handleSalvar} style={{ backgroundColor: '#1E5AA8' }} className="text-white py-2 rounded-full font-bold hover:opacity-90">
            {editandoId ? 'Salvar Alterações' : 'Criar Produto'}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {produtos.map(produto => (
          <div key={produto.id} className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">
            <div>
              <p className="font-bold" style={{ color: '#1E5AA8' }}>{produto.name}</p>
              <p className="text-sm text-gray-500">{produto.description}</p>
              <p className="text-sm font-bold mt-1" style={{ color: '#F6A623' }}>R$ {Number(produto.price).toFixed(2).replace('.', ',')}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEditar(produto)} style={{ backgroundColor: '#22D3E6' }} className="text-white px-4 py-1 rounded-full text-sm font-bold hover:opacity-90">Editar</button>
              <button onClick={() => handleExcluir(produto.id)} style={{ backgroundColor: '#F554A7' }} className="text-white px-4 py-1 rounded-full text-sm font-bold hover:opacity-90">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}