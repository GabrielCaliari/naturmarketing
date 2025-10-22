"use client";

import { useEffect } from 'react';
import { klaroConfig } from './config';

export default function CookieConsent() {
  useEffect(() => {
    // Importa Klaro apenas no cliente (browser)
    import('klaro').then((Klaro) => {
      Klaro.setup(klaroConfig);
    });

    // Importa CSS do Klaro
    import('klaro/dist/klaro.css');
  }, []);

  return null;
}

