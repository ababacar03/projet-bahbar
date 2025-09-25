'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/inputs/input";
import Button from "@/components/buttons/button";
import { login } from "@/api/authApi";
import { checkAuth } from "@/middleware/auth-middleware";

export default function Login() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/home";

  useEffect(() => {
    const user = checkAuth();
    if (user) {
      router.replace(next);
    }
  }, [router, next]);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(formData.email, formData.password);
      router.replace(next);
    } catch (err) {
      const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Identifiants incorrects";
      setError(msg);
    }
  };

  const navigateRegister = () => {
    const url = next ? `/auth/register?next=${encodeURIComponent(next)}` : "/auth/register";
    router.push(url);
  };

  return (
      <div className="flex flex-row w-full h-full px-8 lg:px-16 gap-12 lg:gap-24">
        <div className="hidden lg:flex flex-col w-1/2 h-full sticky top-1/2 -translate-y-1/2 items-center justify-center">
          <h1 className="text-center text-8xl font-bold">BahBar</h1>
        </div>

        <form
            onSubmit={handleSubmit}
            className="bg-white w-full lg:max-w-[600px] min-h-screen p-12 flex flex-col gap-6 ml-auto shadow-xl"
        >
          <p className="text-purple-6 text-3xl font-bold text-center mt-8">Connexion</p>

          {next && next !== "/home" && (
              <p className="text-xs text-center text-gray-500">
                Vous serez redirigé vers <code className="px-1">{next}</code> après connexion.
              </p>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <Input
                type="email"
                id="email"
                name="email"
                placeholder="Entrez votre email"
                className="w-full"
                value={formData.email}
                onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mot de passe
            </label>
            <Input
                type="password"
                id="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                className="w-full"
                value={formData.password}
                onChange={handleChange}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex flex-col gap-4 mt-4">
            <Button type="submit" variant="color1" className="w-full">
              Se connecter
            </Button>
            <span className="text-blue-700 underline text-sm text-center cursor-not-allowed opacity-40">
            Mot de passe oublié ?
          </span>
          </div>

          <div className="flex flex-col gap-4 mt-12">
            <h2 className="text-purple-6 text-3xl font-bold text-center">
              Pas encore de compte ?
            </h2>
            <Button onClick={navigateRegister} className="w-full">
              Inscription
            </Button>
          </div>
        </form>
      </div>
  );
}
