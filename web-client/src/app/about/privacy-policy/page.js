'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PolitiqueConfidentialite() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();

  const handleAccept = () => {
    setAccepted(true);
    router.push('/');
  };

  const handleDecline = () => {
    setAccepted(false);
    router.push('/');
  };

  return (
      <div className="min-h-screen text-white flex items-center justify-center px-6 py-12 w-full">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-4xl font-bold mb-10">
            Politique de Confidentialité
          </h1>

          <div className="space-y-10 text-lg">
            <section>
              <h2 className="font-semibold text-xl mb-2">1. Données collectées</h2>
              <p className="mb-2">BahBar collecte les données suivantes :</p>
              <ul className="list-disc list-inside inline-block text-left">
                <li>Données d’identification (nom, email, mot de passe chiffré)</li>
                <li>Données de géolocalisation (pour afficher les bars à proximité)</li>
                <li>Historique de commande et de paiement</li>
                <li>Informations sur les bars partenaires</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">2. Finalité du traitement</h2>
              <p className="mb-2">Les données sont utilisées pour :</p>
              <ul className="list-disc list-inside inline-block text-left">
                <li>Fournir les services décrits dans l’application</li>
                <li>Améliorer l’expérience utilisateur</li>
                <li>Gérer les paiements (via Stripe)</li>
                <li>Assurer la sécurité et la conformité légale</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">3. Partage des données</h2>
              <p className="mb-2">Les données peuvent être partagées avec :</p>
              <ul className="list-disc list-inside inline-block text-left">
                <li>Les bars pour traiter vos commandes</li>
                <li>Stripe, pour le traitement sécurisé des paiements</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">4. Sécurité des données</h2>
              <ul className="list-disc list-inside inline-block text-left">
                <li>Chiffrement des données en transit (HTTPS)</li>
                <li>Authentification sécurisée via JWT</li>
                <li>Sauvegarde automatique et journalisation des accès/modifications</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">5. Droits des utilisateurs</h2>
              <p className="mb-2">Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside inline-block text-left">
                <li>Accès à vos données</li>
                <li>Rectification ou suppression</li>
                <li>Opposition ou limitation du traitement</li>
                <li>Portabilité de vos données</li>
              </ul>
              <p className="mt-2">
                Pour exercer ces droits : [adresse email ou formulaire à définir]
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">6. Cookies</h2>
              <p>
                L’application peut utiliser des cookies ou technologies similaires à des fins
                d’authentification, d’analyse ou de personnalisation.
              </p>
            </section>
          </div>
        </div>
      </div>
  );
}