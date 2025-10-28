"use client";

import { trackButtonClick } from '@/lib/analytics';

const BannerTwo = () => {

  return (
    <section className="relative story-two p-2 md:p-20 mt-10 md:mt-20">
      {/* Shapes */}
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-pink-500 rounded-3xl -translate-x-5 -translate-y-5 md:-translate-x-10 md:-translate-y-10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-blue-600 rounded-3xl translate-x-5 translate-y-5 md:translate-x-20 md:translate-y-20"></div>
      <div className="auto-container rounded-3">
        <div className="row clearfix rounded-3 g-4 flex flex-col md:flex-row items-center">
          <div className="story-two_image-column col-lg-6 col-md-12 col-sm-12 rounded-3 flex items-center justify-center">
            <div className="relative mt-5 w-full max-w-full lg:max-w-[700px] aspect-square md:aspect-[1/1] flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 rounded-3 p-8">
              <div className="text-center">
                <div className="text-6xl mb-6">🏨</div>
                <h3 className="text-2xl font-bold text-[#003D5C] mb-4">
                  Marketing que Gera Resultados
                </h3>
                <p className="text-gray-600 text-lg">
                  Estratégias comprovadas para o setor hoteleiro
                </p>
              </div>
            </div>
          </div>

          <div className="story-two_content-column col-lg-6 col-md-12 col-sm-12">
            <div className="story-two_content-outer">
              <div className="sec-title">
                <div className="sec-title_title">Resultados Reais para seu Hotel</div>
                <h2 className="text-blue-600 font-bold">
                  Transforme <span className="text-pink-500 font-bold">Visitantes em Hóspedes</span>
                </h2>
                <div className="sec-title_text">
                  Estratégias digitais focadas em aumentar suas reservas diretas
                </div>
              </div>
              <div className="sec-title_text">
                <div className="">
                  <p>Nossa abordagem especializada em hotelaria combina gestão profissional de redes sociais, 
                  campanhas de tráfego pago otimizadas e estratégias de SEO que colocam seu empreendimento 
                  no topo das buscas. Criamos conteúdo visual impactante, gerenciamos sua reputação online 
                  e desenvolvemos campanhas que falam diretamente com seu público ideal.
                    <br /><br />
                    Com relatórios detalhados de desempenho e análises de ROI, você acompanha em tempo real 
                    o crescimento das suas reservas diretas. Reduzimos sua dependência de OTAs, aumentamos 
                    sua margem de lucro e fortalecemos a presença digital do seu hotel, pousada ou resort no mercado.</p>
                </div>
              </div>

              <div className="story-two_button d-flex align-items-center flex-wrap">
                <a
                  href="#contact"
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
                    <span className="text-two">Fale Conosco</span>
                  </span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export { BannerTwo };
