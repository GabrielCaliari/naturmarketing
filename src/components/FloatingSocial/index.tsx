"use client";

import { IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";

const BRAND_GREEN = "#84936f";

const buttons = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/reserve.mkt/",
    icon: <IconBrandInstagram size={24} stroke={1.5} />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/553597742984",
    icon: <IconBrandWhatsapp size={24} stroke={1.5} />,
  },
];

export default function FloatingSocial() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {buttons.map((btn) => (
        <a
          key={btn.label}
          href={btn.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={btn.label}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
          style={{
            background: "rgba(132,147,111,0.85)",
            border: `1px solid rgba(132,147,111,0.6)`,
            color: "#ffffff",
            backdropFilter: "blur(8px)",
          }}
        >
          {btn.icon}
        </a>
      ))}
    </div>
  );
}
