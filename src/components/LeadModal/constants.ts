export type ServiceCombo = { id: string; pt: string; en: string };

// Opções da etapa 2. Rótulos orientados a benefício, coerentes com os serviços
// do header e da seção "Como Atuamos". Cada página de serviço pré-seleciona
// uma ou mais destas opções (ver SERVICE_PRESELECT).
export const SERVICE_COMBOS: ServiceCombo[] = [
  { id: "instagram", pt: "Gestão completa de Instagram — criação do perfil, conteúdo e estratégia", en: "Full Instagram management — profile setup, content and strategy" },
  { id: "anuncios", pt: "Campanhas de anúncios pagos para gerar reservas diretas", en: "Paid ad campaigns to drive direct bookings" },
  { id: "audiovisual", pt: "Produção de fotos e vídeos profissionais das unidades", en: "Professional photo and video production of your property" },
  { id: "site-motor", pt: "Criação de site próprio com motor de reservas", en: "Custom website with a booking engine" },
  { id: "otimizacao-otas", pt: "Otimização dos anúncios nas plataformas (Booking, Airbnb)", en: "Listing optimization on OTAs (Booking, Airbnb)" },
  { id: "google-meu-negocio", pt: "Gestão do Google Meu Negócio", en: "Google Business Profile management" },
  { id: "seo", pt: "SEO para hotéis — aparecer no topo do Google", en: "Hotel SEO — rank at the top of Google" },
  { id: "atendimento", pt: "Estruturação do atendimento — scripts, funil e follow up", en: "Guest service setup — scripts, funnel and follow-up" },
  { id: "automacao-wa", pt: "Automação de atendimento no WhatsApp (respostas e follow up automáticos)", en: "WhatsApp service automation (automatic replies and follow-up)" },
  { id: "crm", pt: "Sistema de gestão de reservas (CRM)", en: "Booking management system (CRM)" },
  { id: "fidelizacao", pt: "Estratégia de fidelização para o hóspede voltar direto", en: "Loyalty strategy so guests rebook directly" },
  { id: "marca", pt: "Posicionamento e identidade da marca", en: "Brand positioning and identity" },
  { id: "relatorios", pt: "Relatórios mensais de desempenho e acompanhamento estratégico", en: "Monthly performance reports and strategic follow-up" },
  { id: "completo", pt: "Não sei ainda — quero um diagnóstico completo", en: "Not sure yet — I want a full assessment" },
];

// Mapa página de serviço → opções pré-marcadas na etapa 2 quando o lead chega
// pelo CTA daquela página. As chaves são os pathnames das páginas de serviço.
export const SERVICE_PRESELECT: Record<string, string[]> = {
  "/gestao-de-canais": ["instagram", "otimizacao-otas", "google-meu-negocio"],
  "/producao-audiovisual": ["audiovisual"],
  "/sites-para-hoteis": ["site-motor"],
  "/motor-de-reservas": ["site-motor", "crm"],
  "/reservas-diretas": ["site-motor"],
  "/google-hotel-ads": ["anuncios", "google-meu-negocio"],
  "/meta-ads": ["anuncios"],
  "/seo-para-hoteis": ["seo", "google-meu-negocio"],
  "/relatorios-performance": ["relatorios"],
  "/automacao-atendimento": ["automacao-wa", "atendimento"],
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
