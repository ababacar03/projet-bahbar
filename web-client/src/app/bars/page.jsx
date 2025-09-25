'use client';

import { useState, useEffect } from 'react';
import {
    createBar,
    getAllBars,
    getBarById,
    updateBar,
    deleteBar
} from '@/api/barApi';

export default function BarsCrudPage() {
    const [bars, setBars] = useState([]);
    const [selectedBarId, setSelectedBarId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        latitude: '',
        longitude: '',
        rate: '',
        description: '',
        image: '',
        address: '',
        phone: '',
        website: '',
        openingHours: '',
        manager: ''
    });
    const [token, setToken] = useState('');

    // Fonction pour récupérer les coordonnées via Nominatim
    const fetchCoordinates = async (address) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            );
            const data = await response.json();

            if (data.length > 0) {
                console.log(data);
                return {
                    latitude: data[0].lat,
                    longitude: data[0].lon
                };
            }
            return null;
        } catch (error) {
            console.error('Erreur lors de la récupération des coordonnées :', error);
            return null;
        }
    };

    // Charger le token au montage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) setToken(storedToken);
    }, []);

    // Charger la liste des bars
    useEffect(() => {
        const fetchBars = async () => {
            try {
                const data = await getAllBars();
                setBars(data);
            } catch (err) {
                console.error('Erreur récupération bars', err);
            }
        };
        fetchBars();
    }, []);

    // Charger un bar sélectionné ou réinitialiser
    useEffect(() => {
        if (selectedBarId) {
            const fetchBar = async () => {
                try {
                    const bar = await getBarById(selectedBarId, token);
                    setFormData({
                        name: bar.name || '',
                        latitude: bar.latitude || '',
                        longitude: bar.longitude || '',
                        rate: bar.rate || '',
                        description: bar.description || '',
                        image: bar.image || '',
                        address: bar.address || '',
                        phone: bar.phone || '',
                        website: bar.website || '',
                        openingHours: bar.openingHours || '',
                        manager: bar.manager || ''
                    });
                } catch (err) {
                    console.error('Erreur récupération bar', err);
                }
            };
            fetchBar();
        } else {
            // Réinitialisation des champs si on choisit "-- Nouveau Bar --"
            setFormData({
                name: '',
                latitude: '',
                longitude: '',
                rate: '',
                description: '',
                image: '',
                address: '',
                phone: '',
                website: '',
                openingHours: '',
                manager: ''
            });
        }
    }, [selectedBarId, token]);

    // Gestion des changements de champs
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Si l'adresse change, on tente de récupérer les coordonnées
        if (name === 'address' && value.trim().length > 5) {
            const coords = await fetchCoordinates(value);
            if (coords) {
                setFormData(prev => ({
                    ...prev,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }));
            }
        }
    };

    const handleCreate = async () => {
        try {
            await createBar(
                formData.name,
                formData.latitude,
                formData.longitude,
                formData.rate,
                formData.description,
                formData.image,
                formData.address,
                formData.phone,
                formData.website,
                formData.openingHours,
                formData.manager,
                token
            );
            alert('Bar créé avec succès');
            window.location.reload();
        } catch (err) {
            console.error('Erreur création bar', err);
        }
    };

    const handleUpdate = async () => {
        try {
            await updateBar(
                selectedBarId,
                formData.name,
                formData.latitude,
                formData.longitude,
                formData.rate,
                formData.description,
                formData.image,
                formData.address,
                formData.phone,
                formData.website,
                formData.openingHours,
                formData.manager,
                token
            );
            alert('Bar modifié avec succès');
        } catch (err) {
            console.error('Erreur modification bar', err);
        }
    };

    const handleDelete = async () => {
        if (confirm('Voulez-vous vraiment supprimer ce bar ?')) {
            try {
                await deleteBar(selectedBarId, token);
                alert('Bar supprimé');
                window.location.reload();
            } catch (err) {
                console.error('Erreur suppression bar', err);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-start px-4 py-10 w-full">
            <div className="w-full max-w-4xl">
                <h1 className="text-[40px] font-bold text-[var(--color-purple-6)] mb-4 text-center">
                    Gestion des Bars
                </h1>

                {/* Sélecteur de bar */}
                <div className="mb-6">
                    <label className="block mb-2">Sélectionner un bar :</label>
                    <select
                        value={selectedBarId}
                        onChange={(e) => setSelectedBarId(e.target.value)}
                        className="w-full border rounded px-4 py-2"
                    >
                        <option value="">-- Nouveau Bar --</option>
                        {bars.map((bar) => (
                            <option key={bar._id} value={bar._id}>
                                {bar.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Formulaire CRUD */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
                    {[
                        { id: 'name', label: 'Nom' },
                        { id: 'rate', label: 'Note' },
                        { id: 'description', label: 'Description', span: true },
                        { id: 'image', label: 'Image URL', span: true },
                        { id: 'address', label: 'Adresse', span: true },
                        { id: 'phone', label: 'Téléphone' },
                        { id: 'website', label: 'Site Web', span: true },
                        { id: 'openingHours', label: 'Horaires', span: true },
                        { id: 'manager', label: 'Manager' }
                    ].map(({ id, label, type = 'text', span }) => (
                        <div
                            key={id}
                            className={`flex flex-col space-y-2 ${span ? 'md:col-span-2' : ''}`}
                        >
                            <label htmlFor={id} className="text-sm text-gray-800">{label}</label>
                            <input
                                id={id}
                                name={id}
                                type={type}
                                value={formData[id]}
                                onChange={handleChange}
                                className="rounded-lg px-4 py-2 text-sm bg-white text-black w-full"
                                placeholder={label}
                            />
                        </div>
                    ))}
                </div>

                {/* Boutons */}
                <div className="flex flex-col gap-4">
                    {selectedBarId ? (
                        <>
                            <button
                                onClick={handleUpdate}
                                className="bg-[var(--color-purple-6)] hover:bg-[var(--color-purple-11)] text-white py-2 rounded-lg w-full"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-800 text-white py-2 rounded-lg w-full"
                            >
                                Supprimer
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleCreate}
                            className="bg-green-600 hover:bg-green-800 text-white py-2 rounded-lg w-full"
                        >
                            Créer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
