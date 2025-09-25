'use client';

import { FaUser, FaHeart, FaHome, FaPowerOff } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: <FaUser className="w-6 h-6" />, label: 'Mon compte', href: '/profile' },
    { icon: <FaHeart className="w-6 h-6" />, label: 'Favoris', href: '/favorite' },
    { icon: <FaHome className="w-6 h-6" />, label: 'Accueil', href: '/home' },
    {
      icon: <FaPowerOff className="w-6 h-6" />,
      label: 'Déconnexion',
      onClick: () => {
        localStorage.removeItem('token');
        router.push('/auth/login');
      }
    },
  ];

  return (
      <aside className="fixed top-0 left-0 h-screen w-[120px] hover:w-[220px] bg-[var(--color-background-2-custom)] transition-all duration-300 flex flex-col py-6 px-2 gap-2 group z-[2000]">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;

          const content = (
              <div
                  onClick={item.onClick}
                  className={`flex justify-center items-center px-3 py-2 rounded-md transition-all text-white w-full
            ${isActive ? 'bg-[var(--color-purple-11)] font-semibold' : 'hover:bg-[var(--color-hover)]'}
            cursor-pointer`}
              >
                <div className="flex justify-center items-center shrink-0 transition-all duration-300 group-hover:opacity-0 w-8 group-hover:w-0">
                  {item.icon}
                </div>
                <div className="overflow-hidden whitespace-nowrap max-w-0 w-0 group-hover:w-auto opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100">
                  {item.label}
                </div>
              </div>
          );

          return item.href ? (
              <Link key={idx} href={item.href} passHref>
                {content}
              </Link>
          ) : (
              <div key={idx}>{content}</div>
          );
        })}
      </aside>
  );
}
