'use client';

import { useRouter } from 'next/navigation';

export default function CGUPage() {
  const router = useRouter();

  const handleAccept = () => {
    router.push('/');
  };

  const handleDecline = () => {
    router.push('/');
  };

  return (
      <div className="min-h-screen  text-white flex flex-col items-center justify-center px-6 py-12 w-full">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-4xl font-bold mb-10">
            Conditions Générales d’Utilisation (CGU)
          </h1>

          <div className="space-y-10 text-lg text-center">
            <div>
              <h2 className="font-semibold text-xl mb-2">1. Objet</h2>
              <p>
                Les présentes CGU ont pour objet de définir les modalités et conditions d’utilisation
                des services proposés par l’application BahBar, accessible via le web et les
                applications mobiles iOS/Android.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-xl mb-2">2. Services proposés</h2>
              <p>BahBar permet :</p>
              <ul className="list-disc list-inside mt-2 text-left mx-auto max-w-md">
                <li>
                  Aux bars de se référencer, créer des événements, gérer une carte produit accessible
                  par QR Code, et recevoir des paiements.
                </li>
                <li>
                  Aux utilisateurs de consulter une carte des bars, rechercher par thème, commander et
                  payer en ligne, et consulter les événements.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-xl mb-2">3. Accès aux services</h2>
              <p>
                L’accès à certaines fonctionnalités nécessite la création d’un compte utilisateur ou
                gérant de bar. L’utilisateur s’engage à fournir des informations exactes et à les
                maintenir à jour.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-xl mb-2">4. Obligations de l'utilisateur</h2>
              <ul className="list-disc list-inside mt-2 text-left mx-auto max-w-md">
                <li>Ne pas utiliser l’application à des fins frauduleuses</li>
                <li>Respecter les lois en vigueur</li>
                <li>Ne pas perturber le bon fonctionnement des services</li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-xl mb-2">5. Responsabilité</h2>
              <p>
                BahBar met tout en œuvre pour assurer la disponibilité et la sécurité des services,
                mais ne saurait être tenu responsable des éventuelles interruptions de service ou
                pertes de données indépendantes de sa volonté.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-xl mb-2">6. Résiliation</h2>
              <p>
                L’utilisateur peut supprimer son compte à tout moment. BahBar se réserve le droit de
                suspendre ou résilier un compte en cas de non-respect des présentes CGU.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}