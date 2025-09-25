'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getBarById } from '@/api/barApi';
import { checkAuth } from '@/middleware/auth-middleware';

export default function BarPage() {
    const { id } = useParams();
    const [bar, setBar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchBar = async () => {
            try {
                const user = checkAuth();
                if (!user) throw new Error('Utilisateur non authentifié');

                const data = await getBarById(id, localStorage.getItem('token'));
                setBar(data);
            } catch (err) {
                console.error('Erreur chargement bar:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBar();
    }, [id]);

    if (loading) return <p className="text-white text-center">Chargement...</p>;
    if (!bar) return <p className="text-white text-center">Bar introuvable</p>;

    return (
        <div className="m-0 mx-auto w-[80%] flex flex-col gap-6 p-6 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold">{bar.name || bar.nameBar}</h1>
                {bar.image && (
                    <img
                        src={bar.image}
                        alt={bar.name}
                        className="mt-4 rounded-xl w-full max-w-2xl mx-auto shadow-lg"
                    />
                )}
            </div>

            <div className="bg-[var(--color-background-2-custom)] rounded-xl p-6 shadow-md flex flex-col gap-3 text-sm sm:text-base">
                <p><span className="font-semibold">📍 Adresse :</span> {bar.address}</p>
                <p><span className="font-semibold">⭐ Note :</span> {bar.rate || "Non noté"}</p>
                {bar.phone && <p><span className="font-semibold">📞 Téléphone :</span> {bar.phone}</p>}
                {bar.website && (
                    <p>
                        <span className="font-semibold">🌐 Site web :</span>{' '}
                        <a
                            href={bar.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-300 underline hover:text-purple-200"
                        >
                            Accéder au site officiel
                        </a>
                    </p>
                )}
                {bar.openingHours && (
                    <p><span className="font-semibold">🕒 Horaires :</span> {bar.openingHours}</p>
                )}
            </div>

            {bar.description && (
                <div className="bg-[var(--color-background-2-custom)] rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-semibold mb-2">À propos</h2>
                    <p className="leading-relaxed">{bar.description}</p>
                </div>
            )}
        </div>
    );
}
