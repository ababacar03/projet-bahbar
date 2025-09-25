"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { createCheckoutSession } from "@/api/paymentApi";

const fmtCents = (c) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" })
    .format((Number(c) || 0) / 100);

export default function CheckoutRedirectPage() {
  const { id: rawId } = useParams();
  const id = String(rawId || "");
  const q = useSearchParams();
  const router = useRouter();

  // 1) Essaie de lire le payload figé par la page Menu
  const stored = useMemo(() => {
    try {
      const s = typeof window !== "undefined" ? sessionStorage.getItem(`checkout:${id}`) : null;
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  }, [id]);

  // 2) Montant de référence : priorité au payload stocké, sinon QS
  const amount = useMemo(() => {
    if (stored?.totalCents && Number.isFinite(Number(stored.totalCents))) {
      return Number(stored.totalCents); // ← source de vérité
    }
    const raw = q.get("amount");
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  }, [stored, q]);

  const barName = stored?.barName || q.get("barName") || "";

  const [error, setError] = useState("");
  const [debug, setDebug] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (!id) throw new Error("URL invalide (barId manquant).");

        // Auth: route back protégée
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
          const nextUrl = new URL(window.location.pathname + window.location.search, window.location.origin);
          const loginUrl = new URL("/auth/login", window.location.origin);
          loginUrl.searchParams.set("next", nextUrl.pathname + nextUrl.search);
          router.replace(loginUrl.pathname + loginUrl.search);
          return;
        }

        if (!amount || amount <= 0 || !Number.isFinite(amount)) {
          throw new Error("Montant invalide.");
        }

        setDebug(`Paiement: amount=${amount} (cents) — barId=${id} — barName="${barName}"`);

        // Appel API -> URL Stripe -> redirect — on envoie amount exact (centimes)
        const url = await createCheckoutSession({ amount, barId: id, barName });
        if (!alive) return;
        window.location.href = url;
      } catch (e) {
        if (!alive) return;
        console.error("[checkout] error:", e);
        setError(e?.message || "Impossible de créer la session de paiement.");
      }
    })();
    return () => { alive = false; };
  }, [id, amount, barName, router]);

  return (
    <div className="m-0 mx-auto w-[92%] max-w-lg p-6">
      <h1 className="text-2xl font-bold mb-3">Redirection vers Stripe…</h1>
      <p className="text-sm text-gray-600">Total : <strong>{fmtCents(amount)}</strong></p>
      {!!barName && <p className="text-sm text-gray-600">Bar : <strong>{barName}</strong></p>}
      {error ? <p className="mt-4 text-red-600">{error}</p> : <p className="mt-4">Veuillez patienter…</p>}
      {debug && <pre className="mt-2 text-xs text-gray-400 whitespace-pre-wrap">{debug}</pre>}
    </div>
  );
}
