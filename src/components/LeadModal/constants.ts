export type ServiceCombo = { id: string; pt: string; en: string };

// Opções da etapa 2 (exibidas em 2 colunas). Combos curados que cobrem todos os
// serviços do header e da seção "Como Atuamos". Cada página de serviço
// pré-seleciona a opção correspondente (ver SERVICE_PRESELECT).
export const SERVICE_COMBOS: ServiceCombo[] = [
  { id: "canal-direto", pt: "Reservas Diretas (Site + Motor)", en: "Direct bookings (Website + Booking engine)" },
  { id: "trafego", pt: "Anúncios & Tráfego Pago (Meta + Google)", en: "Ads & Paid traffic (Meta + Google)" },
  { id: "seo", pt: "SEO para Hotéis", en: "Hotel SEO" },
  { id: "gestao-canais", pt: "Gestão de Canais & Redes Sociais (OTAs, Instagram, Airbnb)", en: "Channels & Social media (OTAs, Instagram, Airbnb)" },
  { id: "atendimento", pt: "Automação de Atendimento (WhatsApp)", en: "Guest service automation (WhatsApp)" },
  { id: "audiovisual", pt: "Conteúdo & Produção Audiovisual", en: "Content & Audiovisual production" },
  { id: "relatorios", pt: "Relatórios & Performance", en: "Reports & Performance" },
  { id: "completo", pt: "Não sei ainda — quero um diagnóstico completo", en: "Not sure yet — I want a full assessment" },
];

// Mapa página de serviço → opção pré-marcada na etapa 2 quando o lead chega
// pelo CTA daquela página. As chaves são os pathnames das páginas de serviço.
export const SERVICE_PRESELECT: Record<string, string[]> = {
  "/gestao-de-canais": ["gestao-canais"],
  "/producao-audiovisual": ["audiovisual"],
  "/sites-para-hoteis": ["canal-direto"],
  "/motor-de-reservas": ["canal-direto"],
  "/reservas-diretas": ["canal-direto"],
  "/google-hotel-ads": ["trafego"],
  "/meta-ads": ["trafego"],
  "/seo-para-hoteis": ["seo"],
  "/relatorios-performance": ["relatorios"],
  "/automacao-atendimento": ["atendimento"],
};

export const PROPERTY_TYPES = {
  pt: ["Hotel", "Pousada", "Resort", "Airbnb", "Outro"],
  en: ["Hotel", "Inn", "Resort", "Airbnb", "Other"],
};

export type ModalCopy = {
  steps: [string, string, string];
  title: string;
  subtitle: string;
  // step 1
  nameLabel: string;
  propertyLabel: string;
  typeLabel: string;
  typePlaceholder: string;
  hasSiteQuestion: string;
  siteUrlPlaceholder: string;
  hasInstagramQuestion: string;
  instagramPlaceholder: string;
  yes: string;
  no: string;
  // step 2
  servicesTitle: string;
  servicesHint: string;
  challengeLabel: string;
  challengePlaceholder: string;
  // step 3
  successTitle: string;
  successBody: string;
  openWhatsApp: string;
  // nav
  next: string;
  back: string;
  finish: string;
  close: string;
  privacy: string;
  requiredError: string;
  servicesError: string;
};

export const MODAL_CONTENT: { pt: ModalCopy; en: ModalCopy } = {
  pt: {
    steps: ["DADOS", "SERVIÇOS", "PRONTO"],
    title: "Diagnóstico gratuito",
    subtitle: "Leva menos de 1 minuto. Já te levamos pro WhatsApp com tudo preenchido.",
    nameLabel: "Seu nome completo",
    propertyLabel: "Nome da sua hospedagem (hotel, pousada, resort, Airbnb...)",
    typeLabel: "Tipo de hospedagem (opcional)",
    typePlaceholder: "Selecione...",
    hasSiteQuestion: "Sua hospedagem tem site?",
    siteUrlPlaceholder: "Link do site (opcional)",
    hasInstagramQuestion: "Tem Instagram ativo?",
    instagramPlaceholder: "@ do Instagram (opcional)",
    yes: "Sim",
    no: "Não",
    servicesTitle: "O que você precisa?",
    servicesHint: "Escolha uma ou mais opções.",
    challengeLabel: "Qual seu maior desafio hoje? (opcional)",
    challengePlaceholder: "Ex.: dependo muito da Booking, meu site não converte...",
    successTitle: "Prontinho! 🎉",
    successBody: "Vamos te levar pro WhatsApp com tudo preenchido. Nosso time já inicia o atendimento sabendo tudo sobre a sua hospedagem.",
    openWhatsApp: "Abrir WhatsApp",
    next: "Continuar",
    back: "Voltar",
    finish: "Ir para o WhatsApp",
    close: "Fechar",
    privacy: "Ao continuar, você concorda com a nossa Política de Privacidade.",
    requiredError: "Preencha seu nome e o nome da hospedagem.",
    servicesError: "Escolha pelo menos uma opção.",
  },
  en: {
    steps: ["DETAILS", "SERVICES", "DONE"],
    title: "Free assessment",
    subtitle: "It takes under a minute. We'll take you to WhatsApp with everything filled in.",
    nameLabel: "Your full name",
    propertyLabel: "Your property's name (hotel, inn, resort, Airbnb...)",
    typeLabel: "Property type (optional)",
    typePlaceholder: "Select...",
    hasSiteQuestion: "Does your property have a website?",
    siteUrlPlaceholder: "Website link (optional)",
    hasInstagramQuestion: "Active Instagram?",
    instagramPlaceholder: "Instagram @ (optional)",
    yes: "Yes",
    no: "No",
    servicesTitle: "What do you need?",
    servicesHint: "Pick one or more options.",
    challengeLabel: "What's your biggest challenge today? (optional)",
    challengePlaceholder: "e.g. I rely too much on Booking, my site doesn't convert...",
    successTitle: "All set! 🎉",
    successBody: "We'll take you to WhatsApp with everything filled in. Our team starts the conversation already knowing all about your property.",
    openWhatsApp: "Open WhatsApp",
    next: "Continue",
    back: "Back",
    finish: "Go to WhatsApp",
    close: "Close",
    privacy: "By continuing, you agree to our Privacy Policy.",
    requiredError: "Please fill in your name and your property's name.",
    servicesError: "Please pick at least one option.",
  },
};
