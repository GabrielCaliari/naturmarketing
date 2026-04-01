"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { trackFormStart, trackFormSubmit, trackFormError, trackButtonClick } from "@/lib/analytics";

export default function Contact() {
  const router = useRouter();
  const [formStarted, setFormStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormStart = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart("home_contact_form");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Erro ao enviar mensagem");
      trackFormSubmit("home_contact_form", true);
      router.push("/public/consultoria-sucesso");
    } catch (error) {
      trackFormError("home_contact_form", "Erro ao enviar formulário");
      alert("Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato via WhatsApp.");
      console.error("Erro:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Entre em Contato</h2>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h3 className="contact-info-title">Especialistas em Marketing Hoteleiro</h3>
            <p className="contact-info-text">
              Quer aumentar suas reservas diretas e reduzir comissões de OTAs?
              Entre em contato para uma consultoria gratuita.
            </p>
            <a
              href="https://wa.me/5535998067432?text=Olá! Gostaria de saber mais sobre os serviços de marketing digital para meu hotel."
              target="_blank"
              rel="noopener noreferrer"
              className="contact-whatsapp"
              onClick={() => trackButtonClick("whatsapp_contact", "/")}
            >
              <IconBrandWhatsapp size={22} />
              Fale conosco no WhatsApp
            </a>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="contact-input"
              onFocus={handleFormStart}
              disabled={isSubmitting}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="seu@email.com"
              className="contact-input"
              onFocus={handleFormStart}
              disabled={isSubmitting}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="(00) 00000-0000"
              className="contact-input"
              onFocus={handleFormStart}
              disabled={isSubmitting}
            />
            <textarea
              name="message"
              placeholder="Como podemos ajudar?"
              className="contact-textarea"
              onFocus={handleFormStart}
              disabled={isSubmitting}
              required
            />
            <button
              type="submit"
              className="contact-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
