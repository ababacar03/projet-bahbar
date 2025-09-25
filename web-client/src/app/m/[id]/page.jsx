// app/m/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function MenuViewer() {
  const params = useParams();
  const id = String(params?.id || "");
  const search = useSearchParams();
  const barName = search.get("name") || `Bar ${id.slice(0, 5)}…`;

  // ✅ on évite toute variable appelée "src"
  const [menuSource, setMenuSource] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
const [payOpen, setPayOpen] = useState(false); // affiche la popin
const [amount, setAmount] = useState("");      // montant en €


  useEffect(() => {
    if (!id) return;

    let mounted = true;
    (async () => {
      setError(null);
      setMenuSource(null);

      const candidates = [
        { url: `/menus/${id}.jpg`,  kind: "image" },
        { url: `/menus/${id}.png`,  kind: "image" },
        { url: `/menus/${id}.webp`, kind: "image" },
        { url: `/menus/${id}.pdf`,  kind: "pdf"   },
      ];

      for (const c of candidates) {
        try {
          const res = await fetch(c.url, { method: "HEAD", cache: "no-store" });
          if (res.ok) {
            if (!mounted) return;
            setMenuSource(c);
            return;
          }
        } catch {
          // on essaie le suivant
        }
      }
      if (mounted) setError("Aucun visuel de menu trouvé pour ce bar.");
    })();

    return () => { mounted = false; };
  }, [id]);
const goToCheckout = () => {
  const euros = parseFloat((amount || "0").replace(",", "."));
  if (!euros || euros <= 0) return alert("Entre un montant valide.");
  const cents = Math.round(euros * 100);

  // petit payload pour cohérence avec ton flow existant
  try {
    const payload = {
      barId: id,
      barName,
      totalCents: cents,
      items: [], // menu affiché en image -> pas de lignes
      ts: Date.now(),
    };
    sessionStorage.setItem(`checkout:${id}`, JSON.stringify(payload));
  } catch {}

  const url = new URL(`/checkout/${id}`, window.location.origin);
  url.searchParams.set("amount", String(cents));
  url.searchParams.set("barName", barName || "");
  router.push(url.pathname + url.search);
};

  return (
    <div className="min-h-dvh text-white flex flex-col">
      <header className="p-3 flex items-center justify-between">
        <h1 className="text-base font-semibold line-clamp-1">
          Menu — {barName}
        </h1>
      </header>

      <main className="flex-1 flex items-center justify-center p-2">
        {!menuSource && !error && <p className="opacity-80">Chargement…</p>}

        {error && (
          <div className="text-center opacity-90">
            <p className="mb-2">{error}</p>
            <p className="text-xs opacity-80">
              Ajoute un fichier dans{" "}
              <code>/public/menus/{id}.jpg|png|webp|pdf</code>
            </p>
          </div>
        )}

       {menuSource?.kind === "image" && (
  <div className="w-full h-full flex items-center justify-center">
    <Image
      src={menuSource.url}
      alt={`Menu ${barName}`}
      fill
      className="object-contain object-center"
      priority
      sizes="100vw"
    />
  </div>
  
)}
{/* Bouton flottant Payer */}
<button
  onClick={() => setPayOpen(true)}
  className="fixed bottom-6 right-6 z-[100] px-5 py-3 rounded-full bg-white text-black shadow-xl hover:opacity-90"
  aria-label="Payer"
>
  Payer
</button>

{/* Popin saisie du montant */}
{payOpen && (
  <div className="fixed inset-0 z-[110] bg-black/60 flex items-end sm:items-center sm:justify-center">
    <div className="w-full sm:w-[420px] bg-white text-black rounded-t-2xl sm:rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Payer — {barName}</h3>
        <button
          onClick={() => setPayOpen(false)}
          className="text-sm opacity-70 hover:opacity-100"
        >
          Fermer
        </button>
      </div>

      <label className="block text-sm mb-1">Montant (€)</label>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        inputMode="decimal"
        placeholder="ex: 24,50"
        className="w-full border rounded-xl px-3 py-2 mb-3"
      />

      <button
        onClick={goToCheckout}
        className="w-full rounded-xl bg-black text-white py-2 hover:opacity-90"
      >
        Continuer vers le paiement
      </button>

      <p className="text-xs text-gray-600 mt-2">
        Entre le total à payer (le menu est une image).
      </p>
    </div>
  </div>
)}

      </main>
    </div>
  );
}
