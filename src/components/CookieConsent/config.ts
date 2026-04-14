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
  hideDeclineAll: true, // Esconde o botão "Recusar todos"
  hideLearnMore: false,
  noticeAsModal: false,
  disablePoweredBy: true,
  groupByPurpose: true,
  testing: false,
  
  translations: {
    zz: {
      privacyPolicyUrl: '/privacy-policy',
    },
    pt: {
      consentModal: {
        title: '🍪 Gerenciamento de Cookies',
        description:
          'A RÉSERVE utiliza cookies essenciais que são necessários para o funcionamento do site e cookies opcionais para melhorar sua experiência, analisar o tráfego e otimizar nossos anúncios. Os cookies essenciais (como Google Analytics) são sempre ativados para garantir que possamos melhorar continuamente nossos serviços. Você pode escolher aceitar todos os cookies ou apenas os essenciais.',
        privacyPolicy: {
          name: 'Política de Privacidade',
          text: 'Para mais informações sobre como tratamos seus dados, consulte nossa {privacyPolicy}.',
        },
      },
      consentNotice: {
        changeDescription:
          'Houve mudanças nas configurações de cookies desde sua última visita. Por favor, atualize seu consentimento.',
        description:
          'Utilizamos cookies essenciais para o funcionamento do site e cookies opcionais para melhorar sua experiência, analisar o uso do site e personalizar anúncios. Os cookies essenciais são sempre ativados e você pode escolher quais cookies opcionais aceitar.',
        learnMore: 'Personalizar Cookies',
        testing: 'Modo de teste ativo',
      },
      purposes: {
        analytics: {
          title: 'Cookies de Análise',
          description: 'Estes cookies nos ajudam a entender como os visitantes interagem com nosso site, quais páginas são mais visitadas, quanto tempo permanecem na página e outras métricas importantes. Isso nos permite melhorar continuamente a experiência do usuário e o conteúdo oferecido.',
        },
        marketing: {
          title: 'Cookies de Marketing',
          description: 'Estes cookies são usados para rastrear visitantes em diferentes sites e exibir anúncios relevantes e personalizados. Eles também nos ajudam a medir a eficácia de nossas campanhas publicitárias e otimizar nossos anúncios para melhorar os resultados.',
        },
        functional: {
          title: 'Cookies Funcionais',
          description: 'Estes cookies permitem que o site forneça funcionalidades e personalização aprimoradas, como lembrar suas preferências de idioma ou região. Eles podem ser definidos por nós ou por provedores de serviços terceirizados cujos serviços adicionamos às nossas páginas.',
        },
      },
      ok: 'Aceitar selecionados',
      acceptAll: 'Aceitar todos',
      acceptSelected: 'Aceitar selecionados',
      acceptNecessaryOnly: 'Aceitar apenas essenciais',
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
        description: 'Gerenciador de tags do Google que nos permite gerenciar e rastrear eventos, conversões e interações no site de forma centralizada. Utilizado para enviar dados ao Google Analytics e outras ferramentas de marketing.',
      },
      ga4: {
        title: 'Google Analytics 4',
        description: 'Serviço de análise do Google que nos ajuda a entender como os visitantes interagem com nosso site, incluindo páginas visitadas, tempo na página, taxa de rejeição e outras métricas importantes para melhorar nossa presença online.',
      },
      metaPixel: {
        title: 'Meta Pixel (Facebook/Instagram)',
        description: 'Pixel de rastreamento do Meta (Facebook/Instagram) que nos permite medir a eficácia de nossos anúncios, criar públicos personalizados para campanhas futuras e rastrear conversões provenientes de anúncios no Facebook e Instagram.',
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
      required: false, // Não é essencial, mas recomendado
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
      required: true, // MARCADO COMO ESSENCIAL - sempre será aceito
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
      required: false, // Não é essencial
      optOut: false,
      default: false, // Não ativado por padrão quando aceita apenas essenciais
      onlyOnce: false,
    },
  ],

  lang: 'pt',
};


