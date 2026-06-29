'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMensagemErro, limparSessaoEExpirada } from '@/lib/apiErrors';

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
  const [erro, setErro] = useState('');

  // Estados do modal de exclusão de conta
  const [modalAberto, setModalAberto] = useState(false);
  const [senhaExclusao, setSenhaExclusao] = useState('');
  const [confirmacaoTexto, setConfirmacaoTexto] = useState('');
  const [erroExclusao, setErroExclusao] = useState('');
  const [excluindo, setExcluindo] = useState(false);

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

        if (meRes.status === 401 || pedidosRes.status === 401) {
          limparSessaoEExpirada(router);
          return;
        }

        if (!meRes.ok || !pedidosRes.ok) {
          setErro(getMensagemErro(!meRes.ok ? meRes.status : pedidosRes.status));
          return;
        }

        const meData = await meRes.json();
        setEmail(meData.email || '');

        const pedidosData = await pedidosRes.json();
        setPedidos(pedidosData || []);
      } catch {
        setErro('Erro ao carregar seus dados. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    localStorage.removeItem('role');
    localStorage.removeItem('carrinho');
    router.push('/');
  }

  function abrirModalExclusao() {
    setSenhaExclusao('');
    setConfirmacaoTexto('');
    setErroExclusao('');
    setModalAberto(true);
  }

  function fecharModalExclusao() {
    if (excluindo) return; // não fecha se estiver no meio da exclusão
    setModalAberto(false);
  }

  async function handleExcluirConta() {
    setErroExclusao('');
    setExcluindo(true);

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: senhaExclusao,
          confirmacao: confirmacaoTexto,
        }),
      });

      if (res.status === 401) {
        limparSessaoEExpirada(router);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        // Erros de validação do Laravel (422) vêm em data.errors
        if (data?.errors) {
          const primeiroErro = Object.values(data.errors)[0] as string[];
          setErroExclusao(primeiroErro[0] || 'Erro ao excluir conta.');
        } else {
          setErroExclusao(getMensagemErro(res.status, data?.message));
        }
        return;
      }

      // Sucesso: limpa tudo e redireciona
      localStorage.removeItem('token');
      localStorage.removeItem('nome');
      localStorage.removeItem('role');
      localStorage.removeItem('carrinho');
      alert('Sua conta foi excluída. Obrigada por ter feito parte da Colecione Brinquedos!');
      window.location.href = '/';
    } catch {
      setErroExclusao('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setExcluindo(false);
    }
  }

  const podeConfirmar = senhaExclusao.length > 0 && confirmacaoTexto === 'EXCLUIR MINHA CONTA';

  if (loading) {
    return <p className="text-center py-16">Carregando...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#1E5AA8' }}>Minha Conta</h1>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}

      {/* Dados do usuário */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-lg font-bold mb-4" style={{ color: '#1E5AA8' }}>Dados Pessoais</h2>
        <p className="text-gray-700"><span className="font-medium">Nome:</span> {nome}</p>
        <p className="text-gray-700 mt-2"><span className="font-medium">E-mail:</span> {email}</p>
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={handleLogout}
            style={{ backgroundColor: '#F6A623' }}
            className="text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Sair da conta
          </button>
          <button
            onClick={abrirModalExclusao}
            className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Excluir minha conta
          </button>
        </div>
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

      {/* Modal de exclusão de conta */}
      {modalAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={fecharModalExclusao}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-2 text-red-600">Excluir minha conta</h2>
            <p className="text-gray-600 mb-4">Esta ação é <strong>irreversível</strong>. Antes de prosseguir, leia com atenção:</p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-gray-700">
              <ul className="list-disc pl-5 flex flex-col gap-1">
                <li>Seus dados pessoais (nome, e-mail, endereços) serão <strong>anonimizados</strong>.</li>
                <li>Seu histórico de pedidos será mantido apenas para fins fiscais, conforme a lei.</li>
                <li>Você será desconectado de todos os dispositivos.</li>
                <li>Esta ação não pode ser desfeita.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Confirme sua senha</label>
                <input
                  type="password"
                  value={senhaExclusao}
                  onChange={(e) => setSenhaExclusao(e.target.value)}
                  autoComplete="current-password"
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2"
                  style={{ borderColor: '#22D3E6' }}
                  placeholder="Sua senha atual"
                  disabled={excluindo}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Para confirmar, digite: <span className="font-bold">EXCLUIR MINHA CONTA</span>
                </label>
                <input
                  type="text"
                  value={confirmacaoTexto}
                  onChange={(e) => setConfirmacaoTexto(e.target.value)}
                  autoComplete="off"
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2"
                  style={{ borderColor: '#22D3E6' }}
                  placeholder="EXCLUIR MINHA CONTA"
                  disabled={excluindo}
                />
              </div>
            </div>

            {erroExclusao && (
              <p className="text-red-500 text-sm mb-4">{erroExclusao}</p>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={fecharModalExclusao}
                disabled={excluindo}
                className="px-6 py-2 rounded-full font-bold text-gray-700 bg-gray-200 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleExcluirConta}
                disabled={!podeConfirmar || excluindo}
                className="px-6 py-2 rounded-full font-bold text-white bg-red-600 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {excluindo ? 'Excluindo...' : 'Confirmar exclusão'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}