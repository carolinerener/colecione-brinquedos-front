'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Categoria {
  id: number;
  name: string;
  description: string;
}

export default function AdminCategoriasPage() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [form, setForm] = useState({ name: '', description: '' });
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) { router.push('/login'); return; }
    carregarCategorias();
  }, []);

  async function carregarCategorias() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      setCategorias(await res.json());
    } catch {
      setErro('Erro ao carregar categorias.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSalvar() {
    setErro(''); setSucesso('');
    const url = editandoId
      ? `${process.env.NEXT_PUBLIC_API_URL}/categories/${editandoId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/categories`;
    const method = editandoId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (!res.ok) { setErro('Erro ao salvar categoria.'); return; }
      setSucesso(editandoId ? 'Categoria atualizada!' : 'Categoria criada!');
      setForm({ name: '', description: '' });
      setEditandoId(null);
      setMostrarForm(false);
      carregarCategorias();
    } catch {
      setErro('Erro ao conectar com o servidor.');
    }
  }

  async function handleExcluir(id: number) {
    if (!confirm('Excluir esta categoria?')) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    carregarCategorias();
  }

  function handleEditar(categoria: Categoria) {
    setForm({ name: categoria.name, description: categoria.description });
    setEditandoId(categoria.id);
    setMostrarForm(true);
  }

  if (loading) return <p className="text-center py-16">Carregando...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#1E5AA8' }}>Categorias</h1>
        <button
          onClick={() => { setMostrarForm(!mostrarForm); setEditandoId(null); setForm({ name: '', description: '' }); }}
          style={{ backgroundColor: '#22D3E6' }}
          className="text-white px-5 py-2 rounded-full font-bold hover:opacity-90"
        >
          {mostrarForm ? 'Cancelar' : '+ Nova Categoria'}
        </button>
      </div>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      {sucesso && <p className="text-green-500 mb-4">{sucesso}</p>}

      {mostrarForm && (
        <div className="bg-white rounded-2xl shadow p-6 mb-8 flex flex-col gap-4">
          <h2 className="font-bold text-lg" style={{ color: '#1E5AA8' }}>{editandoId ? 'Editar Categoria' : 'Nova Categoria'}</h2>
          <input className="border rounded-xl px-4 py-2" placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <textarea className="border rounded-xl px-4 py-2" placeholder="Descrição" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <button onClick={handleSalvar} style={{ backgroundColor: '#1E5AA8' }} className="text-white py-2 rounded-full font-bold hover:opacity-90">
            {editandoId ? 'Salvar Alterações' : 'Criar Categoria'}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {categorias.map(categoria => (
          <div key={categoria.id} className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">
            <div>
              <p className="font-bold" style={{ color: '#1E5AA8' }}>{categoria.name}</p>
              <p className="text-sm text-gray-500">{categoria.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEditar(categoria)} style={{ backgroundColor: '#22D3E6' }} className="text-white px-4 py-1 rounded-full text-sm font-bold hover:opacity-90">Editar</button>
              <button onClick={() => handleExcluir(categoria.id)} style={{ backgroundColor: '#F554A7' }} className="text-white px-4 py-1 rounded-full text-sm font-bold hover:opacity-90">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}