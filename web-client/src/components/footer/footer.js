'use client';

import React from 'react';
import Link from 'next/link';
import LogoIcon from '@/assets/icons/Logo.svg';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-background-2-custom)] text-white w-full py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10">
        
        {/* Logo */}
        <Link href="/" className="block">
        <div className="flex flex-col md:items-start">
            <LogoIcon className="w-[120px] h-auto" />
          </div>
        </Link>
        {/* Liens */}
        <div className="flex flex-wrap gap-x-60 gap-y-16 text-sm">
          <div>
            <h4 className="font-semibold mb-3 text-[20px]">Liens</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Accueil</Link></li>
              <li><Link href="/favorite" className="hover:underline">Favoris</Link></li>
              <li><Link href="/search" className="hover:underline">Rechercher</Link></li>
              <li><Link href="/profile" className="hover:underline">Mon compte</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-[20px]">Mentions légales et sécurité</h4>
            <ul className="space-y-2">
              <li><Link href="/about/legal-notice" className="hover:underline">Mentions légales</Link></li>
              <li><Link href="/about/privacy-policy" className="hover:underline">Politique de confidentialité</Link></li>
              <li><Link href="/about/cgu" className="hover:underline">Conditions d’utilisation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-[20px]">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/support/contact" className="hover:underline">Contact support</Link></li>
              <li><Link href="/support/join" className="hover:underline">Comment nous rejoindre ?</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="bg-[var(--color-footer)] py-3 text-center text-sm mt-6 w-full">
        Réalisé dans le cadre d’un projet étudiant – Epitech 2025 – Pré-MSc
      </div>
    </footer>
  );
}
