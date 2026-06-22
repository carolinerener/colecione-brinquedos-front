export default function TermosDeUsoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#1E5AA8' }}>
        Termos e Condições de Compra
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Última atualização: [DATA DE PUBLICAÇÃO]
      </p>

      <div className="bg-white rounded-2xl shadow p-8 flex flex-col gap-6 text-gray-700 leading-relaxed">

        <section>
          <p>
            Bem-vindo(a) ao website <strong>Colecione Brinquedos</strong>, onde todos os produtos e serviços são ofertados pela
            empresa <strong>[NOME DA EMPRESA]</strong>, inscrita no CNPJ sob o nº <strong>[CNPJ]</strong>, com endereço na
            <strong> [ENDEREÇO]</strong>, <strong>[CIDADE]/[ESTADO]</strong>, CEP <strong>[CEP]</strong>, representada por meio
            desta página na web.
          </p>
          <p className="mt-3">
            Avisamos previamente que, ao acessar este site, você concorda tacitamente com as disposições contidas neste documento.
            Por isso, leia com atenção cada uma das cláusulas e obrigações dispostas a seguir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>1. Do objeto</h2>
          <p>
            Esta plataforma tem como finalidade o comércio eletrônico (e-commerce), ou seja, disponibilizar a venda online
            de brinquedos educativos e produtos infantis através do website Colecione Brinquedos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>2. Da reserva de produtos</h2>
          <p>
            <strong>2.1</strong> Nosso website não trabalha com nenhuma possibilidade de reservar produtos ofertados na plataforma.
          </p>
          <p className="mt-2">
            <strong>2.2</strong> O fato de o produto estar no carrinho de compras não é considerado uma reserva e não impossibilita
            que outras pessoas adquiram o produto enquanto o pagamento não é confirmado, podendo o estoque se esgotar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>3. Das obrigações do cliente</h2>
          <p className="mb-2">São obrigações do cliente:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Informar dados completos e corretos no momento do cadastro;</li>
            <li>Responsabilizar-se por qualquer erro de digitação ou transmissão errônea de dados;</li>
            <li>Realizar login com usuário e senha cadastrados para efetuar compras;</li>
            <li>Não compartilhar dados de login com terceiros, sob pena de responsabilização;</li>
            <li>Manter apenas um cadastro por CPF — não é aceito mais de uma conta por CPF;</li>
            <li>Utilizar a plataforma respeitando a ética, os bons costumes e a legislação vigente;</li>
            <li>Ser maior de 18 anos ou ter autorização dos responsáveis legais para realizar compras;</li>
            <li>Não enviar comentários ou avaliações de conteúdo ofensivo, difamatório, preconceituoso ou de ódio;</li>
            <li>Fornecer apenas informações verdadeiras e correspondentes aos seus dados reais.</li>
          </ul>
          <p className="mt-3 text-sm">
            <strong>3.1</strong> Caso um menor de idade ou pessoa sem capacidade civil plena adquira algum produto, entenderemos que
            os responsáveis autorizaram a compra, respondendo estes por toda e qualquer situação decorrente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>4. Das obrigações da loja</h2>
          <p className="mb-2">A loja se compromete a:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1">
            <li>Informar de forma ostensiva e verdadeira as características e especificações dos produtos (cores, dimensões, materiais, faixa etária recomendada, etc.);</li>
            <li>Enviar os produtos dentro do prazo estabelecido na confirmação do pedido;</li>
            <li>Disponibilizar uma plataforma segura e protegida;</li>
            <li>Exibir imagens condizentes com o produto real entregue;</li>
            <li>Emitir e enviar a nota fiscal junto do produto;</li>
            <li>Informar instruções de uso, manuseio e cuidados quando aplicáveis.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>5. Isenção de responsabilidade</h2>
          <p>
            <strong>5.1</strong> Não nos responsabilizamos pelo mau uso ou manuseio incorreto dos produtos, nem por danos decorrentes
            de instalação inadequada.
          </p>
          <p className="mt-2">
            <strong>5.2</strong> Todos os produtos comercializados estão dentro dos padrões e condições de fábrica ou do distribuidor.
          </p>
          <p className="mt-2">
            <strong>5.3</strong> Fornecemos todas as informações pertinentes ao produto, acompanhadas de instruções de uso quando aplicável.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>6. Da propriedade intelectual</h2>
          <p>
            <strong>6.1</strong> Todo o design, paginação, layout e código-fonte são de propriedade do website Colecione Brinquedos.
          </p>
          <p className="mt-2">
            <strong>6.2</strong> Toda imagem, ilustração, vídeo, áudio, nome comercial, software ou conteúdo disponibilizado na plataforma
            é de nossa propriedade ou utilizado mediante licença.
          </p>
          <p className="mt-2">
            <strong>6.2.1</strong> As imagens são meramente ilustrativas; dependendo do monitor ou tela do aparelho, pode haver variação de cores ou tons.
          </p>
          <p className="mt-2">
            <strong>6.3</strong> A logo, a marca e a identidade visual são de propriedade da <strong>[NOME DA EMPRESA]</strong>.
          </p>
          <p className="mt-2">
            <strong>6.4</strong> É vedada a cópia, reprodução, distribuição ou modificação não autorizada de qualquer conteúdo do site,
            sob pena de responder pelas sanções legais cabíveis.
          </p>
          <p className="mt-2">
            <strong>6.5</strong> Não nos responsabilizamos por links externos que eventualmente apareçam em nossa página.
            A navegação por essas páginas é de responsabilidade do usuário.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>7. Formas de pagamento</h2>
          <p>
            <strong>7.1</strong> Os pagamentos são processados pelo <strong>Mercado Pago</strong>, que oferece as seguintes opções:
            cartão de crédito, cartão de débito, Pix e boleto bancário.
          </p>
          <p className="mt-2">
            <strong>7.2</strong> O boleto bancário pode ser emitido no momento da compra e tem vencimento na data nele indicada.
            Caso o pagamento não seja efetuado até o vencimento, o produto retorna ao estoque e uma nova compra deve ser realizada.
          </p>
          <p className="mt-2">
            <strong>7.3</strong> O envio do produto ocorre somente após a confirmação do pagamento.
          </p>
          <p className="mt-2">
            <strong>7.4</strong> Não armazenamos dados de cartão de crédito em nossos servidores — todo o processamento é feito de forma
            segura pelo Mercado Pago.
          </p>
          <p className="mt-2">
            <strong>7.5</strong> Cupons de desconto, quando disponibilizados, estão sujeitos a esgotamento ou cancelamento a qualquer momento.
          </p>
          <p className="mt-2">
            <strong>7.6</strong> O parcelamento em mais de uma vez está sujeito aos juros da operadora do cartão.
          </p>
          <p className="mt-2">
            <strong>7.7</strong> Para solicitar estorno, entre em contato pelo e-mail <strong>[E-MAIL DE CONTATO]</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>8. Entrega e envio do produto</h2>
          <p>
            <strong>8.1</strong> O produto é enviado em até 3 dias úteis após a confirmação do pagamento.
          </p>
          <p className="mt-2">
            <strong>8.2</strong> Os custos de envio são apresentados na finalização da compra, após o cliente informar o endereço e CEP.
          </p>
          <p className="mt-2">
            <strong>8.3</strong> As entregas são realizadas pelos Correios ou por transportadoras parceiras, em todo o território nacional.
          </p>
          <p className="mt-2">
            <strong>8.4</strong> Eventuais atrasos por parte das transportadoras ou em razão de eventos imprevistos (greves, condições climáticas,
            etc.) fogem ao nosso controle.
          </p>
          <p className="mt-2">
            <strong>8.5</strong> O endereço de entrega deve ser informado corretamente pelo cliente; reentregas em razão de endereço incorreto
            podem gerar custos adicionais.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>9. Troca e devolução</h2>
          <p>
            <strong>9.1</strong> De acordo com o Código de Defesa do Consumidor (Lei nº 8.078/90, art. 49), o cliente tem o prazo de
            <strong> 7 (sete) dias corridos</strong>, contados a partir do recebimento do produto, para exercer o direito de arrependimento.
          </p>
          <p className="mt-2">
            <strong>9.1.1</strong> Para que ocorra a troca ou devolução, o produto deve estar em sua embalagem original, com todos os
            acessórios, manuais e caixa, sem indícios de uso.
          </p>
          <p className="mt-2">
            <strong>9.1.2</strong> Não serão aceitas trocas ou devoluções de produtos com marcas de uso (riscos, trincos, sinais de queda, etc.).
          </p>
          <p className="mt-2">
            <strong>9.2</strong> Em caso de troca, o novo produto será enviado ao endereço cadastrado e o cliente notificado por e-mail.
          </p>
          <p className="mt-2">
            <strong>9.3</strong> Em caso de reembolso, a devolução ocorrerá pela mesma forma de pagamento utilizada:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-1 mt-2">
            <li>Cartão de crédito ou débito: estorno na fatura atual ou seguinte, conforme prazo da administradora;</li>
            <li>Pix ou boleto: ressarcimento em até 30 dias úteis em conta bancária informada pelo cliente.</li>
          </ul>
          <p className="mt-2">
            <strong>9.4</strong> Para iniciar uma troca ou devolução, entre em contato pelo e-mail <strong>[E-MAIL DE CONTATO]</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>10. Política de Privacidade e Proteção de Dados</h2>
          <p>
            O tratamento dos seus dados pessoais é regido pela nossa <strong>Política de Privacidade</strong>, disponível no rodapé do site,
            que é parte integrante destes Termos de Uso e está em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>11. Alterações nestes Termos</h2>
          <p>
            Estes Termos podem ser atualizados a qualquer momento. Recomendamos a revisão periódica desta página. A data da última atualização
            está indicada no topo. O uso continuado da loja após alterações implica na aceitação dos novos Termos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>12. Do foro</h2>
          <p>
            Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de
            <strong> [CIDADE/ESTADO]</strong> para dirimir quaisquer controvérsias decorrentes destes Termos, com renúncia a qualquer outro,
            por mais privilegiado que seja.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1E5AA8' }}>13. Contato</h2>
          <p>
            Em caso de dúvidas sobre estes Termos, entre em contato pelo e-mail <strong>[E-MAIL DE CONTATO]</strong>.
          </p>
        </section>

        <section className="border-t pt-4 mt-2">
          <p className="text-xs text-gray-500 italic">
            Este documento foi elaborado com base em modelo desenvolvido pelo advogado <strong>Diego Castro</strong> (OAB/PI 15.613),
            especialista em Direito Digital e LGPD, disponibilizado sob licença <strong>Creative Commons Attribution-NonCommercial 4.0
            International (CC BY-NC)</strong>, com adaptações para o contexto da loja Colecione Brinquedos.
          </p>
        </section>

      </div>
    </div>
  );
}