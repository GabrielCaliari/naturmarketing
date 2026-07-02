import type { Metadata } from "next";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LEGAL_CONFIG } from "@/constants/legal-pages";
import { COMPANY_NAP } from "@/constants/company";

export const metadata: Metadata = {
  title: "Política de Privacidade | Réserve — Agência de Marketing para Hotéis",
  description:
    "Política de Privacidade da Réserve Marketing Digital, agência especializada em marketing hoteleiro. Saiba como coletamos, usamos e protegemos seus dados conforme a LGPD.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        {/* Hero */}
        <section className="py-20 md:py-32 text-white" style={{ background: "#1A0F08" }}>
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Política de Privacidade</h1>
            <div className="w-24 h-0.5 mx-auto mb-8" style={{ background: "#84936f" }} />
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              Transparência e proteção dos seus dados pessoais
            </p>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-16 md:py-24" style={{ background: "#F7F3EE" }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-10 text-gray-700 text-base leading-relaxed">

              <p className="text-sm text-gray-500">
                <strong>Data de vigência:</strong> {today}
              </p>

              <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>1. Introdução</h2>
                <p className="text-gray-600 mb-4">
                  Bem-vindo à Réserve. Esta Política de Privacidade descreve como a Réserve Marketing Digital,
                  uma agência especializada em marketing hoteleiro, coleta, armazena, utiliza e protege suas
                  informações ao usar nossos serviços de marketing digital, sites e outros serviços associados
                  (coletivamente, os &quot;Serviços&quot;).
                </p>
                <div className="p-4 rounded-xl border-l-4" style={{ background: "#F0EBE3", borderColor: "#84936f" }}>
                  <p className="text-gray-700 text-sm">
                    <strong>Controlador dos Dados:</strong> A Réserve Marketing Digital, com sede em Minas Gerais,
                    é a responsável pelo tratamento dos dados pessoais coletados através dos nossos Serviços,
                    nos termos da Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>2. Aceitação desta Política</h2>
                <p className="text-gray-600">
                  Ao acessar ou utilizar nossos Serviços, você declara que leu, compreendeu e concorda com esta
                  Política. Se você não concorda com qualquer parte desta Política, não deve usar ou acessar os Serviços.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>3. Informações Coletadas</h2>
                <p className="text-gray-600 mb-3">
                  Ao acessar ou usar nossos Serviços, podemos coletar as seguintes informações:
                </p>
                <h3 className="font-semibold mb-2 text-gray-800">A. Informações que Você Fornece Diretamente</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-1 mb-4">
                  <li>Informações de contato: nome, e-mail, telefone fornecidos em formulários.</li>
                  <li>Informações do negócio: nome do hotel, pousada ou resort, localização e número de quartos.</li>
                  <li>Comunicações: mensagens e solicitações de consultoria enviadas pelos nossos canais.</li>
                </ul>
                <h3 className="font-semibold mb-2 text-gray-800">B. Informações Coletadas Automaticamente</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-1">
                  <li>Dados de navegação: páginas acessadas, tempo de permanência e padrões de uso.</li>
                  <li>Dados do dispositivo: tipo de dispositivo, navegador e sistema operacional.</li>
                  <li>Endereço IP para fins de segurança e análise de tráfego.</li>
                  <li>Cookies e tecnologias de rastreamento para melhorar a experiência.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>4. Como Utilizamos as Informações</h2>
                <ul className="list-disc ml-6 text-gray-600 space-y-1">
                  <li><strong>Prestação de serviços:</strong> operar e aprimorar nossos serviços de marketing digital.</li>
                  <li><strong>Comunicação:</strong> enviar atualizações e informações relacionadas aos serviços contratados.</li>
                  <li><strong>Suporte:</strong> responder dúvidas e fornecer atendimento ao cliente.</li>
                  <li><strong>Análise:</strong> entender como os usuários interagem com nossos serviços.</li>
                  <li><strong>Cumprimento legal:</strong> cumprir obrigações legais e regulatórias.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>5. Compartilhamento de Informações</h2>
                <p className="text-gray-600 mb-3">
                  A Réserve não compartilha suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:
                </p>
                <ul className="list-disc ml-6 text-gray-600 space-y-1">
                  <li><strong>Prestadores de serviços:</strong> fornecedores que auxiliam na operação dos nossos serviços (hospedagem, Google Ads, Meta Ads, etc.), em conformidade com esta Política.</li>
                  <li><strong>Requisitos legais:</strong> quando exigido por lei ou em resposta a processos legais.</li>
                  <li><strong>Proteção de direitos:</strong> quando necessário para proteger nossos direitos ou a segurança de terceiros.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>6. Cookies</h2>
                <p className="text-gray-600 mb-3">
                  Utilizamos cookies para melhorar sua experiência, analisar o uso dos nossos serviços e personalizar conteúdo:
                </p>
                <ul className="list-disc ml-6 text-gray-600 space-y-1">
                  <li><strong>Cookies essenciais:</strong> necessários para o funcionamento básico do site.</li>
                  <li><strong>Cookies de análise:</strong> para entender como os visitantes interagem com o site (Google Analytics).</li>
                  <li><strong>Cookies de marketing:</strong> para personalizar anúncios e medir campanhas (Google Ads, Meta Pixel).</li>
                </ul>
                <p className="text-gray-600 mt-3 text-sm">
                  Você pode gerenciar suas preferências de cookies através do banner exibido ao acessar o site ou nas configurações do seu navegador.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>7. Seus Direitos (LGPD)</h2>
                <p className="text-gray-600 mb-3">
                  De acordo com a LGPD, você possui os seguintes direitos:
                </p>
                <ul className="list-disc ml-6 text-gray-600 space-y-1">
                  <li><strong>Acesso:</strong> solicitar acesso aos dados que mantemos sobre você.</li>
                  <li><strong>Correção:</strong> solicitar a correção de dados incompletos ou desatualizados.</li>
                  <li><strong>Eliminação:</strong> solicitar a exclusão de dados desnecessários.</li>
                  <li><strong>Portabilidade:</strong> solicitar a transferência dos seus dados a outro fornecedor.</li>
                  <li><strong>Revogação do consentimento:</strong> revogar o consentimento para o tratamento de dados.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>8. Segurança e Retenção</h2>
                <p className="text-gray-600">
                  Implementamos medidas técnicas e organizacionais para proteger suas informações contra acesso não
                  autorizado. Os dados são retidos apenas pelo tempo necessário para cumprir os propósitos para os
                  quais foram coletados, incluindo obrigações legais.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>9. Contato</h2>
                <p className="text-gray-600 mb-4">
                  Para dúvidas, solicitações ou exercício dos seus direitos, entre em contato:
                </p>
                <div className="p-4 rounded-xl" style={{ background: "#F0EBE3" }}>
                  <p className="text-gray-700 text-sm">
                    <strong>E-mail:</strong>{" "}
                    <a href={`mailto:${LEGAL_CONFIG.COMPANY_EMAIL}`} className="hover:underline" style={{ color: "#84936f" }}>
                      {LEGAL_CONFIG.COMPANY_EMAIL}
                    </a>
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    <strong>Telefone:</strong>{" "}
                    <a href={LEGAL_CONFIG.COMPANY_PHONE.href} className="hover:underline" style={{ color: "#84936f" }}>
                      {LEGAL_CONFIG.COMPANY_PHONE.display}
                    </a>
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    <strong>Instagram:</strong>{" "}
                    <a href={COMPANY_NAP.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#84936f" }}>
                      @reserve.marketinghoteleiro
                    </a>
                  </p>
                </div>
                <p className="text-gray-500 text-sm mt-4">
                  Esta Política foi atualizada pela última vez em {today}.
                </p>
              </section>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
