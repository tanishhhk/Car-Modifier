'use client';

import { useState, useMemo } from 'react';
import { Search, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FaqItem from '@/components/FaqItem';

type FaqCategory = 'all' | 'general' | 'configurator' | 'appointments' | 'account';

const FAQS: { category: Exclude<FaqCategory,'all'>; q: string; a: string }[] = [
  { category: 'general', q: 'What is CarConfig?', a: 'CarConfig is a 3D car customization platform that lets you choose a car, load its detailed 3D CAD schematic, apply upgrades like custom paint, alloys, trunk subwoofers, and interiors, and schedule an appointment with local garages to discuss implementation details.' },
  { category: 'general', q: 'Is there a cost to use the 3D configurator?', a: 'No. CarConfig and its WebGL 3D customization suite are completely free to use. Scheduling garage appointments is also free of charge.' },
  { category: 'general', q: 'Which car brands are available?', a: 'We list models from Honda, Mahindra, Toyota, Maruti, Hyundai, Tata, Mercedes, Audi, Rolls Royce, Ferrari, Volkswagen, and Skoda.' },
  { category: 'configurator', q: 'How does the 3D CAD visualizer work?', a: 'Select a car model from our catalog, click "Open 3D CAD", and choose a variant. Our system loads the 3D mesh. You can then rotate it 360 degrees, toggle between Exterior and 360 degree Interior cabin views, or active the glowing CAD Wireframe mode.' },
  { category: 'configurator', q: 'What customizations can I apply in 3D?', a: 'You can customize paint colors (using preselected swatches or a custom color picker), choose between alloy wheel styles (Chrome Spoke, Matte Black Star, Golden Mesh, Sport Red Line), fit trunk subwoofers (JBL, Sony, Bass King) that animate in sync with mock soundwave pulses, and adjust cabin seat materials.' },
  { category: 'configurator', q: 'Can I view the inside of the car in 3D?', a: 'Yes. Switch the view mode to "Interior". The camera will position inside the car cabin. Drag with your mouse or finger to pan 360 degrees and view the dashboard, steering wheel, seats, and subwoofer acoustics.' },
  { category: 'appointments', q: 'How do garage appointments work?', a: 'Once you finish customizing, click "Schedule Garage Appointment". You can choose whether you visit their shop (Garage Visit) or if a technician team visits your home or office (Home Visit) to consult and build your custom configuration.' },
  { category: 'appointments', q: 'Who are the partner garages?', a: 'We partner with top local customization garages like Apex Auto Customizers, Precision Audio, GlowDrive Shop, HyperAudio, and Elite Leather Interiors.' },
  { category: 'appointments', q: 'What happens after I schedule an appointment?', a: 'You will see a confirmation screen. The partner garage will receive your exact Three.js configuration specs (car model, variant, paint hex, alloy style, woofer model, and cabin trim) and contact you to align on pricing and timeline.' },
  { category: 'account', q: 'Do I need an account to use the customizer?', a: 'No. You can load 3D CAD models, apply finishes, and schedule appointments without creating an account. Logging in is optional and helps track past configurations.' },
  { category: 'account', q: 'How do I log out?', a: 'Click the "Logout" button in the top navbar. Your favorites and session data are cleared immediately.' }
];

const CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'configurator', label: 'Configurator' },
  { id: 'appointments', label: 'Appointments' },
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
        <p className="section-subtitle">Everything you need to know about 3D CAD customization and garage scheduling</p>
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
          <p>No FAQs match "{search}". Try another query.</p>
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
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '15px' }}>Our partner garages are ready to guide you. Book an appointment to discuss details in person or at home.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/test-drive" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 1 }}>
            Book a Visit <ArrowRight size={16} />
          </Link>
          <a href="mailto:experts@carconfig.in" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
}
