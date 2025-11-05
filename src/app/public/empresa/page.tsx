"use client";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
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
                Nossa Empresa
              </h1>
              <div className="w-32 h-1 bg-white mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Conheça a equipe que transforma a presença digital do seu hotel
              </p>
            </div>
          </div>
        </section>

        {/* Sobre a Empresa */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-[#003D5C]">
                Sobre a Natur
              </h2>
              <div className="w-24 h-1 bg-[#0066A1] mx-auto mb-12"></div>
              
              <Card className="border-none shadow-xl bg-white">
                <CardContent className="p-8 md:p-12">
                  <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                    <p>
                      <strong className="text-[#003D5C]">A Natur é uma agência de marketing digital especializada no setor hoteleiro</strong>, 
                      com expertise em transformar a presença online de hotéis, pousadas e resorts em resultados concretos.
                    </p>
                    
                    <p>
                      Fundada com a missão de revolucionar o marketing digital para o setor hoteleiro, a Natur combina 
                      conhecimento técnico profundo com uma compreensão única das necessidades específicas de hotéis, 
                      pousadas e resorts brasileiros.
                    </p>
                    
                    <p>
                      Nossa equipe é composta por profissionais experientes em marketing digital, design, desenvolvimento web 
                      e estratégias de comunicação, todos unidos pelo objetivo comum de ajudar empreendimentos hoteleiros 
                      a alcançarem seu máximo potencial online.
                    </p>
                    
                    <p>
                      Com anos de experiência no mercado, desenvolvemos metodologias próprias e estratégias personalizadas 
                      que já ajudaram dezenas de estabelecimentos a aumentarem suas reservas diretas, reduzirem custos com 
                      OTAs e fortalecerem sua marca no mercado digital.
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
                    Priorizamos sempre os resultados mensuráveis e o crescimento real do seu negócio.
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
                    Amamos o setor hoteleiro e entendemos suas particularidades como ninguém.
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
                    Estamos sempre atualizados com as últimas tendências e tecnologias do marketing digital.
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
                    Buscamos a excelência em cada projeto, entregando sempre o melhor resultado possível.
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
                    Trabalhamos como verdadeiros parceiros, alinhados com os objetivos do seu negócio.
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
                    Nossa equipe é comprometida com o sucesso de cada cliente e projeto.
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
              Nossa Equipe
            </h2>
            <div className="w-24 h-1 bg-[#0066A1] mx-auto mb-12"></div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="border-none shadow-xl bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-8 md:p-12">
                  <div className="space-y-6 text-gray-700 text-lg leading-relaxed text-center">
                    <p>
                      A equipe da Natur é formada por profissionais especializados em diferentes áreas do marketing digital, 
                      todos unidos pelo compromisso de entregar resultados excepcionais para nossos clientes.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="p-6 bg-white rounded-lg shadow-md">
                        <h4 className="font-bold text-[#003D5C] mb-2 text-xl">Especialistas em Marketing</h4>
                        <p className="text-gray-600">
                          Profissionais com anos de experiência em campanhas digitais, SEO, Google Ads e redes sociais.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-white rounded-lg shadow-md">
                        <h4 className="font-bold text-[#003D5C] mb-2 text-xl">Designers e Criativos</h4>
                        <p className="text-gray-600">
                          Equipe criativa que transforma ideias em conteúdo visual impactante e estratégico.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-white rounded-lg shadow-md">
                        <h4 className="font-bold text-[#003D5C] mb-2 text-xl">Desenvolvedores</h4>
                        <p className="text-gray-600">
                          Especialistas em desenvolvimento web que criam sites modernos e otimizados para reservas.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-white rounded-lg shadow-md">
                        <h4 className="font-bold text-[#003D5C] mb-2 text-xl">Estrategistas</h4>
                        <p className="text-gray-600">
                          Profissionais que analisam dados e desenvolvem estratégias personalizadas para cada cliente.
                        </p>
                      </div>
                    </div>
                    
                    <p className="mt-8 text-center text-[#0066A1] font-semibold italic">
                      "Juntos, transformamos desafios em oportunidades e ideias em resultados reais."
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
                Pronto para transformar seu hotel?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Entre em contato e descubra como podemos ajudar seu negócio a crescer
              </p>
              <a
                href="/#contact"
                className="inline-block px-8 py-4 bg-white text-[#003D5C] font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Fale Conosco
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Empresa;

