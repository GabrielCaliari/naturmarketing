/**
 * Depoimentos de clientes exibidos na home (seção Depoimentos) e usados como
 * fonte do schema Review/AggregateRating.
 *
 * ─── COMO ADICIONAR UM DEPOIMENTO ────────────────────────────────────────────
 *
 * Depoimento de TEXTO:
 *
 *   {
 *     id: "pousada-vale-verde",
 *     tipo: "texto",
 *     nome: "Maria Silva",
 *     cargo: "Proprietária",          // opcional
 *     hotel: "Pousada Vale Verde",
 *     localidade: "Monte Verde, MG",
 *     texto: "Em quatro meses as reservas diretas passaram de 20% para 45%.",
 *     nota: 5,                        // opcional, 1 a 5
 *     data: "2026-07-15",             // opcional, ISO — usada no schema Review
 *   }
 *
 * Depoimento em VÍDEO (o card mostra o poster + botão de play e abre o vídeo):
 *
 *   {
 *     id: "hotel-serra-azul",
 *     tipo: "video",
 *     nome: "João Pereira",
 *     cargo: "Diretor",
 *     hotel: "Hotel Serra Azul",
 *     localidade: "Campos do Jordão, SP",
 *     videoSrc: "/videos/depoimentos/hotel-serra-azul.mp4",   // em public/
 *     posterSrc: "/img/depoimentos/hotel-serra-azul.jpg",     // frame de capa
 *     captionsSrc: "/videos/depoimentos/hotel-serra-azul.vtt", // opcional, legendas WebVTT (WCAG 1.2.2)
 *     texto: "Frase curta de destaque.",  // opcional, aparece sob o vídeo
 *     nota: 5,
 *   }
 *
 * A seção só é renderizada quando existe pelo menos um depoimento aqui — nunca
 * publicar depoimento fictício: além de enganar o visitante, avaliação
 * inventada em schema Review é violação das diretrizes do Google.
 */

type DepoimentoBase = {
  /** slug único e estável — usado como key de lista e âncora */
  id: string;
  nome: string;
  cargo?: string;
  hotel: string;
  /** "Cidade, UF" — aparece sob o nome no card */
  localidade: string;
  /** 1 a 5; alimenta as estrelas do card e o AggregateRating */
  nota?: 1 | 2 | 3 | 4 | 5;
  /** ISO (YYYY-MM-DD) — vira datePublished no schema Review */
  data?: string;
};

export type DepoimentoTexto = DepoimentoBase & {
  tipo: "texto";
  texto: string;
};

export type DepoimentoVideo = DepoimentoBase & {
  tipo: "video";
  /** caminho a partir de public/ — ex.: "/videos/depoimentos/x.mp4" */
  videoSrc: string;
  /** frame de capa, mesma proporção do card (retrato 4/5 fica melhor) */
  posterSrc: string;
  /**
   * caminho a partir de public/ para o arquivo de legendas WebVTT (.vtt) —
   * ex.: "/videos/depoimentos/x.vtt". Opcional, mas recomendado: vídeo com
   * áudio precisa de legendas para atender WCAG 1.2.2 (nível A).
   */
  captionsSrc?: string;
  /** frase curta opcional exibida junto ao card de vídeo */
  texto?: string;
};

export type Depoimento = DepoimentoTexto | DepoimentoVideo;

/**
 * Lista viva. Vazia = seção não aparece na home.
 * Preencher conforme os depoimentos e vídeos reais forem ficando prontos.
 */
export const DEPOIMENTOS: Depoimento[] = [];
