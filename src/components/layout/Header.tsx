import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ backgroundColor: '#1E5AA8' }} className="text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2">
          <span style={{ color: '#22D3E6' }} className="text-2xl font-bold">
            Colecione
          </span>
          <span style={{ color: '#F6A623' }} className="text-2xl font-bold">
            Brinquedos
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-yellow-300 transition-colors">
            Início
          </Link>
          <Link href="/produtos" className="hover:text-yellow-300 transition-colors">
            Produtos
          </Link>
          <Link href="/categorias" className="hover:text-yellow-300 transition-colors">
            Categorias
          </Link>
          <Link href="/login" style={{ backgroundColor: '#22D3E6' }} className="text-white px-4 py-2 rounded-full font-bold hover:opacity-90 transition-opacity">
            Entrar
          </Link>
        </nav>

      </div>
    </header>
  );
}