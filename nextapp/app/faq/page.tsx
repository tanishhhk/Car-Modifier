'use client';

import { useState, useMemo } from 'react';
import { Search, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FaqItem from '@/components/FaqItem';

type FaqCategory = 'all' | 'general' | 'configurator' | 'test-drive' | 'account';

const FAQS: { category: Exclude<FaqCategory,'all'>; q: string; a: string }[] = [
  { category: 'general', q: 'What is CarConfig?', a: 'CarConfig is a free online car configurator that lets you browse 16+ premium car models across Sedan, SUV, Luxury, and Sports categories. You can customize colors, compare specs, save favorites, and book test drives — all without visiting a showroom.' },
  { category: 'general', q: 'Is CarConfig free to use?', a: 'Yes! CarConfig is completely free. Browse models, use the configurator, save favorites, and book test drives — no payment or subscription required.' },
  { category: 'general', q: 'Which car brands are available?', a: 'We currently list models from Honda, Mahindra, Toyota, Maruti, Hyundai, Tata, Mercedes, Audi, Rolls-Royce, Ferrari, Volkswagen, and Skoda — spanning budget, premium, luxury, and sports segments.' },
  { category: 'configurator', q: 'How does the car configurator work?', a: 'Click "View Details" on any car card to open the detail panel. From there, you can choose from 5 color swatches — the overlay tint updates in real-time to reflect your chosen color. You also see full specs including engine, mileage, horsepower, and pricing.' },
  { category: 'configurator', q: 'Can I save my car configurations?', a: 'You can use the ❤️ Favorites button on any car card to save models you love. Your favorites list is stored in your browser (localStorage) and persists across page reloads. Creating an account preserves them across devices in future versions.' },
  { category: 'configurator', q: 'How do I compare two cars?', a: 'Click the compare icon (⇄) on any two car cards. A sticky compare bar will appear at the bottom of the screen. Click "Compare Now" to see a side-by-side spec breakdown including engine, mileage, price, seats, and horsepower.' },
  { category: 'configurator', q: 'Can I filter models by brand or category?', a: 'Yes. On the Models page, use the category pills (All / Sedan / SUV / Luxury / Sports) to filter by type. You can also use the search bar to find any model by name or brand. Coming from the Brands page, clicking a brand card will automatically filter models for that brand.' },
  { category: 'test-drive', q: 'How do I book a test drive?', a: 'Go to the Test Drive page (or click "Book Test Drive" from any car detail panel). Fill in your name, email, and phone, then choose a car model, preferred date, time slot, and dealer location. You\'ll see a confirmation screen immediately after submitting.' },
  { category: 'test-drive', q: 'Is there a charge for booking a test drive?', a: 'No, booking a test drive through CarConfig is completely free. We connect you with the nearest authorized dealer at no cost.' },
  { category: 'test-drive', q: 'Which cities have available dealers?', a: 'We currently list dealers in New Delhi, Noida, Ghaziabad, Gurugram, Mumbai, Bengaluru, Chennai, Hyderabad, Pune, and Kolkata. More cities will be added as we expand our dealer network.' },
  { category: 'account', q: 'Do I need an account to use CarConfig?', a: 'No account is needed to browse models, use the configurator, or compare cars. You only need to log in to save configurations across devices or to receive email confirmations for test drives in future versions.' },
  { category: 'account', q: 'How do I create an account?', a: 'Click "Login" in the navbar, then choose "Sign Up". Enter your name, email, and a password of at least 6 characters. You can also log in with an OTP sent to your email. Account data is stored securely in your browser during this demo phase.' },
  { category: 'account', q: 'How do I log out?', a: 'Click the "Logout" button in the top navbar. This clears your session data. Your local favorites list is preserved even after logout.' },
];

const CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'configurator', label: 'Configurator' },
  { id: 'test-drive', label: 'Test Drive' },
  { id: 'account', label: 'Account' },
];

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('all');

  const filtered = useMemo(() =>
    FAQS.filter(f =>
      (activeCategory === 'all' || f.category === activeCategory) &&
      (f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    ), [search, activeCategory]);

  return (
    <div style={{ padding: '60px 24px 100px', maxWidth: '860px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '52px' }}>
        <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-block' }}>SUPPORT</span>
        <h1 className="section-title">Frequently Asked Questions</h1>
        <p className="section-subtitle">Everything you need to know about CarConfig</p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '28px' }}>
        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '48px', fontSize: '16px' }}
        />
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
        {CATEGORIES.map(({ id, label }) => (
          <button key={id} onClick={() => setActiveCategory(id)} style={{
            padding: '8px 18px', borderRadius: '999px', border: 'none', cursor: 'pointer',
            fontWeight: 600, fontSize: '13px',
            background: activeCategory === id ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : 'rgba(255,255,255,0.06)',
            color: activeCategory === id ? 'white' : 'var(--text-muted)',
            transition: 'all 0.2s ease',
          }}>
            {label} {id !== 'all' && `(${FAQS.filter(f => f.category === id).length})`}
          </button>
        ))}
      </div>

      {/* FAQ list */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</p>
          <p>No FAQs match "{search}". Try a different search.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((f, i) => (
            <FaqItem key={i} question={f.q} answer={f.a} />
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={{ marginTop: '60px', textAlign: 'center', padding: '40px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px' }}>
        <MessageCircle size={32} style={{ color: 'var(--accent-blue)', marginBottom: '16px' }} />
        <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '20px', marginBottom: '10px' }}>Still Have Questions?</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '15px' }}>Our team is happy to help. Book a test drive and ask us in person, or reach out directly.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/test-drive" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 1 }}>
            Book a Visit <ArrowRight size={16} />
          </Link>
          <a href="mailto:hello@carconfig.in" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
