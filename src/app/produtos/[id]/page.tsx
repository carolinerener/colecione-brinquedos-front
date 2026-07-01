import BotaoCarrinho from '@/components/ui/BotaoCarrinho';

const imagensSeed: { [key: number]: string } = {
  1: '/blocodemontar.png',
  2: '/kitpintura.png',
  3: '/quebracabeca.png',
  4: '/torredeencaixe.png',
  5: '/massinha.png',
};

interface Produto {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string | null;
}

async function getProduto(id: string): Promise<Produto | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

function urlDaImagem(produto: Produto): string | null {
  if (produto.image) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const baseUrl = apiUrl?.replace('/api', '');
    return `${baseUrl}/storage/${produto.image}`;
  }
  return imagensSeed[produto.id] || null;
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

  const imagem = urlDaImagem(produto);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow p-8">

        {imagem && (
          <div className="mb-6">
            <img
              src={imagem}
              alt={produto.name}
              className="w-full h-72 object-contain rounded-xl"
            />
            <p className="text-xs text-gray-400 text-center mt-1">Imagem ilustrativa</p>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-4" style={{ color: '#1E5AA8' }}>
          {produto.name}
        </h1>

        <p className="text-gray-600 mb-6">{produto.description}</p>

        <p className="text-3xl font-bold mb-8" style={{ color: '#F6A623' }}>
          R$ {Number(produto.price).toFixed(2)}
        </p>

        <BotaoCarrinho produto={produto} />

      </div>
    </div>
  );
}