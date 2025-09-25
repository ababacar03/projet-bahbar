// API minimaliste avec fetch (sans axios)
const getApiOrigin = () => {
  if (process.env.NEXT_PUBLIC_API_ORIGIN) return process.env.NEXT_PUBLIC_API_ORIGIN;
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:5001`;
  }
  return "http://localhost:5001";
};

/**
 * Crée une session Stripe Checkout
 * @param {{amount:number, barId:string, barName?:string}} payload
 *        amount attendu en CENTIMES (ex: 1550 pour 15,50 €)
 * @returns {Promise<string>} checkoutUrl
 */
export async function createCheckoutSession({ amount, barId, barName = "" }) {
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("Montant invalide");
  if (!barId) throw new Error("barId requis");

  const origin = getApiOrigin();

  // ✅ le back attend des EUROS → convertit 1550 (cents) => "15.50"
  const amountEuros = (Number(amount) / 100).toFixed(2);

  const form = new FormData();
  form.append("amount", amountEuros);  // <-- envoi en euros "15.50"
  form.append("barId", barId);
  form.append("barName", barName);

  const headers = {};
  // token requis par ton back
  if (typeof window !== "undefined") {
    const t = localStorage.getItem("token");
    if (t) headers["Authorization"] = `Bearer ${t}`;
  }

  const res = await fetch(`${origin}/api/payment`, {
    method: "POST",
    headers,
    body: form,
  });

  const text = await res.text();
  if (!res.ok) {
    let msg = text;
    try {
      const j = JSON.parse(text);
      msg = j?.message || msg;
    } catch {}
    throw new Error(`HTTP ${res.status} — ${msg || "Échec paiement"}`);
  }

  // La doc dit “URL Stripe renvoyée” -> parfois string brute
  try {
    const j = JSON.parse(text);
    return j?.url || j?.checkoutUrl || text;
  } catch {
    return text;
  }
}
