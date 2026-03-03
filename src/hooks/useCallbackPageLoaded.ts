import { useEffect, useRef } from 'react';

/**
 * Hook que executa um callback quando a página termina de carregar
 */
export default function useCallbackLoadedPage(callback: () => void) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;

    const handleLoad = () => {
      if (!hasRun.current) {
        hasRun.current = true;
        callback();
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [callback]);
}
