export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1E5AA8' }} className="text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div>
            <span style={{ color: '#22D3E6' }} className="text-xl font-bold">
              Colecione
            </span>
            <span style={{ color: '#F6A623' }} className="text-xl font-bold">
              {' '}Brinquedos
            </span>
            <p className="text-sm mt-1 opacity-75">Diversão que ensina</p>
          </div>

          <div className="text-sm opacity-75 text-center">
            <p>© {new Date().getFullYear()} Colecione Brinquedos.</p>
            <p>Todos os direitos reservados.</p>
          </div>

        </div>

      </div>
    </footer>
  );
}