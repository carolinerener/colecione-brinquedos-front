export default function PoliticaDeCookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#1E5AA8' }}>
        Política de Cookies
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Última atualização: [DATA DE PUBLICAÇÃO]
      </p>

      <div className="bg-white rounded-2xl shadow p-8 flex flex-col gap-6 text-gray-700 leading-relaxed">

        <section>
          <p>
            Esta Política de Cookies explica o que são cookies, como o website <strong>Colecione Brinquedos</strong> os utiliza,
            e como você pode gerenciá-los. Esta política é complementar à nossa Política de Privacidade.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>1. O que são cookies?</h2>
          <p>
            Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um site. Eles permitem
            que o site reconheça seu dispositivo e armazene algumas informações sobre suas preferências ou ações anteriores,
            melhorando a sua experiência de navegação.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>2. Cookies que utilizamos</h2>
          <p className="mb-3">
            Atualmente, utilizamos apenas <strong>cookies essenciais</strong>, ou seja, aqueles estritamente necessários para
            o funcionamento básico da loja:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>
              <strong>Token de autenticação:</strong> armazenado no armazenamento local do navegador (<em>localStorage</em>) para
              manter você logado durante a navegação. Sem ele, você precisaria fazer login a cada nova página.
            </li>
            <li>
              <strong>Carrinho de compras:</strong> também armazenado no <em>localStorage</em>, guarda os itens que você adicionou
              ao carrinho até a finalização da compra ou remoção manual.
            </li>
            <li>
              <strong>Identificação de tipo de usuário:</strong> armazena de forma local se você é cliente ou administrador,
              permitindo a exibição correta das funcionalidades disponíveis.
            </li>
            <li>
              <strong>Aceite desta Política:</strong> registra que você visualizou e aceitou o aviso de cookies, evitando
              que o banner reapareça a cada visita.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Não utilizamos cookies de marketing, publicidade, rastreamento de terceiros ou análise comportamental.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>3. Cookies de terceiros</h2>
          <p>
            Durante o processamento de pagamentos, você é redirecionado para a plataforma <strong>Mercado Pago</strong>, que
            possui sua própria política de cookies e privacidade. Recomendamos consultar a política do Mercado Pago para
            entender como seus dados são tratados durante o pagamento.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>4. Como gerenciar os cookies</h2>
          <p className="mb-3">
            Você pode gerenciar ou desabilitar cookies a qualquer momento nas configurações do seu navegador. Consulte
            as instruções do seu navegador:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Google Chrome: Configurações → Privacidade e segurança → Cookies e outros dados do site</li>
            <li>Mozilla Firefox: Configurações → Privacidade e segurança → Cookies e dados do site</li>
            <li>Safari: Preferências → Privacidade → Gerenciar dados de sites</li>
            <li>Microsoft Edge: Configurações → Cookies e permissões de site</li>
          </ul>
          <p className="mt-3">
            <strong>Atenção:</strong> desabilitar os cookies essenciais pode comprometer o funcionamento da loja,
            impedindo o login, a navegação e a finalização de compras.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>5. Alterações nesta política</h2>
          <p>
            Esta Política de Cookies pode ser atualizada periodicamente. Recomendamos a revisão regular desta página.
            A data da última atualização está indicada no topo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>6. Contato</h2>
          <p>
            Em caso de dúvidas sobre o uso de cookies, entre em contato pelo e-mail <strong>[E-MAIL DE CONTATO]</strong>.
          </p>
        </section>

      </div>
    </div>
  );
}