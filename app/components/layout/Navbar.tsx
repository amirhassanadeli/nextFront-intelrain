'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'خانه', href: '/' },
  { name: 'خدمات', href: '/services' },
  { name: 'نمونه کارها', href: '/portfolio' },
  { name: 'درباره ما', href: '/about' },
  { name: 'تماس', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // بستن منو هنگام تغییر صفحه
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`
        fixed top-0 w-full z-50 text-white
        transition-all duration-300
        border-b border-white/10
        ${
          scrolled
            ? 'backdrop-blur-xl bg-black/70 py-4'
            : 'backdrop-blur-md bg-black/40 py-6'
        }
      `}
    >
      <div className="flex justify-between items-center px-6 md:px-12">
        
        {/* لوگو */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          اینتل‌رین
        </Link>

        {/* دسکتاپ */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  transition-colors duration-200
                  ${
                    isActive
                      ? 'text-indigo-400'
                      : 'text-gray-300 hover:text-indigo-400'
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden md:block border border-white/20 px-5 py-2 rounded-xl hover:bg-white hover:text-black transition"
        >
          شروع کنید
        </Link>

        {/* موبایل */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="منوی اصلی"
        >
          ☰
        </button>
      </div>

      {/* موبایل منو */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4 bg-black/80 backdrop-blur-xl border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`
                block py-2 text-sm
                ${
                  pathname === link.href
                    ? 'text-indigo-400'
                    : 'text-gray-300'
                }
              `}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="block text-center border border-white/20 py-2 rounded-xl hover:bg-white hover:text-black transition"
          >
            شروع کنید
          </Link>
        </div>
      )}
    </header>
  );
}