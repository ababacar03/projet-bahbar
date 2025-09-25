'use client';

import { useEffect, useState } from "react";
import Input from "@/components/inputs/input";
import Button from "@/components/buttons/button";
import { register } from "@/api/authApi";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/middleware/auth-middleware";

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    const user = checkAuth();
    if (user) router.replace("/home");
  }, [router]);

  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(
          formData.username,
          formData.firstname,
          formData.name,
          formData.email,
          formData.password,
      );
      window.location.href = "/auth/login";
    } catch (err) {
      console.error("Erreur d'inscription (full):", err.response?.data || err.message);
      setError(err.response?.data?.message || "Une erreur est survenue");
    }
  };

  const navigateLogin = () => (window.location.href = "/auth/login");

  return (
      <div className="flex flex-row w-full h-full px-8 lg:px-16 gap-12 lg:gap-24">
        <div className="hidden lg:flex flex-col w-1/2 h-full sticky top-1/2 -translate-y-1/2 items-center justify-center">
          <h1 className="text-center text-8xl font-bold">BahBar</h1>
        </div>

        <form
            onSubmit={handleSubmit}
            className="bg-white w-full lg:max-w-[600px] min-h-screen p-12 flex flex-col gap-6 ml-auto"
        >
          <p className="text-purple-6 text-3xl font-bold text-center mt-8">Inscription</p>

          {["name", "firstname", "username", "email", "password"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                  {field === "firstname"
                      ? "Prénom"
                      : field === "name"
                          ? "Nom"
                          : field === "username"
                              ? "Nom d'utilisateur"
                              : field === "email"
                                  ? "Email"
                                  : "Mot de passe"}
                </label>
                <Input
                    type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    placeholder={`Entrez votre ${field}`}
                    className="w-full"
                    value={formData[field]}
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
