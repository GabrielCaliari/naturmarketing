"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IconCheck, IconPhone, IconMail, IconBrandWhatsapp } from "@tabler/icons-react";

export default function ConsultoriaSucesso() {
  useEffect(() => {
    // Scroll para o topo ao carregar a página
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Ícone de Sucesso Animado */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-xl">
              <IconCheck size={60} className="text-white" stroke={3} />
            </div>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6 text-[#003D5C]"
          >
            Solicitação Enviada com Sucesso! 🎉
          </motion.h1>

          {/* Card Principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8 border-t-4 border-[#0066A1]"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <IconPhone className="w-8 h-8 text-[#0066A1]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#003D5C] mb-2">
                    Fique atento ao seu telefone!
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Nossa equipe de especialistas em marketing hoteleiro está analisando sua solicitação. 
                    Em breve, entraremos em contato para agendar uma conversa inicial e entender melhor 
                    como podemos ajudar seu hotel a aumentar as reservas diretas.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-[#0066A1] p-6 rounded-r-lg">
                <h4 className="font-bold text-[#003D5C] mb-3 flex items-center gap-2">
                  <IconMail className="w-5 h-5" />
                  Próximos Passos:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0066A1] font-bold mt-1">1.</span>
                    <span>Nosso time analisará as informações enviadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0066A1] font-bold mt-1">2.</span>
                    <span>Entraremos em contato para uma conversa inicial gratuita</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0066A1] font-bold mt-1">3.</span>
                    <span>Apresentaremos uma estratégia personalizada para seu hotel</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                <p className="text-center text-gray-700 mb-4">
                  <strong className="text-[#003D5C]">Precisa falar com urgência?</strong>
                  <br />
                  Entre em contato direto pelo WhatsApp:
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://wa.me/5535998067432?text=Olá! Acabei de enviar uma solicitação de consultoria pelo site."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <IconBrandWhatsapp size={24} />
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cards de Benefícios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-3">⏱️</div>
              <h4 className="font-bold text-[#003D5C] mb-2">Resposta Rápida</h4>
              <p className="text-sm text-gray-600">
                Retornamos em até 24 horas úteis
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-bold text-[#003D5C] mb-2">Análise Gratuita</h4>
              <p className="text-sm text-gray-600">
                Diagnóstico inicial sem custo
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h4 className="font-bold text-[#003D5C] mb-2">Estratégia Sob Medida</h4>
              <p className="text-sm text-gray-600">
                Soluções personalizadas para seu hotel
              </p>
            </div>
          </motion.div>

          {/* Botão Voltar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <a
              href="/"
              className="inline-block text-[#0066A1] hover:text-[#003D5C] font-semibold underline transition-colors"
            >
              ← Voltar para a página inicial
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}






