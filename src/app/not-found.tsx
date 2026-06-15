import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-8xl mb-4">🧸</p>
      <h1 className="text-6xl font-bold mb-2" style={{ color: '#1E5AA8' }}>404</h1>
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#F6A623' }}>
        Ops! Página não encontrada
      </h2>
      <p className="text-gray-500 mb-8">
        Parece que esse brinquedo se perdeu no caminho. Que tal voltar e explorar nossa coleção?
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/">
          <button
            style={{ backgroundColor: '#22D3E6' }}
            className="text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Voltar ao Início
          </button>
        </Link>
        <Link href="/produtos">
          <button
            style={{ backgroundColor: '#1E5AA8' }}
            className="text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Ver Produtos
          </button>
        </Link>
      </div>
    </div>
  );
}