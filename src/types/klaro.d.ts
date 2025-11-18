declare module 'klaro' {
  export interface KlaroConfig {
    [key: string]: any;
  }

  // Alias para compatibilidade
  export type KlarodConfig = KlaroConfig;

  export interface KlaroManager {
    show: (modal?: boolean) => void;
    hide: () => void;
    saveConsent?: (consent: Record<string, boolean>) => void;
    updateConsent?: (consent: Record<string, boolean>) => void;
    [key: string]: any;
  }

  const klaro: {
    setup: (config: KlaroConfig) => void;
    show: (config?: KlaroConfig, modal?: boolean) => void;
    hide: () => void;
    version: () => string;
    getManager: (config: KlaroConfig) => KlaroManager;
  };

  export = klaro;
}

