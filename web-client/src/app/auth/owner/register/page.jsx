'use client';

import { useEffect, useState } from "react";
import Input from "@/components/inputs/input";
import Button from "@/components/buttons/button";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/middleware/auth-middleware";

const SECRET_CODE = process.env.NEXT_PUBLIC_PROPRIO_KEY;

export default function RegisterOwner() {
    const router = useRouter();

    useEffect(() => {
        const user = checkAuth();
        if (user) router.replace("/home");
    }, [router]);

    const [formData, setFormData] = useState({
        code: "",
        name: "",
        firstname: "",
        username: "",
        email: "",
        password: "",
        nameBar: "",
        address: "",
        rate: 0,
        description: "",
        phone: "",
        website: "",
        openingHours: "",
        image: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.code !== SECRET_CODE) {
            setError("Code d'accès invalide");
            return;
        }

        try {
            const payload = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                name: formData.name,
                firstname: formData.firstname,
                nameBar: formData.nameBar,
                address: formData.address,
                rate: Number(formData.rate),
                description: formData.description,
                phone: formData.phone,
                website: formData.website,
                openingHours: formData.openingHours,
                image: formData.image,
            };

            const res = await fetch("http://localhost:5001/api/login/register/bar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.message || "Erreur lors de l'inscription");
            }

            window.location.href = "/auth/login";
        } catch (err) {
            console.error("Erreur inscription owner:", err.message);
            setError(err.message);
        }
    };

    const navigateLogin = () => window.location.href = "/auth/login";

    return (
        <div className="flex flex-row w-full h-fit px-8 lg:px-16 gap-12 lg:gap-24">
            <div className="hidden lg:flex flex-col w-1/2 h-full sticky top-1/2 -translate-y-1/2 items-center justify-center">
                <h1 className="text-center text-8xl font-bold">BahBar</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white w-full lg:max-w-[600px] min-h-screen p-12 flex flex-col gap-6 ml-auto">
                <p className="text-purple-6 text-3xl font-bold text-center mt-8">Inscription Propriétaire</p>

                {[
                    { key: "code", label: "Code secret", type: "password" },
                    { key: "name", label: "Nom", type: "text" },
                    { key: "firstname", label: "Prénom", type: "text" },
                    { key: "username", label: "Nom d'utilisateur", type: "text" },
                    { key: "email", label: "Email", type: "email" },
                    { key: "password", label: "Mot de passe", type: "password" },
                    { key: "nameBar", label: "Nom du bar", type: "text" },
                    { key: "address", label: "Adresse", type: "text" },
                    { key: "description", label: "Description", type: "text" },
                    { key: "phone", label: "Téléphone", type: "text" },
                    { key: "website", label: "Site web", type: "text" },
                    { key: "openingHours", label: "Horaires", type: "text" },
                    { key: "image", label: "Image (URL)", type: "text" },
                ].map(field => (
                    <div key={field.key}>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.key}>
                            {field.label}
                        </label>
                        <Input
                            type={field.type}
                            id={field.key}
                            name={field.key}
                            placeholder={`Entrez ${field.label.toLowerCase()}`}
                            className="w-full"
                            value={formData[field.key]}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <div className="flex flex-col gap-4 mt-4">
                    <Button type="submit" variant="color1" className="w-full">
                        S'inscrire
                    </Button>
                </div>

                <div className="flex flex-col gap-4 mt-12">
                    <h2 className="text-purple-6 text-3xl font-bold text-center">Vous avez déjà un compte ?</h2>
                    <Button onClick={navigateLogin} variant="color1" className="w-full">
                        Se connecter
                    </Button>
                </div>
            </form>
        </div>
    );
}
