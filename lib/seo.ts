/** Keep search-result descriptions concise without cutting through a word. */
export function toMetaDescription(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;

  const candidate = text.slice(0, maxLength - 1).trimEnd();
  const lastSpace = candidate.lastIndexOf(' ');
  const safeCut = lastSpace >= Math.floor(maxLength * 0.7)
    ? candidate.slice(0, lastSpace)
    : candidate;
  return `${safeCut}…`;
}
