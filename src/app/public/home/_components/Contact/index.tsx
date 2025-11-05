"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { trackFormStart, trackFormSubmit, trackFormError, trackButtonClick } from '@/lib/analytics';

export default function Contact() {
  const router = useRouter();
  const [formStarted, setFormStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Rastreia quando o usuário começa a preencher o formulário
  const handleFormStart = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart('home_contact_form');
    }
  };

  // Rastreia envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        message: formData.get('message') as string,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      trackFormSubmit('home_contact_form', true);
      
      // Redireciona para a página de sucesso
      router.push('/public/consultoria-sucesso');
    } catch (error) {
      // Em caso de erro
      trackFormError('home_contact_form', 'Erro ao enviar formulário');
      alert('❌ Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato via WhatsApp.');
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rastreia clique no WhatsApp
  const handleWhatsAppClick = () => {
    trackButtonClick('whatsapp_contact', '/');
  };
  return (
    <div id="contact" className="container mx-auto py-12">
    
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Entre em Contato</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className=" border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-gray-600">
                <li>
                  <strong className="text-[#003D5C]">Especialistas em Marketing Hoteleiro</strong>
                </li>
                <li>
                  Quer aumentar suas reservas diretas e reduzir comissões de OTAs? 
                  Entre em contato conosco para uma consultoria gratuita.
                </li>
                <li>
                  <a 
                    href="https://wa.me/5535998067432?text=Olá! Gostaria de saber mais sobre os serviços de marketing digital para meu hotel." 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      handleWhatsAppClick();
                    }}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors font-semibold"
                  >
                    <IconBrandWhatsapp size={24} />
                    Fale conosco no WhatsApp
                  </a>
                </li>
              </ul>
            </CardContent>
          </div>
          <Card className="shadow-lg p-6 rounded-2xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Fale Conosco</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input 
                  type="text"
                  name="name"
                  placeholder="Seu nome completo" 
                  className="w-full p-2 border rounded-lg"
                  onFocus={handleFormStart}
                  disabled={isSubmitting}
                  required
                />
                <input 
                  type="email"
                  name="email"
                  placeholder="seu@email.com" 
                  className="w-full p-2 border rounded-lg"
                  onFocus={handleFormStart}
                  disabled={isSubmitting}
                  required
                />
                <input 
                  type="text"
                  name="phone"
                  placeholder="(00) 00000-0000" 
                  className="w-full p-2 border rounded-lg"
                  onFocus={handleFormStart}
                  disabled={isSubmitting}
                />
                <textarea 
                  name="message"
                  placeholder="Como podemos ajudar?" 
                  className="w-full p-2 border rounded-lg h-24"
                  onFocus={handleFormStart}
                  disabled={isSubmitting}
                  required
                ></textarea>
                <Button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
