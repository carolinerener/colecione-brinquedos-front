import Link from 'next/link';
import Image from 'next/image';

const imagensProdutos: { [key: number]: string } = {
  1: '/blocodemontar.png',
  2: '/kitpintura.png',
  3: '/quebracabeca.png',
  4: '/torredeencaixe.png',
  5: '/massinha.png',
};

async function getProdutos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.data || data;
}

export default async function ProdutosPage() {
  const produtos = await getProdutos();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#1E5AA8' }}>
        Nossos Produtos
      </h1>

      {produtos.length === 0 ? (
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto: { id: number; name: string; price: number; description: string }) => (
            <Link key={produto.id} href={`/produtos/${produto.id}`}>
              <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                {imagensProdutos[produto.id] && (
                  <div className="mb-4">
                    <Image
                      src={imagensProdutos[produto.id]}
                      alt={produto.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-contain rounded-xl"
                    />
                    <p className="text-xs text-gray-400 text-center mt-1">
                      Imagem ilustrativa
                    </p>
                  </div>
                )}
                <h2 className="text-lg font-bold mb-2" style={{ color: '#1E5AA8' }}>
                  {produto.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{produto.description}</p>
                <p className="text-xl font-bold" style={{ color: '#F6A623' }}>
                  R$ {Number(produto.price).toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}