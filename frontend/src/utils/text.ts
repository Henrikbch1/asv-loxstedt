export function stripHtml(html: string): string {
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, " ");
  }

  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");

  return document.body.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

export function getExcerpt(
  html: string | null | undefined,
  maxLength = 180,
): string {
  if (!html) {
    return "";
  }

  const text = stripHtml(html);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}
