"use client";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { 
  IconUsers, 
  IconTarget, 
  IconHeart, 
  IconRocket,
  IconAward,
  IconFriends
} from "@tabler/icons-react";

const Empresa = () => {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-[#003D5C] via-[#0066A1] to-[#003D5C] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                A Agência de Marketing para Hotéis que Transforma Resultados
              </h1>
              <div className="w-32 h-1 bg-white mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Conheça o time de especialistas em Marketing Hoteleiro e Gestão de Tráfego para Resorts
              </p>
            </div>
          </div>
        </section>

        {/* Sobre a Empresa */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-[#003D5C]">
                Sobre a RÉSERVE
              </h2>
              <div className="w-24 h-1 bg-[#0066A1] mx-auto mb-12"></div>

              <Card className="border-none shadow-xl bg-white">
                <CardContent className="p-8 md:p-12">
                  <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                    <p>
                      <strong className="text-[#003D5C]">A RÉSERVE é uma agência de Marketing Hoteleiro especializada em gestão de tráfego para resorts, hotéis e pousadas</strong>,
                      com expertise em transformar presença digital em reservas diretas e receita real.
                    </p>

                    <p>
                      Fundada com a missão de libertar os empreendimentos hoteleiros da dependência de OTAs, a RÉSERVE combina
                      estratégia de marketing de alto nível com um conhecimento profundo das particularidades do setor hoteleiro brasileiro.
                    </p>

                    <p>
                      Nossa equipe de especialistas em marketing para hotéis atua de forma integrada — unindo tráfego pago,
                      branding, conteúdo e tecnologia para construir canais próprios de aquisição que trabalham pelo seu hotel 24 horas por dia.
                    </p>

                    <p>
                      Com metodologias exclusivas de marketing hoteleiro, já ajudamos dezenas de estabelecimentos a aumentarem
                      suas reservas diretas, reduzirem custos com comissões e consolidarem sua marca como referência de mercado.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-[#003D5C]">
              Nossos Valores
            </h2>
            <div className="w-24 h-1 bg-[#0066A1] mx-auto mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="border-2 border-transparent hover:border-[#0066A1] transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                    <IconTarget className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#003D5C] mb-3">Foco em Resultados</h3>
                  <p className="text-gray-600">
                    Cada ação de marketing hoteleiro que executamos é mensurada e orientada ao retorno real do seu investimento.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-transparent hover:border-[#0066A1] transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                    <IconHeart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#003D5C] mb-3">Paixão pelo Setor</h3>
                  <p className="text-gray-600">
                    Vivemos e respiramos hotelaria. Esse conhecimento profundo é o que nos diferencia de agências genéricas de marketing.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-transparent hover:border-[#0066A1] transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                    <IconRocket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#003D5C] mb-3">Inovação Constante</h3>
                  <p className="text-gray-600">
                    As estratégias de gestão de tráfego para resorts e hotéis evoluem constantemente — e nós evoluímos junto com elas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-transparent hover:border-[#0066A1] transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
                    <IconAward className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#003D5C] mb-3">Excelência</h3>
                  <p className="text-gray-600">
                    Nenhum detalhe é irrelevante quando se trata de posicionar seu hotel como a melhor opção do mercado.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-transparent hover:border-[#0066A1] transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                    <IconFriends className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#003D5C] mb-3">Parceria</h3>
                  <p className="text-gray-600">
                    Tratamos o seu hotel como se fosse nosso. O seu sucesso em reservas diretas é o nosso resultado.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-transparent hover:border-[#0066A1] transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                    <IconUsers className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#003D5C] mb-3">Equipe Dedicada</h3>
                  <p className="text-gray-600">
                    Cada membro é especialista em marketing para hotéis — nenhum generalista, nenhum amador. Só quem entende de hotelaria.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-[#003D5C]">
              Time de Especialistas em Marketing Hoteleiro
            </h2>
            <div className="w-24 h-1 bg-[#0066A1] mx-auto mb-12"></div>

            <div className="max-w-4xl mx-auto">
              <Card className="border-none shadow-xl bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-8 md:p-12">
                  <div className="space-y-6 text-gray-700 text-lg leading-relaxed text-center">
                    <p>
                      A equipe da RÉSERVE é formada por especialistas em marketing para hotéis e resorts,
                      todos unidos pelo compromisso de transformar presença digital em reservas diretas e receita real.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="p-6 bg-white rounded-lg shadow-md">
                        <h4 className="font-bold text-[#003D5C] mb-2 text-xl">Especialistas em Marketing Hoteleiro</h4>
                        <p className="text-gray-600">
                          Profissionais certificados em campanhas digitais para hotelaria, SEO, Google Hotel Ads e gestão de redes sociais.
                        </p>
                      </div>

                      <div className="p-6 bg-white rounded-lg shadow-md">
                        <h4 className="font-bold text-[#003D5C] mb-2 text-xl">Designers e Criativos</h4>
                        <p className="text-gray-600">
                          Equipe criativa especializada em conteúdo visual para hotéis — fotos, vídeos e identidade de marca que elevam a percepção de valor.
                        </p>
                      </div>

                      <div className="p-6 bg-white rounded-lg shadow-md">
                        <h4 className="font-bold text-[#003D5C] mb-2 text-xl">Desenvolvedores</h4>
                        <p className="text-gray-600">
                          Especialistas em sites de alta performance para hotelaria com motor de reserva direta integrado e otimizado para conversão.
                        </p>
                      </div>

                      <div className="p-6 bg-white rounded-lg shadow-md">
                        <h4 className="font-bold text-[#003D5C] mb-2 text-xl">Estrategistas de Tráfego</h4>
                        <p className="text-gray-600">
                          Especialistas em gestão de tráfego para resorts e hotéis que constroem funis de conversão com ROI mensurável.
                        </p>
                      </div>
                    </div>

                    <p className="mt-8 text-center text-[#0066A1] font-semibold italic">
                      &ldquo;Cada hotel tem um potencial que ainda não foi explorado. Nós estamos aqui para desbloqueá-lo.&rdquo;
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#003D5C] to-[#0066A1] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pronto para ter uma Agência de Marketing para Hotéis do seu lado?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Descubra como nossa gestão de tráfego para resorts e hotéis gera mais reservas diretas com menor custo de aquisição
              </p>
              <Link
                href="/#contact"
                className="inline-block px-8 py-4 bg-white text-[#003D5C] font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Solicitar Diagnóstico Gratuito
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Empresa;

