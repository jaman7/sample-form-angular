export function toCamelCase(text: string): string {
  const tmpText = text.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
  return tmpText.substring(0, 1).toLowerCase() + tmpText.substring(1);
}
