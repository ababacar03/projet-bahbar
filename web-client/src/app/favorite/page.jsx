"use client";

import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "@/api/userApi";
import { getBarById } from "@/api/barApi";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
  const [favBars, setFavBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const fetchFavBars = async () => {
      try {
        const favs = await getFavorites();
        const barsData = await Promise.all(
            favs.map((fav) => getBarById(fav._id, localStorage.getItem("token")))
        );
        if (mounted) setFavBars(barsData);
      } catch (e) {
        setErr(e?.response?.data?.message || "Erreur lors du chargement.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchFavBars();
    return () => { mounted = false; };
  }, []);

  const onRemove = async (barId) => {
    const snapshot = favBars;
    setFavBars((f) => f.filter((b) => b._id !== barId));
    try {
      await removeFavorite(barId);
    } catch (e) {
      setErr(e?.response?.data?.message || "Suppression impossible.");
      setFavBars(snapshot);
    }
  };

  if (loading) return <div className="p-4 text-center">Chargement…</div>;
  if (err) return <div className="p-4 text-red-500 text-center">{err}</div>;

  return (
      <div className="m-0 mx-auto w-[80%] flex flex-col gap-8 p-4">
        <h1 className="text-3xl font-bold text-center">Mes bars favoris</h1>

        {favBars.length === 0 ? (
            <p className="text-center text-gray-400">Aucun favori pour le moment.</p>
        ) : (
            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
              {favBars.map((bar) => (
                  <article
                      key={bar._id}
                      className="relative rounded-2xl shadow-lg overflow-hidden bg-white hover:scale-105 transform transition-all duration-300 cursor-pointer"
                      onClick={() => router.push(`/bars/${bar._id}`)}
                  >
                    <div className="relative aspect-[16/9] bg-gray-200">
                      {bar.image ? (
                          <img
                              src={bar.image}
                              alt={bar.nameBar || bar.name}
                              className="w-full h-full object-cover"
                          />
                      ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            Pas d'image
                          </div>
                      )}
                      <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemove(bar._id);
                          }}
                          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-red-50 text-red-500 cursor-pointer transition transform hover:scale-110"
                          title="Retirer des favoris"
                      >
                        <AiOutlineClose className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-4 flex flex-col gap-1">
                      <h3 className="font-semibold text-lg text-black">{bar.nameBar || bar.name}</h3>
                      {bar.address && (
                          <p className="text-sm text-gray-600 truncate">{bar.address}</p>
                      )}
                      {"rate" in bar && (
                          <p className="text-sm text-yellow-500">⭐ {bar.rate} / 5</p>
                      )}
                    </div>
                  </article>
              ))}
            </div>
        )}
      </div>
  );
}
