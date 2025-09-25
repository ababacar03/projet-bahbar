"use client";

import Map from "@/components/Map/Map";
import Cards from "@/components/cards/cards";
import { useEffect, useState } from "react";
import Searchbar from "@/components/searchbar/searchbar";
import RatingStars from "@/components/RatingStars/RatingStars";
import { AiOutlineClose, AiOutlineExpand } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { MdQrCode2 } from "react-icons/md";
import QRCode from "react-qr-code";
import axios from "axios";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {getFavorites, addFavorite, removeFavorite, getUserById} from "@/api/userApi";
import {jwtDecode} from "jwt-decode";

const api = axios.create({
    baseURL: "http://localhost:5001/api/bars",
});

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

async function fetchAllBars() {
    const { data } = await api.get("/");
    return data || [];
}

export default function Home() {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [bars, setBars] = useState([]);
    const [allBars, setAllBars] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [qrOpenFor, setQrOpenFor] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState('');

    const menuUrlFor = (bar) => {
        if (!bar?._id) return "";
        const base =
            process.env.NEXT_PUBLIC_APP_ORIGIN ||
            (typeof window !== "undefined" ? window.location.origin : "");
        const url = new URL(`/m/${bar._id}`, base);
        url.searchParams.set("name", bar.name || bar.nameBar || "");
        return url.toString();
    };

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        console.log(token)
        if (!token) {
            router.replace("/auth/login");
            return;
        }

        Promise.all([fetchAllBars(), getFavorites()])
            .then(([allBarsData, favs]) => {
                setBars(allBarsData);
                setAllBars(allBarsData);
                setFavoriteIds(favs.map((f) => f._id));
            })
            .catch((err) => {
                console.error("Erreur :", err?.response?.status, err?.response?.data || err?.message);
                if (err?.response?.status === 401) router.replace("/auth/login");
            });
    }, [router]);

    // Charger l'utilisateur connecté
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.id || decoded._id);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const user = await getUserById(userId);
                    setUserName(user.username);
                } catch (err) {
                    console.error('Erreur récupération utilisateur', err);
                }
            };
            fetchUser();
        }
    }, [userId]);

    const toggleFavorite = async (barId) => {
        try {
            if (favoriteIds.includes(barId)) {
                await removeFavorite(barId);
                setFavoriteIds(favoriteIds.filter((id) => id !== barId));
            } else {
                await addFavorite(barId);
                setFavoriteIds([...favoriteIds, barId]);
            }
        } catch (e) {
            console.error("Erreur favoris :", e?.response?.data || e.message);
        }
    };

    const toggleQr = (barId) => setQrOpenFor((prev) => (prev === barId ? null : barId));
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const filteredBars = bars.filter(
        (bar) =>
            bar.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bar.nameBar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bar.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bar.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const popularBars = [...allBars].sort((a, b) => (b.rate || 0) - (a.rate || 0)).slice(0, 4);

    const QRButton = ({ bar }) =>
        qrOpenFor === bar._id && bar._id ? (
            <div className="absolute z-20 top-10 left-2 bg-white p-2 rounded-xl shadow">
                <QRCode value={menuUrlFor(bar)} size={120} level="M" />
            </div>
        ) : null;

    const renderBarCard = (bar) => (
        <Cards
            key={bar._id}
            image={bar.image || "https://images.unsplash.com/photo-1724452588657-9ab0f8865a2e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D%3D"}
            className="relative w-[460px] shrink-0 rounded-2xl bg-white text-black h-[168px] shadow-md flex hover:bg-purple-11 transition ease-in-out duration-300 cursor-pointer"
            alt={bar.name || bar.nameBar}
            onClick={() => router.push(`/bars/${bar._id}`)}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleQr(bar._id);
                }}
                className="absolute top-2 left-2 z-10 bg-white/90 hover:bg-white rounded-full p-1 shadow"
                title="Afficher le QR du menu"
            >
                <MdQrCode2 className="w-5 h-5" />
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(bar._id);
                }}
                className="absolute z-10 top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                title={favoriteIds.includes(bar._id) ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
                {favoriteIds.includes(bar._id) ? (
                    <AiFillHeart className="text-red-500 w-5 h-5" />
                ) : (
                    <AiOutlineHeart className="text-gray-500 w-5 h-5" />
                )}
            </button>
            <QRButton bar={bar} />
            <div className="flex flex-col p-3 w-full">
                <div className="flex flex-col h-full">
                    <div className="flex flex-row justify-between items-center w-full mb-2">
                        <h1 className="font-semibold">{bar.name || bar.nameBar}</h1>
                        <div className="flex flex-row">
                            {bar.tags?.map((tag, i) => (
                                <span
                                    key={i}
                                    className="inline-block bg-purple-10 text-white px-2 py-1 rounded-full text-xs mr-2"
                                >
                  {tag}
                </span>
                            ))}
                        </div>
                    </div>
                    <RatingStars rating={bar.rate || 0} />
                    <p className="text-[10px]">{bar.address}</p>
                </div>
                <div>
                    <p className="text-[12px] line-clamp-4">{bar.description}</p>
                </div>
            </div>
        </Cards>
    );

    return (
        <div className="m-0 mx-auto w-[80%] flex flex-col gap-12 p-4">
            {/* Header */}
            <div className="flex flex-row justify-between gap-4 items-center">
                <h3 className="text-lg font-bold">Bienvenue, {userName}</h3>
                <div className="flex flex-row gap-3 items-center">
                    <Searchbar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </div>

            {/* Les plus populaires */}
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Les plus populaires</h2>
                <div className="flex flex-row gap-4 overflow-x-auto w-full py-2">
                    {popularBars.map(renderBarCard)}
                </div>
            </section>

            {/* Liste des bars */}
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">La liste des bars</h2>
                <div className="flex flex-row gap-4 overflow-x-auto w-full py-2">
                    {filteredBars.map(renderBarCard)}
                </div>
            </section>

            {/* Carte */}
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Trouves un bar près de chez toi</h2>
                {!modalOpen && (
                    <div className="max-h-[400px] rounded-2xl overflow-hidden relative">
                        <Map bars={filteredBars} />
                        <button
                            onClick={openModal}
                            className="absolute top-2 right-2 z-[500] bg-white text-black px-3 py-1 rounded-lg shadow-md hover:bg-purple-11 transition cursor-pointer"
                            title="Agrandir la carte"
                        >
                            <AiOutlineExpand className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </section>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/70 z-[999] flex items-center justify-center">
                    <div className="relative w-full h-full">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-[1000] bg-white text-black px-3 py-1 rounded-lg shadow-md hover:bg-purple-11 transition cursor-pointer"
                            title="Réduire la carte"
                        >
                            <AiOutlineClose className="w-5 h-5" />
                        </button>
                        <div className="w-full h-full">
                            <Map bars={filteredBars} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
