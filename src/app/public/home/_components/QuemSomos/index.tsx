"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function QuemSomos() {
  return (
    <section id="quem-somos" className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-[#003D5C]">
            Quem Somos
          </h2>
          <div className="w-24 h-1 bg-[#0066A1] mx-auto mb-12"></div>
          
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  <strong className="text-[#003D5C]">A Natur é uma agência de marketing digital especializada no setor hoteleiro</strong>, 
                  com expertise em transformar a presença online de hotéis, pousadas e resorts em resultados concretos.
                </p>
                
                <p>
                  Com profundo conhecimento do mercado hoteleiro, desenvolvemos estratégias personalizadas que aumentam 
                  a visibilidade, engajamento e, principalmente, as reservas diretas dos nossos clientes.
                </p>
                
                <p>
                  Nossa missão é reduzir a dependência de OTAs e maximizar a lucratividade do seu empreendimento através 
                  de marketing digital inteligente e orientado a resultados.
                </p>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-center text-[#0066A1] font-semibold italic">
                    &ldquo;Transformando hospedagens em experiências inesquecíveis através do marketing digital&rdquo;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

