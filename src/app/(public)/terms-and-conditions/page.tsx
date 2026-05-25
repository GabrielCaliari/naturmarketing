import React from "react";
import type { Metadata } from "next";
import { LEGAL_CONFIG } from "@/constants/legal-pages";

export const metadata: Metadata = {
  title: "Termos e Condições | Réserve — Agência de Marketing para Hotéis",
  description:
    "Termos e Condições de Uso do site e dos serviços da Réserve Marketing Digital, agência especializada em marketing hoteleiro.",
  alternates: { canonical: "/terms-and-conditions" },
  robots: { index: true, follow: true },
};

export default function TermsAndConditions() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "#1A0F08" }}>
        Termos e Condições de Uso
      </h1>
      <p className="text-sm mb-10" style={{ color: "#7a6a5e" }}>
        Última atualização: 25 de maio de 2026
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>
          1. Identificação
        </h2>
        <p className="leading-relaxed" style={{ color: "#5a4a3e" }}>
          O site <strong>reservemkt.com.br</strong> é operado por{" "}
          <strong>{LEGAL_CONFIG.COMPANY_NAME} Marketing Digital LTDA</strong>{" "}
          (&quot;Réserve&quot;, &quot;nós&quot; ou &quot;nosso&quot;), com sede em{" "}
          {LEGAL_CONFIG.COMPANY_ADDRESS.street},{" "}
          {LEGAL_CONFIG.COMPANY_ADDRESS.city} –{" "}
          {LEGAL_CONFIG.COMPANY_ADDRESS.state},{" "}
          {LEGAL_CONFIG.COMPANY_ADDRESS.zip}.
        </p>
        <p className="leading-relaxed mt-3" style={{ color: "#5a4a3e" }}>
          Dúvidas ou solicitações podem ser enviadas para{" "}
          <a
            href={`mailto:${LEGAL_CONFIG.COMPANY_EMAIL}`}
            className="hover:underline"
            style={{ color: "#84936f" }}
          >
            {LEGAL_CONFIG.COMPANY_EMAIL}
          </a>
          .
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>
          2. Aceitação dos Termos
        </h2>
        <p className="leading-relaxed" style={{ color: "#5a4a3e" }}>
          Ao acessar ou utilizar este site, você concorda com estes Termos e
          Condições e com nossa Política de Privacidade. Se não concordar com
          qualquer disposição, pedimos que não utilize os serviços oferecidos
          neste endereço.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>
          3. Serviços Oferecidos
        </h2>
        <p className="leading-relaxed" style={{ color: "#5a4a3e" }}>
          A Réserve é uma agência de marketing digital especializada no setor
          hoteleiro. Por meio deste site, apresentamos e comercializamos serviços
          de:
        </p>
        <ul className="list-disc ml-6 mt-3 space-y-1" style={{ color: "#5a4a3e" }}>
          <li>Gestão de tráfego pago (Google Hotel Ads, Meta Ads)</li>
          <li>SEO para hotéis, resorts e pousadas</li>
          <li>Estratégias para aumento de reservas diretas</li>
          <li>Criação e otimização de sites para meios de hospedagem</li>
          <li>Consultoria em marketing hoteleiro</li>
        </ul>
        <p className="leading-relaxed mt-3" style={{ color: "#5a4a3e" }}>
          As condições específicas de cada contrato de prestação de serviços são
          estabelecidas em proposta comercial e contrato assinado entre as partes.
          Estes Termos regem exclusivamente o uso do site.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>
          4. Uso do Site
        </h2>
        <p className="leading-relaxed" style={{ color: "#5a4a3e" }}>
          Você concorda em utilizar este site exclusivamente para fins lícitos e
          de acordo com a legislação brasileira aplicável. É proibido:
        </p>
        <ul className="list-disc ml-6 mt-3 space-y-1" style={{ color: "#5a4a3e" }}>
          <li>
            Utilizar técnicas de raspagem (scraping), bots ou automações não
            autorizadas para coletar conteúdo do site;
          </li>
          <li>
            Reproduzir, distribuir ou modificar qualquer conteúdo sem
            autorização prévia e por escrito da Réserve;
          </li>
          <li>
            Transmitir vírus, malware ou qualquer código malicioso;
          </li>
          <li>
            Tentar obter acesso não autorizado a sistemas ou servidores
            associados ao site.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>
          5. Propriedade Intelectual
        </h2>
        <p className="leading-relaxed" style={{ color: "#5a4a3e" }}>
          Todo o conteúdo disponível neste site — incluindo textos, imagens,
          logotipos, vídeos, identidade visual, código-fonte e materiais de
          marketing — é de propriedade exclusiva da Réserve ou de seus
          licenciantes, e está protegido pela legislação de direitos autorais e
          de propriedade intelectual (Lei nº 9.610/1998).
        </p>
        <p className="leading-relaxed mt-3" style={{ color: "#5a4a3e" }}>
          Qualquer uso não autorizado constitui violação e sujeita o infrator às
          sanções civis e penais cabíveis.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>
          6. Formulário de Contato e Comunicações
        </h2>
        <p className="leading-relaxed" style={{ color: "#5a4a3e" }}>
          Ao preencher o formulário de contato ou solicitar um diagnóstico
          gratuito, você autoriza a Réserve a entrar em contato por e-mail,
          WhatsApp ou telefone para dar continuidade ao atendimento. Seus dados
          serão tratados conforme nossa{" "}
          <a href="/privacy-policy" className="hover:underline" style={{ color: "#84936f" }}>
            Política de Privacidade
          </a>
          .
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>
          7. Links para Sites de Terceiros
        </h2>
        <p className="leading-relaxed" style={{ color: "#5a4a3e" }}>
          Este site pode conter links para sites de terceiros (Instagram, Google,
          WhatsApp, entre outros). A Réserve não se responsabiliza pelo conteúdo,
          políticas de privacidade ou práticas de qualquer site externo. O acesso
          a esses links é de inteira responsabilidade do usuário.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>
          8. Limitação de Responsabilidade
        </h2>
        <p className="leading-relaxed" style={{ color: "#5a4a3e" }}>
          O conteúdo deste site é fornecido &quot;como está&quot;, com fins informativos
          e de apresentação de serviços. A Réserve não garante que o site estará
          disponível de forma ininterrupta e não se responsabiliza por danos
          diretos ou indiretos decorrentes do uso das informações aqui
          disponibilizadas.
        </p>
        <p className="leading-relaxed mt-3" style={{ color: "#5a4a3e" }}>
          Resultados apresentados em estudos de caso e portfólio referem-se a
          clientes específicos e podem não se repetir em outras situações. Cada
          projeto é avaliado individualmente.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>
          9. Privacidade e LGPD
        </h2>
        <p className="leading-relaxed" style={{ color: "#5a4a3e" }}>
          O tratamento de dados pessoais coletados neste site está sujeito à Lei
          Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD). Acesse nossa{" "}
          <a href="/privacy-policy" className="hover:underline" style={{ color: "#84936f" }}>
            Política de Privacidade
          </a>{" "}
          para entender como coletamos, usamos e protegemos suas informações.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>
          10. Alterações nestes Termos
        </h2>
        <p className="leading-relaxed" style={{ color: "#5a4a3e" }}>
          A Réserve reserva-se o direito de atualizar estes Termos a qualquer
          momento. A data de última atualização será sempre indicada no topo desta
          página. O uso continuado do site após qualquer alteração implica
          aceitação dos novos termos.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>
          11. Lei Aplicável e Foro
        </h2>
        <p className="leading-relaxed" style={{ color: "#5a4a3e" }}>
          Estes Termos são regidos pelas leis da República Federativa do Brasil.
          Fica eleito o foro da Comarca de Lavras – MG como competente para
          dirimir quaisquer controvérsias decorrentes deste instrumento, com
          renúncia expressa a qualquer outro, por mais privilegiado que seja.
        </p>
      </section>

      <section className="mt-8 mb-12">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "#1A0F08" }}>
          12. Contato
        </h2>
        <p className="leading-relaxed" style={{ color: "#5a4a3e" }}>
          Para dúvidas, solicitações ou exercício de direitos relacionados a
          estes Termos, entre em contato:
        </p>
        <ul className="mt-3 space-y-1" style={{ color: "#5a4a3e" }}>
          <li>
            <strong>E-mail:</strong>{" "}
            <a
              href={`mailto:${LEGAL_CONFIG.COMPANY_EMAIL}`}
              className="hover:underline"
              style={{ color: "#84936f" }}
            >
              {LEGAL_CONFIG.COMPANY_EMAIL}
            </a>
          </li>
          <li>
            <strong>Telefone/WhatsApp:</strong>{" "}
            <a
              href={LEGAL_CONFIG.COMPANY_PHONE.href}
              className="hover:underline"
              style={{ color: "#84936f" }}
            >
              {LEGAL_CONFIG.COMPANY_PHONE.display}
            </a>
          </li>
          <li>
            <strong>Endereço:</strong> {LEGAL_CONFIG.COMPANY_ADDRESS.full}
          </li>
        </ul>
      </section>
    </main>
  );
}
