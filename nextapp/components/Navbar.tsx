'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Car, Menu, X, LogOut, LogIn } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/brands', label: 'Brands' },
  { href: '/models', label: 'Models' },
  { href: '/test-drive', label: 'Test Drive' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(10,10,15,0.95)'
          : 'rgba(10,10,15,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}
    >
      <nav style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '10px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Car size={20} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '18px', color: 'white', letterSpacing: '-0.5px' }}>
            Car<span style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Config</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '4px', alignItems: 'center' }}
            className="hidden-mobile">
          {navLinks.map(link => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link href={link.href} style={{
                  color: active ? 'white' : 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: active ? 600 : 400,
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: active ? 'rgba(59,130,246,0.2)' : 'transparent',
                  border: active ? '1px solid rgba(59,130,246,0.4)' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  display: 'block',
                }}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn-ghost" style={{ padding: '8px 16px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LogOut size={15} /> Logout
            </button>
          ) : (
            <Link href="/login" className="btn-primary" style={{ padding: '8px 20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', position: 'relative', zIndex: 1 }}>
              <LogIn size={15} /> Login
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', display: 'none' }}
            className="show-mobile"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div style={{
          background: 'rgba(10,10,15,0.98)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 24px 24px',
        }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block', color: pathname === link.href ? '#3b82f6' : 'rgba(255,255,255,0.8)',
                textDecoration: 'none', padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
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
