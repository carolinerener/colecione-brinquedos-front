'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { getMensagemErro, limparSessaoEExpirada } from '@/lib/apiErrors';

interface Produto {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  image?: string;
}

interface Categoria {
  id: number;
  name: string;
}

export default function AdminProdutosPage() {
  const autorizado = useAdminGuard();
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', category_id: '' });
  const [imagem, setImagem] = useState<File | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const baseUrl = apiUrl?.replace('/api', '');

  useEffect(() => {
    if (!autorizado) return;
    carregarDados();
  }, [autorizado]);

  async function carregarDados() {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${apiUrl}/products`),
        fetch(`${apiUrl}/categories`),
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

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    formData.append('category_id', form.category_id);
    if (imagem) formData.append('image', imagem);
    if (editandoId) formData.append('_method', 'PUT');

    const url = editandoId
      ? `${apiUrl}/products/${editandoId}`
      : `${apiUrl}/products`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
        body: formData,
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

      setSucesso(editandoId ? 'Produto atualizado!' : 'Produto criado!');
      setForm({ name: '', description: '', price: '', stock: '', category_id: '' });
      setImagem(null);
      setEditandoId(null);
      setMostrarForm(false);
      carregarDados();
    } catch {
      setErro('Erro ao conectar com o servidor.');
    }
  }

  async function handleExcluir(id: number) {
    if (!confirm('Excluir este produto?')) return;

    const res = await fetch(`${apiUrl}/products/${id}`, {
      method: 'DELETE',
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

    carregarDados();
  }

  function handleEditar(produto: Produto) {
    setForm({ name: produto.name, description: produto.description, price: String(produto.price), stock: String(produto.stock), category_id: String(produto.category_id) });
    setImagem(null);
    setEditandoId(produto.id);
    setMostrarForm(true);
  }

  if (!autorizado || loading) return <p className="text-center py-16">Carregando...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#1E5AA8' }}>Produtos</h1>
        <button
          onClick={() => { setMostrarForm(!mostrarForm); setEditandoId(null); setForm({ name: '', description: '', price: '', stock: '', category_id: '' }); setImagem(null); }}
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
          <div>
            <label className="text-sm font-medium text-gray-700">Imagem do produto</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setImagem(e.target.files?.[0] || null)}
              className="w-full mt-1 px-4 py-2 border rounded-xl"
            />
          </div>
          <button onClick={handleSalvar} style={{ backgroundColor: '#1E5AA8' }} className="text-white py-2 rounded-full font-bold hover:opacity-90">
            {editandoId ? 'Salvar Alterações' : 'Criar Produto'}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {produtos.map(produto => (
          <div key={produto.id} className="bg-white rounded-2xl shadow p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              {produto.image && (
                <img src={`${baseUrl}/storage/${produto.image}`} alt={produto.name} className="w-16 h-16 object-cover rounded-xl" />
              )}
              <div>
                <p className="font-bold" style={{ color: '#1E5AA8' }}>{produto.name}</p>
                <p className="text-sm text-gray-500">{produto.description}</p>
                <p className="text-sm font-bold mt-1" style={{ color: '#F6A623' }}>R$ {Number(produto.price).toFixed(2).replace('.', ',')}</p>
              </div>
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