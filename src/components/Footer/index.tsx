"use client";

import { IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-content">
        <span className="site-footer-brand">réserve</span>
        <span className="site-footer-copy">
          Réserve - Todos os direitos reservados |{" "}
          <Link href="/privacy-policy">Política de Privacidade</Link>
        </span>
        <div className="site-footer-socials">
          <a
            href="https://www.instagram.com/reserve.mkt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandInstagram size={22} />
          </a>
          <a
            href="https://wa.me/5535977429840"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandWhatsapp size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
