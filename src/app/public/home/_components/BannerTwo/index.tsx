"use client";

import { trackButtonClick } from '@/lib/analytics';

const BannerTwo = () => {

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Coluna da Imagem/Ícone */}
          <div className="flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md">
              {/* Formas decorativas de fundo */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-pink-500/20 rounded-3xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/20 rounded-3xl"></div>
              
              {/* Card principal */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
                <div className="text-7xl mb-6">🏨</div>
                <h3 className="text-2xl font-bold text-[#003D5C] mb-4">
                  Marketing que Gera Resultados
                </h3>
                <p className="text-gray-600 text-lg">
                  Estratégias comprovadas para o setor hoteleiro
                </p>
              </div>
            </div>
          </div>

          {/* Coluna de Conteúdo */}
          <div className="order-1 lg:order-2">
            <div className="mb-3">
              <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-4">
                Resultados Reais para seu Hotel
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-[#003D5C]">Transforme </span>
              <span className="text-pink-500">Visitantes em Hóspedes</span>
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Nossa abordagem especializada em hotelaria combina gestão profissional de redes sociais, 
              campanhas de tráfego pago otimizadas e estratégias de SEO que colocam seu empreendimento 
              no topo das buscas. Criamos conteúdo visual impactante, gerenciamos sua reputação online 
              e desenvolvemos campanhas que falam diretamente com seu público ideal.
            </p>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Com relatórios detalhados de desempenho e análises de ROI, você acompanha em tempo real 
              o crescimento das suas reservas diretas. Reduzimos sua dependência de OTAs, aumentamos 
              sua margem de lucro e fortalecemos a presença digital do seu hotel, pousada ou resort no mercado.
            </p>

            <button
              className="theme-btn btn-style-one"
              onClick={(e) => {
                e.preventDefault();
                trackButtonClick('cta_banner_two_contact', '/');
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="btn-wrap">
                <span className="text-one">Fale Conosco</span>
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export { BannerTwo };
