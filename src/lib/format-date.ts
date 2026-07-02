// Formatador determinístico de datas "YYYY-MM-DD".
// Não usa new Date()/toLocaleDateString: parsing de ISO-date é UTC e a
// formatação usa o fuso local, o que faz o servidor (UTC) e o cliente (UTC-3)
// renderizarem dias diferentes — causa do hydration mismatch React #418.
const MONTHS_PT = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatDate(dateStr: string, locale: string): string {
  const [y, m, d] = dateStr.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d || m < 1 || m > 12) return dateStr;
  const day = String(d).padStart(2, "0");
  return locale === "en"
    ? `${MONTHS_EN[m - 1]} ${day}, ${y}`
    : `${day} de ${MONTHS_PT[m - 1]} de ${y}`;
}
