"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBuilding, IconHome, IconBeach } from "@tabler/icons-react";

export default function ParaQuemFazemos() {
  const publicos = [
    {
      icon: <IconBuilding className="w-16 h-16" />,
      titulo: "Hotéis",
      descricao: "Estratégias completas para hotéis urbanos e de negócios que buscam aumentar ocupação e reduzir dependência de OTAs.",
      features: [
        "Aumento de reservas diretas",
        "Gestão de reputação online",
        "Campanhas segmentadas por perfil de hóspede"
      ],
      cor: "from-blue-600 to-cyan-500"
    },
    {
      icon: <IconHome className="w-16 h-16" />,
      titulo: "Pousadas",
      descricao: "Marketing digital personalizado para pousadas que querem destacar seu charme e atrair mais hóspedes qualificados.",
      features: [
        "Posicionamento de marca autêntico",
        "Conteúdo que valoriza a experiência",
        "Captação de público regional e nacional"
      ],
      cor: "from-green-600 to-emerald-500"
    },
    {
      icon: <IconBeach className="w-16 h-16" />,
      titulo: "Resorts",
      descricao: "Soluções de marketing de alto impacto para resorts que desejam maximizar receitas e fortalecer presença digital.",
      features: [
        "Campanhas de alto ticket",
        "Marketing sazonal estratégico",
        "Experiências visuais impactantes"
      ],
      cor: "from-orange-600 to-pink-500"
    }
  ];

  return (
    <section id="para-quem-fazemos" className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-[#003D5C]">
          Para Quem Fazemos
        </h2>
        <div className="w-24 h-1 bg-[#0066A1] mx-auto mb-6"></div>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
          Especializados em atender diferentes tipos de empreendimentos hoteleiros com estratégias personalizadas
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {publicos.map((publico, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-none overflow-hidden h-full flex flex-col"
            >
              <div className={`h-2 bg-gradient-to-r ${publico.cor}`}></div>
              
              <CardHeader className="text-center pb-4">
                <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${publico.cor} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {publico.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-[#003D5C]">
                  {publico.titulo}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-grow flex flex-col">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {publico.descricao}
                </p>
                
                <div className="mt-auto">
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-[#003D5C] mb-3 text-sm uppercase tracking-wide">
                      Diferenciais:
                    </h4>
                    <ul className="space-y-2">
                      {publico.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-[#0066A1] mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-[#003D5C] text-white px-8 py-4 rounded-lg">
            <p className="text-lg font-semibold">
              Atendemos todo o Brasil com soluções 100% remotas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

