export function darkenHexColor(hex: string, percent: number): string {
  const amount = Math.round(2.55 * percent); // 10% = 25
  return hex.replace(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, (_, r, g, b) => {
    const dr = Math.max(0, parseInt(r, 16) - amount).toString(16).padStart(2, '0');
    const dg = Math.max(0, parseInt(g, 16) - amount).toString(16).padStart(2, '0');
    const db = Math.max(0, parseInt(b, 16) - amount).toString(16).padStart(2, '0');
    return `#${dr}${dg}${db}`;
  });
}
