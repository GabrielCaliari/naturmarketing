"use client";

import { IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";
import { useLeadModal } from "@/context/LeadModalContext";
import { trackButtonClick } from "@/lib/analytics";

const FLOAT_STYLE: React.CSSProperties = {
  background: "rgba(132,147,111,0.85)",
  border: "1px solid rgba(132,147,111,0.6)",
  color: "#ffffff",
  backdropFilter: "blur(8px)",
};

const FLOAT_CLASS =
  "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer";

export default function FloatingSocial() {
  const { open } = useLeadModal();

  return (
    <div className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-3">
      <a
        href="https://www.instagram.com/reserve.marketinghoteleiro/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={FLOAT_CLASS}
        style={FLOAT_STYLE}
      >
        <IconBrandInstagram size={24} stroke={1.5} />
      </a>
      {/* Tudo que leva ao nosso WhatsApp passa pelo modal de captura de lead. */}
      <button
        type="button"
        aria-label="WhatsApp"
        className={FLOAT_CLASS}
        style={FLOAT_STYLE}
        onClick={() => {
          trackButtonClick("cta_floating_whatsapp", "/");
          open();
        }}
      >
        <IconBrandWhatsapp size={24} stroke={1.5} />
      </button>
    </div>
  );
}
