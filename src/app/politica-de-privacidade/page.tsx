export default function PoliticaDePrivacidadePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#1E5AA8' }}>
        Política de Privacidade
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Última atualização: [DATA DE PUBLICAÇÃO]
      </p>

      <div className="bg-white rounded-2xl shadow p-8 flex flex-col gap-6 text-gray-700 leading-relaxed">

        <section>
          <p>
            A sua privacidade é importante para nós. Esta Política de Privacidade descreve como a <strong>[NOME DA EMPRESA]</strong>,
            inscrita no CNPJ sob o nº <strong>[CNPJ]</strong>, com sede em <strong>[ENDEREÇO]</strong>,
            coleta, utiliza, armazena e protege os dados pessoais dos usuários da loja online <strong>Colecione Brinquedos</strong>,
            em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>1. Dados que coletamos</h2>
          <p className="mb-2">Coletamos os seguintes dados pessoais quando você utiliza nossa loja:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li><strong>Dados cadastrais:</strong> nome completo e e-mail (no momento do registro).</li>
            <li><strong>Dados de entrega:</strong> CEP, rua, número, complemento, bairro, cidade e estado (no momento da compra).</li>
            <li><strong>Dados de pedidos:</strong> produtos adquiridos, valor, data e status dos pedidos.</li>
            <li><strong>Dados de pagamento:</strong> processados diretamente pelo Mercado Pago. Não armazenamos dados de cartão de crédito em nossos servidores.</li>
            <li><strong>Dados de navegação:</strong> endereço IP e cookies essenciais para o funcionamento da loja (carrinho e sessão).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>2. Finalidade do tratamento</h2>
          <p className="mb-2">Utilizamos seus dados para:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Criar e gerenciar sua conta na loja;</li>
            <li>Processar pedidos, pagamentos e entregas;</li>
            <li>Enviar atualizações sobre o status dos seus pedidos;</li>
            <li>Cumprir obrigações legais e fiscais;</li>
            <li>Garantir a segurança da loja e prevenir fraudes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>3. Base legal</h2>
          <p>
            O tratamento dos seus dados é realizado com base nas seguintes hipóteses legais previstas na LGPD:
            execução de contrato (art. 7º, V), cumprimento de obrigação legal (art. 7º, II),
            legítimo interesse (art. 7º, IX) e consentimento (art. 7º, I) quando aplicável.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>4. Compartilhamento de dados</h2>
          <p className="mb-2">Compartilhamos seus dados apenas com terceiros estritamente necessários para a prestação dos serviços:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li><strong>Mercado Pago:</strong> processamento de pagamentos.</li>
            <li><strong>Correios e transportadoras:</strong> entrega dos pedidos.</li>
            <li><strong>Autoridades públicas:</strong> quando exigido por lei ou ordem judicial.</li>
          </ul>
          <p className="mt-2">Não vendemos nem alugamos seus dados pessoais para terceiros.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>5. Armazenamento e segurança</h2>
          <p>
            Seus dados são armazenados em servidores seguros, com acesso restrito e protegidos por medidas técnicas e organizacionais
            adequadas. As senhas são armazenadas de forma criptografada (hash). Mantemos seus dados pelo tempo necessário para
            cumprir as finalidades descritas nesta política ou conforme exigido por lei (ex: dados fiscais por 5 anos).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>6. Seus direitos como titular</h2>
          <p className="mb-2">A LGPD garante a você os seguintes direitos:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Confirmar a existência de tratamento dos seus dados;</li>
            <li>Acessar seus dados;</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
            <li>Solicitar a portabilidade dos dados;</li>
            <li>Revogar o consentimento;</li>
            <li>Solicitar a exclusão da conta e dos dados pessoais.</li>
          </ul>
          <p className="mt-2">
            Para exercer seus direitos, você pode acessar a área <strong>Minha Conta</strong> ou entrar em contato pelo e-mail
            <strong> [E-MAIL DE CONTATO]</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>7. Cookies</h2>
          <p>
            Utilizamos cookies essenciais para o funcionamento da loja, como manter você logado e armazenar os itens do
            carrinho. Você pode gerenciar os cookies nas configurações do seu navegador, mas isso pode afetar a experiência de uso.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>8. Encarregado de Proteção de Dados (DPO)</h2>
          <p>
            Em caso de dúvidas, solicitações ou reclamações relacionadas ao tratamento dos seus dados, entre em contato com nosso
            Encarregado de Proteção de Dados:
          </p>
          <p className="mt-2">
            <strong>Nome:</strong> [NOME DO ENCARREGADO]<br />
            <strong>E-mail:</strong> [E-MAIL DO DPO]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>9. Alterações nesta política</h2>
          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você a revise regularmente.
            A data da última atualização está indicada no topo desta página.
          </p>
        </section>

      </div>
    </div>
  );
}