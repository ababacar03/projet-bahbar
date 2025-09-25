import axios from 'axios';

// Instance axios commune au module users
const instance = axios.create({
  baseURL: 'http://localhost:5001',
});

// 👉 Injecte automatiquement le token à chaque requête
instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const USERS_BASE = '/api/users';

// --------------------
// USERS
// --------------------

// GET - Tous les utilisateurs
export const getAllUsers = async () => {
  const res = await instance.get(USERS_BASE);
  return res.data?.users ?? res.data;
};

// GET - Un utilisateur par ID
export const getUserById = async (id) => {
  const res = await instance.get(`${USERS_BASE}/${id}`);
  return res.data?.user ?? res.data;
};

// PUT - Modifier un utilisateur
export const updateUser = async (id, updatedData) => {
  const res = await instance.put(`${USERS_BASE}/${id}`, updatedData);
  return res.data?.user ?? res.data;
};

// DELETE - Supprimer un utilisateur
export const deleteUser = async (id) => {
  const res = await instance.delete(`${USERS_BASE}/${id}`);
  return res.data;
};

// --------------------
// FAVORITES
// --------------------

// GET - Récupérer les bars favoris de l'utilisateur connecté
export const getFavorites = async () => {
  const res = await instance.get(`${USERS_BASE}/favorites`);
  return res.data?.favorites ?? res.data;
};

// POST - Ajouter un bar aux favoris
export const addFavorite = async (barId) => {
  const res = await instance.post(`${USERS_BASE}/favorites/${barId}`);
  return res.data;
};

// DELETE - Retirer un bar des favoris
export const removeFavorite = async (barId) => {
  const res = await instance.delete(`${USERS_BASE}/favorites/${barId}`);
  return res.data;
};
