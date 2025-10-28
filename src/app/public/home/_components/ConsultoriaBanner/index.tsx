"use client";

import { trackButtonClick } from '@/lib/analytics';

export default function ConsultoriaBanner() {
  const handleWhatsAppClick = () => {
    trackButtonClick('consultoria_gratuita_banner', '/');
    // Abre WhatsApp
    window.open('https://wa.me/5535998067432?text=Olá! Gostaria de solicitar uma consultoria gratuita de marketing hoteleiro.', '_blank');
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <div 
          className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
          style={{
            backgroundImage: 'url(/img/resource/consultoria-banner.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '400px'
          }}
        >
          {/* Overlay escuro para melhorar legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          
          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col justify-center items-start p-8 md:p-16 min-h-[400px]">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Solicite sua consultoria gratuita
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
                  de marketing hoteleiro 📈
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-2 font-medium">
                Reduza as comissões pagas às OTAs e
              </p>
              <p className="text-xl md:text-2xl text-white mb-8 font-bold">
                aumente sua lucratividade
              </p>

              <button
                onClick={handleWhatsAppClick}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span>Consultoria Gratuita</span>
                <svg 
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </button>

              <p className="mt-6 text-sm text-gray-300">
                💬 Fale conosco pelo WhatsApp e descubra como podemos ajudar seu hotel
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

