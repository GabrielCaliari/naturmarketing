import { KlarodConfig } from 'klaro';

export const klaroConfig: KlarodConfig = {
  version: 1,
  elementID: 'klaro',
  storageMethod: 'cookie',
  storageName: 'klaro-consent',
  cookieDomain: typeof window !== 'undefined' ? window.location.hostname : '',
  cookieExpiresAfterDays: 365,
  default: false,
  mustConsent: true,
  acceptAll: true,
  hideDeclineAll: false,
  hideLearnMore: false,
  noticeAsModal: false,
  disablePoweredBy: true,
  
  translations: {
    zz: {
      privacyPolicyUrl: '/privacy-policy',
    },
    pt: {
      consentModal: {
        title: '🍪 Cookies e Privacidade',
        description:
          'Usamos cookies e tecnologias de rastreamento para melhorar sua experiência, analisar o tráfego e otimizar nossos anúncios. Você pode escolher quais cookies aceitar.',
        privacyPolicy: {
          name: 'política de privacidade',
          text: 'Para mais informações, consulte nossa {privacyPolicy}.',
        },
      },
      consentNotice: {
        changeDescription:
          'Houve mudanças desde sua última visita. Atualize seu consentimento.',
        description:
          'Usamos cookies e tecnologias de rastreamento para melhorar sua experiência, analisar o tráfego e otimizar nossos anúncios. Você pode escolher quais cookies aceitar.',
        learnMore: 'Personalizar',
        testing: 'Modo de teste!',
      },
      purposes: {
        analytics: {
          title: 'Análise',
          description: 'Cookies de análise nos ajudam a entender como os visitantes interagem com nosso site.',
        },
        marketing: {
          title: 'Marketing',
          description: 'Cookies de marketing são usados para rastrear visitantes e exibir anúncios relevantes.',
        },
        functional: {
          title: 'Funcional',
          description: 'Cookies funcionais ajudam a executar funcionalidades específicas.',
        },
      },
      ok: 'Aceitar selecionados',
      acceptAll: 'Aceitar todos',
      acceptSelected: 'Aceitar selecionados',
      decline: 'Recusar todos',
      close: 'Fechar',
      save: 'Salvar',
      service: {
        disableAll: {
          title: 'Alternar todos os serviços',
          description: 'Use este botão para ativar/desativar todos os serviços.',
        },
        optOut: {
          title: '(opt-out)',
          description: 'Este serviço é carregado por padrão (mas você pode desativá-lo)',
        },
        required: {
          title: '(sempre obrigatório)',
          description: 'Este serviço é sempre necessário',
        },
        purposes: 'Finalidades',
        purpose: 'Finalidade',
      },
      gtm: {
        title: 'Google Tag Manager',
        description: 'Gerenciador de tags que nos permite rastrear eventos e conversões.',
      },
      ga4: {
        title: 'Google Analytics 4',
        description: 'Serviço de análise que nos ajuda a entender como você usa nosso site.',
      },
      metaPixel: {
        title: 'Meta Pixel (Facebook)',
        description: 'Pixel de rastreamento para otimizar nossos anúncios no Facebook e Instagram.',
      },
    },
  },

  services: [
    {
      name: 'gtm',
      title: 'Google Tag Manager',
      purposes: ['analytics', 'marketing'],
      cookies: [
        /^_ga/,
        /^_gid/,
        /^_gat/,
        '_dc_gtm_UA-',
      ],
      required: false,
      optOut: false,
      default: true,
      onlyOnce: false,
    },
    {
      name: 'ga4',
      title: 'Google Analytics 4',
      purposes: ['analytics'],
      cookies: [
        /^_ga/,
        /^_gid/,
      ],
      required: false,
      optOut: false,
      default: true,
      onlyOnce: false,
    },
    {
      name: 'metaPixel',
      title: 'Meta Pixel (Facebook)',
      purposes: ['marketing'],
      cookies: [
        '_fbp',
        '_fbc',
        'fr',
      ],
      required: false,
      optOut: false,
      default: true,
      onlyOnce: false,
    },
  ],

  lang: 'pt',
};


