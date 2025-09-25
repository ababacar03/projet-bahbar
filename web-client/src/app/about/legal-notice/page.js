'use client';

import React from 'react';

export default function MentionsLegales() {
  return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center px-6 py-12 w-full">
        <div className="max-w-3xl w-full text-center space-y-8 text-lg">
          <h1 className="text-4xl font-bold">Mentions Légales</h1>

          <section>
            <h2 className="text-xl font-semibold mb-2">1. Éditeur de l'application</h2>
            <p>
              L’application <strong>BahBar</strong> est développée dans le cadre d’un projet étudiant – Epitech 2025 – Pré-MSc.
              <br />
              Responsable de la publication : Équipe projet BahBar
              <br />
              Contact : bahbar-contact@example.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Hébergement</h2>
            <p>
              L’hébergement de l’application est assuré par :
              <br />
              <strong>Vercel Inc.</strong>
              <br />
              440 N Barranca Ave #4133, Covina, CA 91723, United States
              <br />
              Site web : https://vercel.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Propriété intellectuelle</h2>
            <p>
              Tous les éléments de l’application BahBar (textes, images, logos, fonctionnalités) sont la propriété exclusive
              du groupe projet, sauf mentions contraires. Toute reproduction, représentation ou diffusion est interdite
              sans autorisation écrite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Données personnelles</h2>
            <p>
              Les données collectées sont traitées conformément à notre politique de confidentialité. Conformément au RGPD,
              vous pouvez accéder à vos données, les modifier ou les supprimer en nous contactant à : bahbar-contact@example.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
            <p>
              L’application utilise des cookies ou technologies similaires pour améliorer l’expérience utilisateur. Pour
              en savoir plus, consultez notre <a href="/politique-conf" className="text-blue-600 underline">politique de confidentialité</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Loi applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. Tout litige sera de la compétence exclusive
              des juridictions françaises.
            </p>
          </section>
        </div>
      </div>
  );
}