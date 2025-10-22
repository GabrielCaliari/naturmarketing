"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react"; 

interface Plan {
  id: string;
  name: string;
  description: string;
  features: string[];
  contract: string;
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'essencial',
    name: 'PLANO ESSENCIAL',
    description: 'Para iniciar com base sólida e performance rápida.',
    features: [
      'Gestão de Redes Sociais: Instagram e Facebook',
      'Planejamento + calendário estratégico',
      'Criação de conteúdo (design para posts feed e story)',
      'Edição de vídeo e roteiro para reels',
      'Relatório mensal de desempenho'
    ],
    contract: 'Contrato mínimo: 3 meses'
  },
  {
    id: 'performance',
    name: 'PLANO PERFORMANCE',
    description: 'Para quem busca presença consistente e conversão.',
    features: [
      'Tudo do Essencial, mais:',
      'Gestão de anúncios (Plataforma: Meta)',
      'Criação, gestão e otimização de campanhas',
      'Relatórios quinzenais de desempenho'
    ],
    contract: 'Contrato mínimo: 3 meses'
  },
  {
    id: 'premium',
    name: 'PLANO PREMIUM',
    description: 'Para quem deseja dominar seu mercado online e escalar.',
    features: [
      'Tudo do Performance, mais:',
      'Captação de conteúdo presencial a cada 3 meses',
      'Relatórios avançados de crescimento',
      'Análise de funil, ROI e comparativos de evolução',
      'Bônus: PDF personalizado com orientações de boas-vindas'
    ],
    contract: 'Contrato mínimo: 6 meses',
    isPopular: true
  },
  {
    id: 'ancoragem',
    name: 'PLANO ANCORAGEM',
    description: 'Gestão digital completa com landing page e CRM.',
    features: [
      'Tudo do Premium, mais:',
      'Landing page com CRM integrado',
      'Sistema completo de gestão de leads',
      'Automação de marketing'
    ],
    contract: 'Contrato mínimo: 6 meses'
  }
];

export default function SubscriptionPlans() {
  return (
    <div id="plans" className="mt-20">
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Nossos Planos</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Apresentamos quatro opções — com mínimo 3 meses (recomendado 6 meses para consolidação de resultados).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto px-4">
          {plans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className={`shadow-lg p-6 rounded-2xl border border-gray-200 flex flex-col h-full relative transition-transform duration-300 hover:scale-105 hover:shadow-xl min-w-0 ${
                plan.isPopular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {plan.isPopular && (
                  <Badge className="bg-blue-500 text-white text-xs">
                    MAIS POPULAR
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-center text-blue-600 mb-3">{plan.name}</CardTitle>
                <p className="text-center text-sm text-gray-600 mb-4 leading-relaxed">{plan.description}</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-center text-sm font-medium text-blue-700">{plan.contract}</p>
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col flex-grow">
                <div className="space-y-4 flex-grow">
                  <h4 className="font-semibold text-gray-900 text-base">Inclui:</h4>
                  <ul className="space-y-3 text-gray-600">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    trackName={`plan_quote_${plan.id}`}
                  >
                    Solicitar Orçamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
