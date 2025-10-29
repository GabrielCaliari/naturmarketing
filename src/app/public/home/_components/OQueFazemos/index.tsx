"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  IconBrandInstagram, 
  IconBrandMeta, 
  IconSeo,
  IconChartBar,
  IconPalette,
  IconCamera,
  IconBrandGoogleFilled,
  IconWorld,
  IconFileText
} from "@tabler/icons-react";

export default function OQueFazemos() {
  const servicos = [
    {
      icon: <IconBrandInstagram className="w-12 h-12" />,
      titulo: "Gestão de Redes Sociais",
      descricao: "Criação de conteúdo estratégico e gerenciamento completo das suas redes sociais para engajar e converter.",
      cor: "from-pink-500 to-purple-600"
    },
    {
      icon: <IconCamera className="w-12 h-12" />,
      titulo: "Captação de Conteúdo Completa",
      descricao: "Produção profissional de fotos e vídeos do seu hotel, capturando a essência e os diferenciais do seu empreendimento.",
      cor: "from-violet-500 to-purple-600"
    },
    {
      icon: <IconBrandGoogleFilled className="w-12 h-12" />,
      titulo: "Google Ads & Google Hotel Ads",
      descricao: "Campanhas especializadas no Google Ads e Google Hotel Ads para maximizar suas reservas diretas e visibilidade.",
      cor: "from-blue-500 to-cyan-600"
    },
    {
      icon: <IconBrandMeta className="w-12 h-12" />,
      titulo: "Meta Ads - Facebook e Instagram",
      descricao: "Campanhas otimizadas no Facebook e Instagram Ads focadas em aumentar reservas diretas e reduzir custos com OTAs.",
      cor: "from-blue-600 to-purple-600"
    },
    {
      icon: <IconWorld className="w-12 h-12" />,
      titulo: "Sites para Reserva Direta",
      descricao: "Desenvolvimento de sites modernos e otimizados com sistema de reserva direta, aumentando sua independência de OTAs.",
      cor: "from-emerald-500 to-green-600"
    },
    {
      icon: <IconSeo className="w-12 h-12" />,
      titulo: "SEO para Hotéis",
      descricao: "Otimização para mecanismos de busca especializada em hotelaria, aumentando sua visibilidade orgânica.",
      cor: "from-green-500 to-emerald-600"
    },
    {
      icon: <IconPalette className="w-12 h-12" />,
      titulo: "Branding Hoteleiro",
      descricao: "Desenvolvimento de identidade visual e posicionamento de marca que destacam seu empreendimento no mercado.",
      cor: "from-orange-500 to-red-600"
    },
    {
      icon: <IconChartBar className="w-12 h-12" />,
      titulo: "Análise e Relatórios",
      descricao: "Métricas detalhadas de desempenho com foco em ROI e aumento de reservas diretas.",
      cor: "from-indigo-500 to-purple-600"
    },
    {
      icon: <IconFileText className="w-12 h-12" />,
      titulo: "Marketing de Conteúdo",
      descricao: "Estratégias de conteúdo que contam a história do seu hotel e atraem o público ideal.",
      cor: "from-teal-500 to-blue-600"
    }
  ];

  return (
    <section id="o-que-fazemos" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-[#003D5C]">
          O Que Fazemos
        </h2>
        <div className="w-24 h-1 bg-[#0066A1] mx-auto mb-6"></div>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
          Soluções completas de marketing digital especializadas para o setor hoteleiro
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {servicos.map((servico, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#0066A1] h-full"
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${servico.cor} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {servico.icon}
                </div>
                <CardTitle className="text-xl font-bold text-[#003D5C]">
                  {servico.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {servico.descricao}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

