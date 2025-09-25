// src/api/authApi.js
import axios from "axios";

// Util: prend l'IP de la machine (ou la valeur de l'ENV si fournie)
const getApiOrigin = () => {
  if (process.env.NEXT_PUBLIC_API_ORIGIN) return process.env.NEXT_PUBLIC_API_ORIGIN;
  if (typeof window !== "undefined") {
    // même protocole/host que le front, port 5001 pour le back
    return `${window.location.protocol}//${window.location.hostname}:5001`;
  }
  // fallback SSR/dev
  return "http://localhost:5001";
};

const api = axios.create({ baseURL: getApiOrigin() });

// --- Auth --- //

export const register = async (username, firstname, name, email, password, role = "user") => {
  const payload = {
    username,
    firstname,
    name,
    email,
    password,
    roleAdmin: role === "admin",
    roleManager: role === "manager",
    roleUser: role === "user",
  };
  const { data } = await api.post("/api/login/register", payload);
  return data;
};

export const login = async (email, password) => {
  const { data } = await api.post("/api/login", { email, password });
  const { token } = data || {};
  if (token) localStorage.setItem("token", token);
  return data;
};
