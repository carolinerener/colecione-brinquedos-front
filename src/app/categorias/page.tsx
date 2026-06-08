async function getCategorias() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.data || data;
}

export default async function CategoriasPage() {
  const categorias = await getCategorias();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#1E5AA8' }}>
        Categorias
      </h1>

      {categorias.length === 0 ? (
        <p className="text-gray-500">Nenhuma categoria encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorias.map((categoria: { id: number; name: string; slug: string }) => (
            <div key={categoria.id} className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition-shadow">
              <h2 className="text-lg font-bold" style={{ color: '#1E5AA8' }}>
                {categoria.name}
              </h2>
              <p className="text-sm mt-2" style={{ color: '#22D3E6' }}>
                /{categoria.slug}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}