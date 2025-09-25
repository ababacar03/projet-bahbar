'use client';

import { useState, useEffect } from 'react';
import { getUserById, updateUser, deleteUser } from '@/api/userApi';
import { jwtDecode } from 'jwt-decode';

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    pseudo: '',
    password: '',
    email: '',
  });
  const [userId, setUserId] = useState(null);

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
          setFormData({
            nom: user.name || '',
            prenom: user.firstname || '',
            pseudo: user.username || '',
            password: '',
            email: user.email || '',
          });
        } catch (err) {
          console.error('Erreur récupération utilisateur', err);
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await updateUser(userId, {
        username: formData.pseudo,
        firstname: formData.prenom,
        name: formData.nom,
        email: formData.email,
        password: formData.password || undefined,
      });
      alert('Profil mis à jour avec succès');
    } catch (err) {
      console.error('Erreur modification profil', err);
    }
  };

  const handleDelete = async () => {
    if (confirm('Voulez-vous vraiment supprimer votre compte ?')) {
      try {
        await deleteUser(userId);
        localStorage.removeItem('token');
        alert('Compte supprimé');
        window.location.href = '/';
      } catch (err) {
        console.error('Erreur suppression compte', err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start px-4 py-10 w-full">
      <div className="w-full max-w-2xl">
        <h1 className="text-[40px] font-bold text-[var(--color-purple-6)] mb-4 text-center">
          Mon compte
        </h1>
        <p className="text-[var(--color-purple-6)] mb-8 text-[26px] text-center font-semibold">
          Bienvenue {formData.pseudo || 'Utilisateur'} !
        </p>

        {/* Formulaire */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
          {[
            { id: 'nom', label: 'Nom' },
            { id: 'prenom', label: 'Prénom' },
            { id: 'pseudo', label: 'Pseudonyme' },
            { id: 'password', label: 'Mot de passe', type: 'password' },
            { id: 'email', label: 'E-mail', span: true },
          ].map(({ id, label, type = 'text', span }) => (
            <div
              key={id}
              className={`flex flex-col space-y-2 ${span ? 'md:col-span-2' : ''}`}
            >
              <label htmlFor={id} className="text-sm text-gray-800">
                {label}
              </label>
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
          <button
            onClick={handleSubmit}
            className="bg-[var(--color-purple-6)] hover:bg-[var(--color-purple-11)] transition-colors duration-200 text-white py-2 rounded-lg w-full"
          >
            Modifier
          </button>
          <button
            onClick={handleDelete}
            className="bg-[var(--color-purple-6)] hover:bg-[var(--color-purple-11)] transition-colors duration-200 text-white py-2 rounded-lg w-full"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
