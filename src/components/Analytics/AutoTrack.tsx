"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  trackScrollDepth,
  trackTimeOnPage,
  trackLinkClick,
  trackPageView,
} from '@/lib/analytics';

export default function AutoTrack() {
  const pathname = usePathname();
  const scrollDepthMarkers = useRef(new Set<number>());
  const pageLoadTime = useRef<number>(Date.now());
  const timeOnPageInterval = useRef<NodeJS.Timeout | undefined>(undefined);

  // Reset quando a página muda
  useEffect(() => {
    scrollDepthMarkers.current.clear();
    pageLoadTime.current = Date.now();

    // Envia page_view
    if (typeof window !== 'undefined') {
      trackPageView(window.location.href);
    }
  }, [pathname]);

  // Scroll depth tracking
  useEffect(() => {
    // documentHeight só é recalculada em resize/ResizeObserver — lê-la a
    // cada evento de scroll intercalava leitura de geometria com mutações
    // de outros efeitos e forçava reflow.
    let documentHeight = document.documentElement.scrollHeight;
    const updateDocumentHeight = () => {
      documentHeight = document.documentElement.scrollHeight;
    };

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      // Marcos de scroll: 25%, 50%, 75%, 100%
      const markers = [25, 50, 75, 100];

      markers.forEach(marker => {
        if (
          scrollPercentage >= marker &&
          !scrollDepthMarkers.current.has(marker)
        ) {
          scrollDepthMarkers.current.add(marker);
          trackScrollDepth(marker);
        }
      });
    };

    // Throttle para não disparar muitos eventos
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', updateDocumentHeight, { passive: true });

    const resizeObserver = new ResizeObserver(updateDocumentHeight);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', updateDocumentHeight);
      resizeObserver.disconnect();
    };
  }, []);

  // Tempo na página
  useEffect(() => {
    // Envia tempo na página a cada 30 segundos (se usuário estiver ativo)
    timeOnPageInterval.current = setInterval(() => {
      const secondsOnPage = Math.floor((Date.now() - pageLoadTime.current) / 1000);
      if (secondsOnPage > 0) {
        trackTimeOnPage(secondsOnPage);
      }
    }, 30000);

    // Envia quando o usuário sai da página
    const handleBeforeUnload = () => {
      const secondsOnPage = Math.floor((Date.now() - pageLoadTime.current) / 1000);
      if (secondsOnPage > 0) {
        trackTimeOnPage(secondsOnPage);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (timeOnPageInterval.current) {
        clearInterval(timeOnPageInterval.current);
      }
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  // Rastreamento de cliques em links externos
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.href) {
        const isExternal = 
          link.hostname !== window.location.hostname &&
          link.href.startsWith('http');

        if (isExternal) {
          trackLinkClick(link.href, link.textContent || undefined);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  // Rastreamento de visibility (usuário mudou de aba)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Usuário saiu da aba - envia tempo na página
        const secondsOnPage = Math.floor((Date.now() - pageLoadTime.current) / 1000);
        if (secondsOnPage > 5) {
          trackTimeOnPage(secondsOnPage);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname]);

  return null;
}

