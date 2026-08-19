'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Car, Sun, Moon, LogIn, LogOut, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/brands', label: 'Brands' },
  { href: '/models', label: 'Models' },
  { href: '/test-drive', label: 'Garage Appointment' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);

    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved as 'light' | 'dark');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        transition: 'all 0.2s ease',
        background: scrolled ? 'var(--bg-card)' : 'var(--bg-primary)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <nav style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--accent-blue)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Car size={20} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            GarageAZ
          </span>
        </Link>

        {/* Desktop nav */}
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '4px', alignItems: 'center' }}
            className="hidden-mobile">
          {navLinks.map(link => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${active ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="icon-btn-hover"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn-ghost" style={{ padding: '8px 18px', fontSize: '14px', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link href="/login" className="btn-primary" style={{ padding: '8px 18px', fontSize: '14px', textDecoration: 'none', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <LogIn size={16} /> Login
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="icon-btn-hover show-mobile"
            style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center' }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div style={{
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border)',
          padding: '16px 24px 24px',
        }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block', color: pathname === link.href ? 'var(--accent-blue)' : 'var(--text-primary)',
                textDecoration: 'none', padding: '12px 0',
                borderBottom: '1px solid var(--border)',
                fontWeight: pathname === link.href ? 600 : 400,
              }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
