"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import Cookies from 'js-cookie'

type Locale = 'pt' | 'en'

interface LocaleContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const translations: Record<Locale, Record<string, string>> = {
  pt: {
    // ── Header nav ──────────────────────────────────────────
    'nav.home': 'Início',
    'nav.empresa': 'Nossa Empresa',
    'nav.contact': 'Fale Conosco',
    'nav.blog': 'Blog',
    'nav.cta': 'Diagnóstico Gratuito',

    // ── Banner ──────────────────────────────────────────────
    'banner.badge': 'Agência de Marketing Hoteleiro',
    'banner.title.1': 'A agência de',
    'banner.title.2': 'marketing',
    'banner.title.3': 'para hotéis',
    'banner.title.4': 'que',
    'banner.title.5': 'converte.',
    'banner.subtitle': 'Mais reservas diretas. Menos OTAs.',
    'banner.subtitle.strong': 'Canal próprio trabalhando pelo seu hotel 24h.',
    'banner.cta.primary': 'Diagnóstico Gratuito',
    'banner.cta.secondary': 'Explorar',
    'banner.wa': 'https://wa.me/553597742984?text=Olá! Gostaria de receber um diagnóstico estratégico gratuito sobre a presença digital da minha hospedagem.',

    // ── Transform ────────────────────────────────────────────
    'transform.label': 'Nossa Especialidade',
    'transform.h3.1': 'Somos especialistas em Marketing Hoteleiro.',
    'transform.h3.2': 'Construímos canais próprios que geram',
    'transform.h3.highlight': 'reservas diretas',
    'transform.h3.end': 'e eliminam a comissão das OTAs.',
    'transform.body': 'Visibilidade de verdade, hóspedes que pagam pelo valor',
    'transform.body.strong': 'e margem que fica com você.',
    'transform.cta': 'Falar com um especialista',

    // ── Resultados ───────────────────────────────────────────
    'results.label': 'Resultados',
    'results.h2': 'Números que',
    'results.h2.strong': 'falam por si',
    'results.desc': 'Médias baseadas na performance dos hotéis que adotam estratégia integrada de marketing hoteleiro.',
    'results.stat1.label': 'Redução de dependência de OTAs',
    'results.stat1.desc': 'Média alcançada pelos hotéis que estruturam canal próprio de reservas com a Réserve.',
    'results.stat2.label': 'Aumento em reservas diretas',
    'results.stat2.desc': 'Hotéis com estratégia integrada triplicam o volume de reservas sem intermediários.',
    'results.stat3.label': 'Para resultados mensuráveis',
    'results.stat3.desc': 'Prazo médio para consolidar presença digital e colher retorno consistente sobre o investimento.',
    'results.stat4.label': 'Foco exclusivo em hotelaria',
    'results.stat4.desc': 'Não atendemos outros segmentos. Todo o nosso conhecimento é aplicado ao mercado hoteleiro.',

    // ── O Que Fazemos ────────────────────────────────────────
    'services.label': 'Como Atuamos',
    'services.h2': 'Soluções completas desenvolvidas para',
    'services.h2.strong': 'hotelaria',
    'services.body': 'Atuamos em todos os pontos de contato da jornada do hóspede de alto padrão.',
    'services.cta.text': 'Quer uma estratégia completa e integrada para o seu hotel?',
    'services.cta.strong': 'Solicite um diagnóstico gratuito.',
    'services.cta.btn': 'Falar com Especialista',
    'services.wa': 'https://wa.me/553597742984?text=Olá! Gostaria de receber um diagnóstico estratégico gratuito sobre a presença digital da minha hospedagem.',
    's1.title': 'Gestão de Canais Digitais',
    's1.desc': 'Redes sociais, OTAs e plataformas digitais gerenciadas de forma integrada — do Instagram ao Booking, do Google ao WhatsApp.',
    's2.title': 'Produção Audiovisual',
    's2.desc': 'Vídeos e fotografia de alto padrão que capturam a alma e a atmosfera única do seu hotel.',
    's3.title': 'Sites e Landing Pages',
    's3.desc': 'Interfaces focadas em conversão com navegação fluida e integração direta com motor de reservas.',
    's4.title': 'Google Ads & Hotel Ads',
    's4.desc': 'Google Hotel Ads, Search e Display segmentados para capturar viajantes no momento da decisão.',
    's5.title': 'Meta Ads',
    's5.desc': 'Anúncios no Facebook e Instagram que alcançam o público ideal e convertem em reservas diretas.',
    's6.title': 'SEO para Hotéis',
    's6.desc': 'Otimização focada em hotelaria para seu hotel aparecer antes dos concorrentes no Google.',
    's7.title': 'Relatórios de Performance',
    's7.desc': 'Análise profunda de ROI e métricas de desempenho para decisões baseadas em dados reais.',
    's8.title': 'Automação de Atendimento',
    's8.desc': 'Automação inteligente do WhatsApp para capturar leads, responder dúvidas e converter reservas 24h por dia.',

    // ── Para Quem Fazemos ────────────────────────────────────
    'para.label': 'Para quem fazemos',
    'para.h2': 'Marketing Hoteleiro para cada',
    'para.h2.strong': 'tipo de empreendimento',
    'para.learnmore': 'Saiba mais',
    'para.p1.label': 'Escala e Posicionamento',
    'para.p1.title': 'Hotéis e Resorts',
    'para.p1.desc': 'Estratégias que aumentam ocupação, elevam ticket médio e fortalecem a marca numa posição de liderança de mercado.',
    'para.p2.label': 'Alma e Exclusividade',
    'para.p2.title': 'Pousadas e Boutique Hotels',
    'para.p2.desc': 'Marketing personalizado para empreendimentos que querem se destacar pelo charme, autenticidade e experiência — não pelo preço.',
    'para.p3.label': 'Performance e Desejo',
    'para.p3.title': 'Airbnb & Temporada',
    'para.p3.desc': 'Para anfitriões que buscam o design visual impecável e a otimização de canais para maximizar reservas e avaliações.',

    // ── Comparativo ──────────────────────────────────────────
    'comp.label': 'O Comparativo',
    'comp.h2': 'A diferença é clara',
    'comp.left': 'Sem estrutura',
    'comp.right': 'Com a',
    'comp.sem1': 'Altas taxas de comissão nas OTAs',
    'comp.sem2': 'Comunicação genérica sem identidade',
    'comp.sem3': 'Marketing reativo e sem estratégia',
    'comp.sem4': 'Dependência total de intermediários',
    'comp.com1': 'Reservas diretas com zero comissão',
    'comp.com2': 'Posicionamento premium e diferenciado',
    'comp.com3': 'Estratégia integrada com ROI mensurável',
    'comp.com4': 'Canal próprio de aquisição de hóspedes',

    // ── FAQ ──────────────────────────────────────────────────
    'faq.label': 'Dúvidas Frequentes',
    'faq.h2': 'Perguntas sobre',
    'faq.h2.strong': 'Marketing Hoteleiro',
    'faq.q1': 'Qual a diferença entre contratar a Réserve e uma agência de marketing genérica?',
    'faq.a1': 'Uma agência generalista trata um hotel como qualquer outro negócio. A Réserve entende a sazonalidade do setor, a dinâmica das OTAs, o comportamento do hóspede no funil de reserva, o Google Hotel Ads e as estratégias específicas para aumentar a taxa de ocupação direta. Campanhas mal configuradas por quem não conhece a hotelaria desperdiçam orçamento e não geram reservas — a diferença no resultado é significativa.',
    'faq.q2': 'É possível reduzir a dependência das OTAs sem perder ocupação?',
    'faq.a2': 'Sim. A estratégia é usar as OTAs como vitrine e redirecionar a demanda para o canal direto com benefícios exclusivos: melhor tarifa no site próprio, early check-in, café da manhã incluso. Com site otimizado, motor de reservas eficiente e campanhas direcionadas, hotéis conseguem migrar de 80% de dependência de OTA para 40–50%, mantendo a ocupação e aumentando a margem por reserva.',
    'faq.q3': 'Quanto devo investir em marketing para o meu hotel ou pousada?',
    'faq.a3': 'O referencial de mercado é de 4% a 6% da receita anual. Para um hotel com meta de R$1.000.000 em faturamento, isso representa R$40.000 a R$60.000 por ano. Compare esse valor com o que você já paga em comissões para OTAs — que costumam variar entre 15% e 30% por reserva. Na maioria dos casos, o marketing próprio gera reservas com custo muito menor do que ficar dependente de plataformas.',
    'faq.q4': 'Meu hotel precisa de um site próprio se já aparece no Booking e no Airbnb?',
    'faq.a4': 'Com certeza. Estudos mostram que mais da metade dos viajantes que encontram um hotel numa OTA visita o site próprio antes de reservar. Um site próprio com motor de reservas elimina a comissão, permite personalizar a experiência do hóspede e é o principal ativo para qualquer estratégia de SEO e tráfego pago. Sem ele, você depende 100% das condições e algoritmos das plataformas.',
    'faq.q5': 'Como funciona a gestão do Google Hotel Ads?',
    'faq.a5': 'O Google Hotel Ads exibe o preço e a disponibilidade do seu hotel diretamente nos resultados de busca e no Google Maps, ao lado das OTAs. Integramos seu motor de reservas ao Google, gerenciamos lances e segmentação, e otimizamos continuamente para maximizar reservas diretas com o menor custo por conversão — capturando hóspedes no exato momento em que estão prontos para reservar.',
    'faq.q6': 'Quanto tempo leva para ver os primeiros resultados?',
    'faq.a6': 'Campanhas de tráfego pago (Google Ads, Meta Ads) podem gerar reservas em poucos dias. SEO e inbound marketing têm resultados crescentes e consistentes a partir de 3 a 6 meses. A estratégia ideal combina os dois: tráfego pago para resultados imediatos e SEO + conteúdo para construir uma base de reservas diretas sustentável e cada vez mais barata no longo prazo.',
    'faq.q7': 'Que resultados posso esperar e como são medidos?',
    'faq.a7': 'Os principais indicadores que acompanhamos são: custo por reserva gerada, taxa de conversão do site, receita de canais diretos vs. OTAs, taxa de ocupação por período e ROAS (retorno sobre gasto em anúncios). Toda estratégia é baseada em dados reais — não em métricas de vaidade como curtidas ou seguidores. Você recebe relatórios periódicos com visibilidade total dos resultados.',
    'faq.q8': 'A Réserve atende hotéis de qualquer porte e em todo o Brasil?',
    'faq.a8': 'Sim. Atendemos desde boutique hotels, pousadas de charme e hostels até grandes resorts, em todo o território nacional. Para propriedades menores, a estratégia foca em canais de alto impacto com menor orçamento — Google Meu Negócio otimizado, campanhas cirúrgicas e SEO local. Nossa equipe opera 100% digital, sem perda qualidade ou agilidade.',

    // ── Consultoria Banner ───────────────────────────────────
    'cta.badge': 'Diagnóstico Gratuito',
    'cta.title.1': 'Descubra por que seu',
    'cta.title.2': 'hotel',
    'cta.title.3': 'perde reservas',
    'cta.title.4': 'todos os dias',
    'cta.body': 'Solicite uma análise estratégica gratuita e receba um plano de ação personalizado.',
    'cta.body.strong': 'Aumente seu faturamento direto agora.',
    'cta.btn': 'Diagnóstico Gratuito',
    'cta.wa': 'https://wa.me/553597742984?text=Olá! Gostaria de receber um diagnóstico estratégico gratuito sobre a presença digital da minha hospedagem.',

    // ── Footer ───────────────────────────────────────────────
    'footer.rights': 'Todos os direitos reservados.',
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos e Condições',

    // ── Contact form ─────────────────────────────────────────
    'contact.name': 'Nome',
    'contact.email': 'E-mail',
    'contact.phone': 'Telefone / WhatsApp',
    'contact.hotel': 'Nome do Hotel / Pousada',
    'contact.message': 'Mensagem',
    'contact.submit': 'Enviar Mensagem',
    'contact.success': 'Mensagem enviada com sucesso!',
    'contact.error': 'Erro ao enviar. Tente novamente.',

    // ── Cookie consent ───────────────────────────────────────
    'cookie.accept': 'Aceitar',
    'cookie.decline': 'Recusar',
    'cookie.message': 'Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site.',
    'cookie.learnMore': 'Saiba mais',
  },

  en: {
    // ── Header nav ──────────────────────────────────────────
    'nav.home': 'Home',
    'nav.empresa': 'About Us',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'nav.cta': 'Free Diagnosis',

    // ── Banner ──────────────────────────────────────────────
    'banner.badge': 'Hotel Marketing Agency',
    'banner.title.1': 'The agency that',
    'banner.title.2': 'markets',
    'banner.title.3': 'hotels',
    'banner.title.4': 'and',
    'banner.title.5': 'converts.',
    'banner.subtitle': 'More direct bookings. Less OTAs.',
    'banner.subtitle.strong': 'Your own channel working for your hotel 24/7.',
    'banner.cta.primary': 'Free Diagnosis',
    'banner.cta.secondary': 'Explore',
    'banner.wa': 'https://wa.me/553597742984?text=Hello!%20I%20would%20like%20a%20free%20strategic%20diagnosis%20for%20my%20property.',

    // ── Transform ────────────────────────────────────────────
    'transform.label': 'Our Specialty',
    'transform.h3.1': 'We are specialists in Hotel Marketing.',
    'transform.h3.2': 'We build direct channels that generate',
    'transform.h3.highlight': 'direct bookings',
    'transform.h3.end': 'and eliminate OTA commissions.',
    'transform.body': 'Real visibility, guests who pay for value',
    'transform.body.strong': 'and margin that stays with you.',
    'transform.cta': 'Talk to a specialist',

    // ── Resultados ───────────────────────────────────────────
    'results.label': 'Results',
    'results.h2': 'Numbers that',
    'results.h2.strong': 'speak for themselves',
    'results.desc': 'Averages based on the performance of hotels that adopt an integrated hotel marketing strategy.',
    'results.stat1.label': 'OTA dependency reduction',
    'results.stat1.desc': 'Average achieved by hotels that build their own direct booking channel with Réserve.',
    'results.stat2.label': 'Increase in direct bookings',
    'results.stat2.desc': 'Hotels with integrated strategy triple their direct booking volume without intermediaries.',
    'results.stat3.label': 'To measurable results',
    'results.stat3.desc': 'Average timeframe to consolidate digital presence and get consistent ROI.',
    'results.stat4.label': 'Exclusive hospitality focus',
    'results.stat4.desc': 'We serve no other segments. All our expertise is applied to the hotel market.',

    // ── O Que Fazemos ────────────────────────────────────────
    'services.label': 'What We Do',
    'services.h2': 'Complete solutions built for',
    'services.h2.strong': 'hospitality',
    'services.body': 'We act at every touchpoint of the premium guest journey.',
    'services.cta.text': 'Want a complete, integrated strategy for your hotel?',
    'services.cta.strong': 'Request a free diagnosis.',
    'services.cta.btn': 'Talk to a Specialist',
    'services.wa': 'https://wa.me/553597742984?text=Hello!%20I%20would%20like%20a%20free%20strategic%20diagnosis%20for%20my%20property.',
    's1.title': 'Digital Channel Management',
    's1.desc': 'Social media, OTAs and digital platforms managed in an integrated way — from Instagram to Booking, from Google to WhatsApp.',
    's2.title': 'Audiovisual Production',
    's2.desc': 'High-quality videos and photography that capture the soul and unique atmosphere of your hotel.',
    's3.title': 'Websites & Landing Pages',
    's3.desc': 'Conversion-focused interfaces with smooth navigation and direct booking engine integration.',
    's4.title': 'Google Ads & Hotel Ads',
    's4.desc': 'Google Hotel Ads, Search and Display targeted to capture travelers at the moment of decision.',
    's5.title': 'Meta Ads',
    's5.desc': 'Facebook and Instagram ads that reach the ideal audience and convert into direct bookings.',
    's6.title': 'Hotel SEO',
    's6.desc': 'Hospitality-focused optimization so your hotel ranks above competitors on Google.',
    's7.title': 'Performance Reports',
    's7.desc': 'Deep ROI analysis and performance metrics for decisions based on real data.',
    's8.title': 'Chatbot & Automation',
    's8.desc': 'Intelligent WhatsApp automation to capture leads, answer questions and convert bookings 24/7.',

    // ── Para Quem Fazemos ────────────────────────────────────
    'para.label': 'Who We Serve',
    'para.h2': 'Hotel Marketing for every',
    'para.h2.strong': 'type of property',
    'para.learnmore': 'Learn more',
    'para.p1.label': 'Scale & Positioning',
    'para.p1.title': 'Hotels & Resorts',
    'para.p1.desc': 'Strategies that increase occupancy, raise average ticket and strengthen the brand in a market leadership position.',
    'para.p2.label': 'Soul & Exclusivity',
    'para.p2.title': 'Boutique Hotels & Pousadas',
    'para.p2.desc': 'Personalized marketing for properties that want to stand out for charm, authenticity and experience — not price.',
    'para.p3.label': 'Performance & Desire',
    'para.p3.title': 'Airbnb & Short-Term Rental',
    'para.p3.desc': 'For hosts seeking impeccable visual design and channel optimization to maximize bookings and reviews.',

    // ── Comparativo ──────────────────────────────────────────
    'comp.label': 'The Comparison',
    'comp.h2': 'The difference is clear',
    'comp.left': 'Without structure',
    'comp.right': 'With',
    'comp.sem1': 'High OTA commission rates',
    'comp.sem2': 'Generic communication without identity',
    'comp.sem3': 'Reactive marketing with no strategy',
    'comp.sem4': 'Total dependence on intermediaries',
    'comp.com1': 'Direct bookings with zero commission',
    'comp.com2': 'Premium and differentiated positioning',
    'comp.com3': 'Integrated strategy with measurable ROI',
    'comp.com4': 'Own guest acquisition channel',

    // ── FAQ ──────────────────────────────────────────────────
    'faq.label': 'FAQ',
    'faq.h2': 'Questions about',
    'faq.h2.strong': 'Hotel Marketing',
    'faq.q1': 'What is the difference between hiring Réserve and a generic marketing agency?',
    'faq.a1': 'A generalist agency treats a hotel like any other business. Réserve understands sector seasonality, OTA dynamics, guest behavior in the booking funnel, Google Hotel Ads and specific strategies to increase direct occupancy. Poorly configured campaigns by those who don\'t know hospitality waste budget and generate no bookings — the difference in results is significant.',
    'faq.q2': 'Is it possible to reduce OTA dependency without losing occupancy?',
    'faq.a2': 'Yes. The strategy is to use OTAs as a showcase and redirect demand to the direct channel with exclusive benefits: better rates on the hotel\'s own website, early check-in, included breakfast. With an optimized website, efficient booking engine and targeted campaigns, hotels can move from 80% OTA dependency to 40–50%, maintaining occupancy and increasing margin per booking.',
    'faq.q3': 'How much should I invest in marketing for my hotel?',
    'faq.a3': 'The market benchmark is 4% to 6% of annual revenue. For a hotel aiming for $1,000,000 in revenue, that represents $40,000 to $60,000 per year. Compare that with what you already pay in OTA commissions — which typically range from 15% to 30% per booking. In most cases, own marketing generates bookings at a much lower cost than remaining dependent on platforms.',
    'faq.q4': 'Does my hotel need its own website if it already appears on Booking and Airbnb?',
    'faq.a4': 'Absolutely. Studies show that more than half of travelers who find a hotel on an OTA visit the hotel\'s own website before booking. A website with a booking engine eliminates commissions, allows personalizing the guest experience and is the main asset for any SEO and paid traffic strategy. Without it, you\'re 100% dependent on the platforms\' terms and algorithms.',
    'faq.q5': 'How does Google Hotel Ads management work?',
    'faq.a5': 'Google Hotel Ads displays your hotel\'s price and availability directly in search results and on Google Maps, alongside OTAs. We integrate your booking engine with Google, manage bids and targeting, and continuously optimize to maximize direct bookings at the lowest cost per conversion — capturing guests at the exact moment they\'re ready to book.',
    'faq.q6': 'How long does it take to see the first results?',
    'faq.a6': 'Paid traffic campaigns (Google Ads, Meta Ads) can generate bookings within days. SEO and inbound marketing deliver growing, consistent results from 3 to 6 months. The ideal strategy combines both: paid traffic for immediate results and SEO + content to build a sustainable direct booking base that becomes cheaper over time.',
    'faq.q7': 'What results can I expect and how are they measured?',
    'faq.a7': 'The main indicators we track are: cost per booking generated, website conversion rate, revenue from direct vs. OTA channels, occupancy rate by period and ROAS (return on ad spend). Every strategy is based on real data — not vanity metrics like likes or followers. You receive periodic reports with full visibility of results.',
    'faq.q8': 'Does Réserve serve hotels of any size and anywhere in Brazil?',
    'faq.a8': 'Yes. We serve boutique hotels, charming pousadas and hostels up to large resorts, throughout Brazil and internationally. For smaller properties, the strategy focuses on high-impact channels with smaller budgets — optimized Google Business, surgical campaigns and local SEO. Our team operates 100% digitally, with no loss of quality or agility.',

    // ── Consultoria Banner ───────────────────────────────────
    'cta.badge': 'Free Diagnosis',
    'cta.title.1': 'Discover why your',
    'cta.title.2': 'hotel',
    'cta.title.3': 'is losing bookings',
    'cta.title.4': 'every day',
    'cta.body': 'Request a free strategic analysis and receive a personalized action plan.',
    'cta.body.strong': 'Increase your direct revenue now.',
    'cta.btn': 'Free Diagnosis',
    'cta.wa': 'https://wa.me/553597742984?text=Hello!%20I%20would%20like%20a%20free%20strategic%20diagnosis%20for%20my%20property.',

    // ── Footer ───────────────────────────────────────────────
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',

    // ── Contact form ─────────────────────────────────────────
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone / WhatsApp',
    'contact.hotel': 'Hotel / Property Name',
    'contact.message': 'Message',
    'contact.submit': 'Send Message',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Error sending. Please try again.',

    // ── Cookie consent ───────────────────────────────────────
    'cookie.accept': 'Accept',
    'cookie.decline': 'Decline',
    'cookie.message': 'We use cookies to improve your experience and analyze site traffic.',
    'cookie.learnMore': 'Learn more',
  },
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt')

  useEffect(() => {
    const saved = Cookies.get('locale') as Locale | undefined
    if (saved === 'en' || saved === 'pt') {
      setLocaleState(saved)
      return
    }
    const lang = navigator.language?.split('-')[0]?.toLowerCase()
    if (lang === 'en') {
      setLocaleState('en')
      Cookies.set('locale', 'en', { expires: 365 })
    }
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    Cookies.set('locale', l, { expires: 365 })
  }, [])

  const t = useCallback(
    (key: string) => translations[locale][key] ?? translations['pt'][key] ?? key,
    [locale]
  )

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

const defaultContext: LocaleContextValue = {
  locale: 'pt',
  setLocale: () => {},
  t: (key) => translations['pt'][key] ?? key,
}

export function useLocale() {
  return useContext(LocaleContext) ?? defaultContext
}
