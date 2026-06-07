export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#1E5AA8' }}>
          Brinquedos que fazem a diferença
        </h1>
        <p className="text-lg" style={{ color: '#1E5AA8' }}>
          Diversão que ensina — descubra nossa coleção de brinquedos educativos
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-5xl mb-4">🧩</div>
          <h2 className="text-lg font-bold" style={{ color: '#1E5AA8' }}>Jogos Educativos</h2>
          <p className="text-sm text-gray-500 mt-2">Estimule o raciocínio e a criatividade</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-5xl mb-4">🎨</div>
          <h2 className="text-lg font-bold" style={{ color: '#1E5AA8' }}>Arte e Criatividade</h2>
          <p className="text-sm text-gray-500 mt-2">Desperte o artista que existe em cada criança</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-5xl mb-4">🔬</div>
          <h2 className="text-lg font-bold" style={{ color: '#1E5AA8' }}>Ciência e Descoberta</h2>
          <p className="text-sm text-gray-500 mt-2">Explore o mundo com curiosidade</p>
        </div>
      </div>

    </div>
  );
}