"use client";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-[#003D5C] via-[#0066A1] to-[#003D5C] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Política de Privacidade
              </h1>
              <div className="w-32 h-1 bg-white mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Transparência e proteção dos seus dados pessoais
              </p>
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-none shadow-xl bg-white">
                <CardContent className="p-8 md:p-12">
                  <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                    <p className="text-gray-700 mb-6">
                      <strong>Data de vigência:</strong> {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">1. Introdução</h2>
                      <p className="text-gray-600 mb-4">
                        Bem-vindo à Natur. Esta Política de Privacidade (&quot;Política&quot;) descreve como a Natur, 
                        uma agência de marketing digital especializada no setor hoteleiro, coleta, armazena, utiliza e 
                        protege suas informações ao usar nossos serviços de marketing digital, sites e outros serviços 
                        associados (coletivamente, os &quot;Serviços&quot;).
                      </p>
                      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-[#0066A1]">
                        <p className="text-gray-700">
                          <strong>Controlador dos Dados:</strong> A Natur Marketing Hoteleiro, inscrita no CNPJ nº 
                          [XX.XXX.XXX/0001-XX], com sede em [Cidade/UF], é a responsável pelo tratamento dos dados pessoais 
                          coletados através dos nossos Serviços, nos termos da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                        </p>
                      </div>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">2. Aceitação desta Política</h2>
                      <p className="text-gray-600">
                        Ao acessar ou utilizar nossos Serviços, você declara que leu, compreendeu e concorda com esta 
                        Política e com nossos Termos de Serviço. Se você não concorda com qualquer parte desta Política, 
                        não deve usar ou acessar os Serviços.
                      </p>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">3. Alterações a esta Política</h2>
                      <p className="text-gray-600">
                        Podemos modificar esta Política periodicamente. Notificaremos você sobre alterações significativas 
                        por meio do e-mail fornecido ou por meio de aviso em nossos Serviços, antes que as mudanças entrem 
                        em vigor. O uso contínuo dos Serviços após a efetivação das alterações constitui sua aceitação da 
                        Política modificada.
                      </p>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">4. Informações Coletadas</h2>
                      <p className="text-gray-600 mb-4">
                        &quot;Informações pessoais&quot; referem-se a quaisquer dados que identifiquem ou possam identificar 
                        um indivíduo. Ao acessar ou usar nossos Serviços, podemos coletar as seguintes informações pessoais:
                      </p>
                      <h3 className="text-xl font-semibold mt-4 mb-3 text-[#003D5C]">A. Informações que Você Fornece Diretamente</h3>
                      <ul className="list-disc ml-6 text-gray-600 space-y-2">
                        <li>Informações de Contato: como endereço de e-mail, número de telefone, nome completo e outras informações de contato fornecidas em formulários de contato.</li>
                        <li>Informações de Negócio: como nome do hotel, pousada ou resort, localização, número de quartos e outras informações relacionadas ao seu empreendimento.</li>
                        <li>Informações de Comunicação: como mensagens, solicitações de consultoria e outras comunicações que você envia através dos nossos canais de contato.</li>
                        <li>Informações de Suporte ao Cliente: como detalhes fornecidos ao entrar em contato conosco para suporte técnico ou atendimento ao cliente.</li>
                      </ul>
                      <h3 className="text-xl font-semibold mt-4 mb-3 text-[#003D5C]">B. Informações Coletadas Automaticamente</h3>
                      <ul className="list-disc ml-6 text-gray-600 space-y-2">
                        <li>Informações de Navegação: como URLs visitadas, páginas acessadas, tempo de permanência e padrões de navegação.</li>
                        <li>Informações do Dispositivo: como tipo de dispositivo, navegador, sistema operacional e resolução de tela.</li>
                        <li>Endereço IP: coletamos seu endereço IP para fins de segurança e análise de tráfego.</li>
                        <li>Cookies e Tecnologias Similares: utilizamos cookies e tecnologias de rastreamento para melhorar sua experiência e analisar o uso dos nossos serviços.</li>
                      </ul>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">5. Base Legal para Tratamento de Dados</h2>
                      <p className="text-gray-600 mb-4">
                        Tratamos os dados pessoais com base nas seguintes hipóteses legais previstas na LGPD:
                      </p>
                      <ul className="list-disc ml-6 text-gray-600 space-y-2">
                        <li><strong>Consentimento do Titular:</strong> Quando você nos fornece seus dados através de formulários de contato, solicitações de consultoria ou outras formas de comunicação voluntária.</li>
                        <li><strong>Execução de Contrato ou Procedimentos Preliminares:</strong> Quando necessário para execução de contratos de prestação de serviços de marketing digital ou para atender solicitações pré-contratuais.</li>
                        <li><strong>Cumprimento de Obrigação Legal ou Regulatória:</strong> Quando necessário para cumprir obrigações legais, fiscais, contábeis ou regulatórias aplicáveis.</li>
                        <li><strong>Proteção do Crédito:</strong> Para análise de crédito e verificação de dados cadastrais, quando aplicável.</li>
                        <li><strong>Interesses Legítimos:</strong> Para atender aos interesses legítimos da Natur, como melhoria de serviços, análise de dados agregados, segurança da informação e comunicação comercial relevante, sempre respeitando os direitos e liberdades fundamentais do titular.</li>
                      </ul>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">6. Como Utilizamos as Informações Coletadas</h2>
                      <ul className="list-disc ml-6 text-gray-600 space-y-2">
                        <li><strong>Fornecer e Melhorar os Serviços:</strong> Utilizamos os dados coletados para operar, manter e aprimorar nossos serviços de marketing digital, garantindo uma experiência personalizada e eficiente.</li>
                        <li><strong>Comunicação:</strong> Enviamos notificações, atualizações e mensagens relacionadas aos nossos serviços de marketing digital.</li>
                        <li><strong>Suporte ao Cliente:</strong> Utilizamos suas informações para responder a solicitações, dúvidas e fornecer suporte técnico quando necessário.</li>
                        <li><strong>Análise e Pesquisa:</strong> Realizamos análises para entender melhor como os usuários interagem com nossos serviços, visando melhorar e desenvolver novos recursos.</li>
                        <li><strong>Cumprimento Legal:</strong> Utilizamos suas informações conforme necessário para cumprir obrigações legais, resolver disputas e fazer cumprir nossos acordos.</li>
                      </ul>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">7. Compartilhamento de Informações</h2>
                      <p className="text-gray-600 mb-4">
                        A Natur não compartilha suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:
                      </p>
                      <ul className="list-disc ml-6 text-gray-600 space-y-2">
                        <li><strong>Prestadores de Serviços:</strong> Podemos compartilhar informações com fornecedores terceirizados que auxiliam na operação dos nossos serviços, como serviços de hospedagem, processamento de dados, plataformas de publicidade digital (Google Ads, Meta Ads, etc.), desde que estejam em conformidade com esta Política de Privacidade e sigam padrões adequados de proteção de dados.</li>
                        <li><strong>Parceiros de Negócio:</strong> Quando necessário para execução de serviços contratados, podemos compartilhar informações com parceiros como plataformas de reserva (Booking.com, Expedia, etc.), redes sociais e outras ferramentas de marketing digital utilizadas em seus projetos.</li>
                        <li><strong>Requisitos Legais:</strong> Divulgaremos informações pessoais quando exigido por lei ou em resposta a processos legais, como intimações ou ordens judiciais.</li>
                        <li><strong>Proteção de Direitos:</strong> Quando acreditarmos que a divulgação é necessária para proteger nossos direitos, sua segurança ou a segurança de outros, investigar fraudes ou responder a uma solicitação governamental.</li>
                      </ul>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">8. Links Externos e Parceiros</h2>
                      <p className="text-gray-600 mb-4">
                        Nossos Serviços podem conter links para sites de terceiros, incluindo plataformas de publicidade 
                        (Google, Meta, etc.), plataformas de reserva (Booking.com, Expedia, etc.), redes sociais e outras 
                        ferramentas utilizadas em nossos serviços de marketing digital.
                      </p>
                      <p className="text-gray-600 mb-4">
                        A Natur não é responsável pelas práticas de privacidade ou pelo conteúdo desses sites de terceiros. 
                        Recomendamos que você leia as políticas de privacidade desses sites antes de fornecer qualquer dado 
                        pessoal ou interagir com eles.
                      </p>
                      <p className="text-gray-600">
                        Ao utilizar nossos serviços de marketing digital, você pode ser direcionado para plataformas de 
                        terceiros. Essas plataformas têm suas próprias políticas de privacidade e termos de uso, e você 
                        deve revisá-las antes de fornecer informações pessoais.
                      </p>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">9. Armazenamento e Localização dos Dados</h2>
                      <p className="text-gray-600 mb-4">
                        Os dados pessoais coletados são armazenados em servidores seguros mantidos por provedores de serviços 
                        de nuvem que seguem padrões internacionais de segurança da informação.
                      </p>
                      <p className="text-gray-600 mb-4">
                        Os dados podem ser armazenados em servidores localizados no Brasil e no exterior, mantidos por 
                        provedores como Google Cloud, Amazon Web Services (AWS) ou outros provedores similares, que 
                        implementam medidas de segurança físicas e técnicas adequadas para proteção dos dados.
                      </p>
                      <p className="text-gray-600">
                        Todas as transferências internacionais de dados são realizadas em conformidade com a LGPD e com 
                        cláusulas contratuais padrão ou outros mecanismos legais adequados para garantir a proteção dos 
                        dados pessoais.
                      </p>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">10. Segurança das Informações</h2>
                      <p className="text-gray-600">
                        Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais 
                        contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de 
                        transmissão ou armazenamento eletrônico é totalmente seguro, e não podemos garantir a segurança 
                        absoluta dos dados.
                      </p>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">11. Retenção de Dados</h2>
                      <p className="text-gray-600">
                        Reteremos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos para 
                        os quais foram coletadas, incluindo obrigações legais, resolução de disputas e aplicação de nossos 
                        acordos. Após o término do período de retenção, os dados serão eliminados de forma segura, exceto 
                        quando a conservação for exigida por lei ou quando houver necessidade de preservação para 
                        exercício regular de direitos.
                      </p>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">12. Seus Direitos (LGPD)</h2>
                      <p className="text-gray-600 mb-4">
                        De acordo com a Lei Geral de Proteção de Dados (LGPD), você possui os seguintes direitos em relação 
                        às suas informações pessoais:
                      </p>
                      <ul className="list-disc ml-6 text-gray-600 space-y-2">
                        <li><strong>Acesso:</strong> Direito de solicitar acesso aos dados pessoais que mantemos sobre você.</li>
                        <li><strong>Correção:</strong> Direito de solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
                        <li><strong>Eliminação:</strong> Direito de solicitar a exclusão de dados desnecessários ou excessivos.</li>
                        <li><strong>Portabilidade:</strong> Direito de solicitar a transferência de seus dados a outro fornecedor de serviço, mediante requisição expressa.</li>
                        <li><strong>Informação sobre Compartilhamento:</strong> Direito de ser informado sobre as entidades públicas e privadas com as quais realizamos uso compartilhado de dados.</li>
                        <li><strong>Revogação do Consentimento:</strong> Direito de revogar o consentimento para o tratamento de dados, quando aplicável.</li>
                      </ul>
                      <p className="text-gray-600 mt-4">
                        Para exercer seus direitos, entre em contato conosco através dos canais fornecidos na seção de Contato desta Política.
                      </p>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">13. Cookies e Tecnologias de Rastreamento</h2>
                      <p className="text-gray-600 mb-4">
                        Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso dos nossos 
                        serviços e personalizar conteúdo. Os cookies são pequenos arquivos de texto armazenados no seu 
                        dispositivo quando você visita nosso site.
                      </p>
                      <p className="text-gray-600 mb-4">
                        Utilizamos os seguintes tipos de cookies:
                      </p>
                      <ul className="list-disc ml-6 text-gray-600 space-y-2">
                        <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site.</li>
                        <li><strong>Cookies de Análise:</strong> Para entender como os visitantes interagem com nosso site (Google Analytics, etc.).</li>
                        <li><strong>Cookies de Marketing:</strong> Para personalizar anúncios e medir a eficácia de campanhas (Google Ads, Meta Pixel, etc.).</li>
                      </ul>
                      <p className="text-gray-600 mt-4">
                        Você pode gerenciar suas preferências de cookies através das configurações do seu navegador. 
                        Note que desabilitar certos cookies pode afetar a funcionalidade do site.
                      </p>
                    </section>

                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4 text-[#003D5C]">14. Contato</h2>
                      <p className="text-gray-600 mb-4">
                        Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade ou 
                        ao tratamento de seus dados pessoais, entre em contato conosco:
                      </p>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-gray-700">
                          <strong>WhatsApp:</strong> <a href="https://wa.me/5535998067432" className="text-[#0066A1] hover:underline">+55 35 99806-7432</a>
                        </p>
                        <p className="text-gray-700 mt-2">
                          <strong>E-mail:</strong> <a href="mailto:contato@agencianatur.com.br" className="text-[#0066A1] hover:underline">contato@agencianatur.com.br</a>
                        </p>
                      </div>
                      <p className="text-gray-600 mt-4">
                        Esta Política de Privacidade foi atualizada pela última vez em {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}.<br />
                        Este documento visa fornecer transparência sobre como suas informações são tratadas pela Natur e 
                        assegurar nosso compromisso com a proteção de seus dados pessoais.
                      </p>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
