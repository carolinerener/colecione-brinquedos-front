async function getProduto(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProdutoDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const produto = await getProduto(id);

  if (!produto) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-gray-500">Produto não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow p-8">
        
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1E5AA8' }}>
          {produto.name}
        </h1>

        <p className="text-gray-600 mb-6">{produto.description}</p>

        <p className="text-3xl font-bold mb-8" style={{ color: '#F6A623' }}>
          R$ {Number(produto.price).toFixed(2)}
        </p>

        <button
          style={{ backgroundColor: '#22D3E6' }}
          className="text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
        >
          Adicionar ao Carrinho
        </button>

      </div>
    </div>
  );
}