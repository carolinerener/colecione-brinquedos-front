'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import { getMensagemErro, limparSessaoEExpirada } from '@/lib/apiErrors';

interface Cupom {
  id: number;
  code: string;
  type: 'fixed' | 'percentage';
  value: string;
  max_uses: number | null;
  used_times: number;
  min_order_value: string | null;
  active: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function AdminCuponsPage() {
  const autorizado = useAdminGuard();
  const router = useRouter();
  const [cupons, setCupons] = useState<Cupom[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [form, setForm] = useState({
    code: '',
    type: 'percentage',
    value: '',
    max_uses: '',
    min_order_value: '',
    active: 'true',
    expires_at: '',
  });
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!autorizado) return;
    carregarCupons();
  }, [autorizado]);

  async function carregarCupons() {
    try {
      const res = await fetch(`${apiUrl}/coupons`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        limparSessaoEExpirada(router);
        return;
      }

      const data = await res.json();
      setCupons(data.data || data);
    } catch {
      setErro('Erro ao carregar cupons.');
    } finally {
      setLoading(false);
    }
  }

  function limparForm() {
    setForm({
      code: '',
      type: 'percentage',
      value: '',
      max_uses: '',
      min_order_value: '',
      active: 'true',
      expires_at: '',
    });
    setEditandoId(null);
  }

  async function handleSalvar() {
    setErro('');
    setSucesso('');

    const payload: Record<string, unknown> = {
      code: form.code.trim().toUpperCase(),
      type: form.type,
      value: Number(form.value),
      active: form.active === 'true',
    };

    if (form.max_uses) payload.max_uses = Number(form.max_uses);
    if (form.min_order_value) payload.min_order_value = Number(form.min_order_value);
    if (form.expires_at) payload.expires_at = form.expires_at.replace('T', ' ') + ':00';

    const url = editandoId
      ? `${apiUrl}/coupons/${editandoId}`
      : `${apiUrl}/coupons`;

    const method = editandoId ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
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

      setSucesso(editandoId ? 'Cupom atualizado!' : 'Cupom criado!');
      limparForm();
      setMostrarForm(false);
      carregarCupons();
    } catch {
      setErro('Erro ao conectar com o servidor.');
    }
  }

  async function handleExcluir(id: number) {
    if (!confirm('Excluir este cupom?')) return;

    const res = await fetch(`${apiUrl}/coupons/${id}`, {
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

    setSucesso('Cupom excluído!');
    carregarCupons();
  }

  function handleEditar(cupom: Cupom) {
    setForm({
      code: cupom.code,
      type: cupom.type,
      value: String(cupom.value),
      max_uses: cupom.max_uses ? String(cupom.max_uses) : '',
      min_order_value: cupom.min_order_value ? String(cupom.min_order_value) : '',
      active: cupom.active ? 'true' : 'false',
      expires_at: cupom.expires_at ? cupom.expires_at.slice(0, 16) : '',
    });
    setEditandoId(cupom.id);
    setMostrarForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function formatarValorCupom(cupom: Cupom): string {
    if (cupom.type === 'percentage') {
      return `${Number(cupom.value).toFixed(0)}% OFF`;
    }
    return `R$ ${Number(cupom.value).toFixed(2).replace('.', ',')} OFF`;
  }

  function statusCupom(cupom: Cupom): { texto: string; cor: string } {
    if (!cupom.active) return { texto: 'Inativo', cor: '#6B7280' };
    if (cupom.expires_at && new Date(cupom.expires_at) < new Date()) {
      return { texto: 'Expirado', cor: '#DC2626' };
    }
    if (cupom.max_uses !== null && cupom.used_times >= cupom.max_uses) {
      return { texto: 'Esgotado', cor: '#DC2626' };
    }
    return { texto: 'Ativo', cor: '#16A34A' };
  }

  if (!autorizado || loading) return <p className="text-center py-16">Carregando...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#1E5AA8' }}>Cupons</h1>
        <button
          onClick={() => {
            setMostrarForm(!mostrarForm);
            if (mostrarForm) limparForm();
          }}
          style={{ backgroundColor: '#22D3E6' }}
          className="text-white px-5 py-2 rounded-full font-bold hover:opacity-90"
        >
          {mostrarForm ? 'Cancelar' : '+ Novo Cupom'}
        </button>
      </div>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      {sucesso && <p className="text-green-500 mb-4">{sucesso}</p>}

      {mostrarForm && (
        <div className="bg-white rounded-2xl shadow p-6 mb-8 flex flex-col gap-4">
          <h2 className="font-bold text-lg" style={{ color: '#1E5AA8' }}>
            {editandoId ? 'Editar Cupom' : 'Novo Cupom'}
          </h2>

          <input
            className="border rounded-xl px-4 py-2 uppercase"
            placeholder="Código (ex: PRIMEIRACOMPRA)"
            value={form.code}
            onChange={e => setForm({ ...form, code: e.target.value })}
          />

          <select
            className="border rounded-xl px-4 py-2"
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          >
            <option value="percentage">Porcentagem (%)</option>
            <option value="fixed">Valor fixo (R$)</option>
          </select>

          <input
            className="border rounded-xl px-4 py-2"
            placeholder={form.type === 'percentage' ? 'Valor do desconto (ex: 10)' : 'Valor do desconto (ex: 20.00)'}
            type="number"
            step="0.01"
            value={form.value}
            onChange={e => setForm({ ...form, value: e.target.value })}
          />

          <input
            className="border rounded-xl px-4 py-2"
            placeholder="Limite de usos (opcional)"
            type="number"
            value={form.max_uses}
            onChange={e => setForm({ ...form, max_uses: e.target.value })}
          />

          <input
            className="border rounded-xl px-4 py-2"
            placeholder="Valor mínimo do pedido (opcional, ex: 50.00)"
            type="number"
            step="0.01"
            value={form.min_order_value}
            onChange={e => setForm({ ...form, min_order_value: e.target.value })}
          />

          <div>
            <label className="text-sm font-medium text-gray-700">Data de expiração (opcional)</label>
            <input
              className="border rounded-xl px-4 py-2 w-full mt-1"
              type="datetime-local"
              value={form.expires_at}
              onChange={e => setForm({ ...form, expires_at: e.target.value })}
            />
          </div>

          <select
            className="border rounded-xl px-4 py-2"
            value={form.active}
            onChange={e => setForm({ ...form, active: e.target.value })}
          >
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>

          <button
            onClick={handleSalvar}
            style={{ backgroundColor: '#1E5AA8' }}
            className="text-white py-2 rounded-full font-bold hover:opacity-90"
          >
            {editandoId ? 'Salvar Alterações' : 'Criar Cupom'}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {cupons.length === 0 && (
          <p className="text-center text-gray-500 py-8">Nenhum cupom cadastrado.</p>
        )}
        {cupons.map(cupom => {
          const status = statusCupom(cupom);
          return (
            <div key={cupom.id} className="bg-white rounded-2xl shadow p-5 flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <p className="font-bold text-lg" style={{ color: '#1E5AA8' }}>{cupom.code}</p>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: status.cor }}
                  >
                    {status.texto}
                  </span>
                </div>
                <p className="text-sm font-bold" style={{ color: '#F6A623' }}>
                  {formatarValorCupom(cupom)}
                </p>
                <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-x-4">
                  <span>
                    Usos: {cupom.used_times}{cupom.max_uses !== null ? ` / ${cupom.max_uses}` : ' (sem limite)'}
                  </span>
                  {cupom.min_order_value && (
                    <span>
                      Mínimo: R$ {Number(cupom.min_order_value).toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  {cupom.expires_at && (
                    <span>
                      Expira: {new Date(cupom.expires_at).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditar(cupom)}
                  style={{ backgroundColor: '#22D3E6' }}
                  className="text-white px-4 py-1 rounded-full text-sm font-bold hover:opacity-90"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleExcluir(cupom.id)}
                  style={{ backgroundColor: '#F554A7' }}
                  className="text-white px-4 py-1 rounded-full text-sm font-bold hover:opacity-90"
                >
                  Excluir
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}