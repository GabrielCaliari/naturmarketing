"use client";

import type { AnchorHTMLAttributes } from "react";
import { usePathname } from "next/navigation";
import { buildWhatsAppRef, getAttribution } from "@/lib/attribution";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
  message: string;
};

/**
 * Link direto para o WhatsApp com o `ref:` de origem na mensagem. O clique é
 * rastreado como Contact pelo AutoTrack (qualquer link para wa.me).
 */
export function WhatsAppLink({ message, onClick, ...props }: Props) {
  const pathname = usePathname();
  return (
    <a
      {...props}
      // A campanha vem do sessionStorage, que não existe no SSR: o href
      // renderizado leva só a página e o clique completa com a campanha.
      href={buildWhatsAppUrl(message, buildWhatsAppRef(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.currentTarget.href = buildWhatsAppUrl(
          message,
          buildWhatsAppRef(pathname, getAttribution().utm_campaign)
        );
        onClick?.(e);
      }}
    />
  );
}
