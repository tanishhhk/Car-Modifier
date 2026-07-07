'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Calendar, BarChart2, Palette, Star, Shield, Zap } from 'lucide-react';
import { cars } from '@/lib/cars';

const TYPING_TEXTS = ['Customize.', 'Compare.', 'Experience.', 'Configure.'];

function TypingHero() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_TEXTS[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setTextIndex(i => (i + 1) % TYPING_TEXTS.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayed(isDeleting ? displayed.slice(0, -1) : current.slice(0, displayed.length + 1));
      }, isDeleting ? 60 : 100);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, textIndex]);

  return <span style={{ color: 'var(--accent-blue)' }}>{displayed}<span style={{ borderRight: '3px solid var(--accent-blue)', marginLeft: '2px', animation: 'blink 1s step-end infinite' }} /></span>;
}

function StatCounter({ end, label, suffix = '' }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (count >= end) return;
    const step = Math.ceil(end / 60);
    const timer = setTimeout(() => setCount(c => Math.min(c + step, end)), 25);
    return () => clearTimeout(timer);
  }, [count, end, started]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStarted(true); }, { threshold: 0.4 });
    const el = document.getElementById(`stat-${label}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [label]);

  return (
    <div id={`stat-${label}`} style={{ textAlign: 'center' }}>
      <p style={{ fontWeight: 900, fontSize: 'clamp(32px,5vw,52px)', margin: '0 0 6px', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {count}{suffix}
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
    </div>
  );
}

const featuredIds = ['ferrari-sf90', 'rolls-royce', 'toyota-supra', 'audi-q7'];

export default function HomePage() {
  const featured = cars.filter(c => featuredIds.includes(c.id));

  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-gradient" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        {/* Background orbs */}
        <div style={{ position: 'absolute', top: '15%', left: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <span className="badge badge-blue" style={{ marginBottom: '20px', display: 'inline-block', fontSize: '12px' }}>
            ✨ 16+ Premium Models Available
          </span>
        </div>

        <h1 className="fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, fontSize: 'clamp(36px,6vw,80px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 12px', maxWidth: '900px', letterSpacing: '-2px' }}>
          The Future of Car<br />
          <TypingHero />
        </h1>

        <p className="fade-in-up" style={{ animationDelay: '0.4s', opacity: 0, color: 'var(--text-muted)', fontSize: 'clamp(16px,2vw,20px)', maxWidth: '600px', lineHeight: 1.7, margin: '0 auto 40px' }}>
          Explore 16+ premium models, customize colors, compare specs side-by-side, and book your test drive — all in one seamless experience.
        </p>

        <div className="fade-in-up" style={{ animationDelay: '0.55s', opacity: 0, display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/models" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '16px', padding: '14px 32px', position: 'relative', zIndex: 1 }}>
            Start Configuring <ArrowRight size={18} />
          </Link>
          <Link href="/brands" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '16px', padding: '14px 32px' }}>
            Explore Brands
          </Link>
          <Link href="/test-drive" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '16px', padding: '14px 32px' }}>
            <Calendar size={17} /> Book Test Drive
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="fade-in-up" style={{ animationDelay: '1s', opacity: 0, marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scroll to explore</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────────────────── */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '40px' }}>
          <StatCounter end={16} suffix="+" label="Car Models" />
          <StatCounter end={10} suffix="+" label="Brands" />
          <StatCounter end={4} label="Categories" />
          <StatCounter end={100} suffix="%" label="Free to Use" />
        </div>
      </section>

      {/* ─── Featured Cars ────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span className="badge badge-violet" style={{ marginBottom: '16px', display: 'inline-block' }}>⭐ FEATURED</span>
            <h2 className="section-title">Handpicked Excellence</h2>
            <p className="section-subtitle">From everyday performance to supercar greatness</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '24px' }}>
            {featured.map((car, i) => (
              <Link key={car.id} href="/models" style={{ textDecoration: 'none', animationDelay: `${i * 0.1}s` }}>
                <div className="card-hover glass-light" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <div style={{ position: 'relative', paddingTop: '62%', background: '#0d0d18' }}>
                    <Image src={car.img} alt={car.name} fill style={{ objectFit: 'cover' }} sizes="350px" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
                    <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px' }}>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', margin: '0 0 4px', textTransform: 'uppercase', fontWeight: 600 }}>{car.brand}</p>
                      <h3 style={{ color: 'white', fontWeight: 800, fontSize: '18px', margin: '0 0 6px' }}>{car.name}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#60a5fa', fontWeight: 700, fontSize: '15px' }}>{car.price}</span>
                        <span className={`badge ${car.category === 'sports' ? 'badge-rose' : car.category === 'luxury' ? 'badge-violet' : car.category === 'suv' ? 'badge-green' : 'badge-blue'}`}>{car.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/models" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              View All 16 Models <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Why Us ───────────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-block' }}>WHY CARCONFIG</span>
            <h2 className="section-title">Built for Car Enthusiasts</h2>
            <p className="section-subtitle">Everything you need to find your dream car</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '24px' }}>
            {[
              { icon: Palette, title: 'Visual Configurator', desc: 'Choose from multiple colors for each model and see the tint applied live — no guesswork.', color: '#3b82f6' },
              { icon: BarChart2, title: 'Side-by-Side Compare', desc: 'Select up to 2 cars and compare their engine, mileage, price, and power in one view.', color: '#8b5cf6' },
              { icon: Star, title: 'Save Favorites', desc: 'Shortlist cars you love with the favorites button. Your list persists across sessions.', color: '#f43f5e' },
              { icon: Calendar, title: 'Instant Test Drive', desc: 'Book a test drive in minutes — pick your slot, location, and get confirmed instantly.', color: '#10b981' },
              { icon: Shield, title: 'Real Specifications', desc: 'Every stat — engine, mileage, horsepower, seats — is sourced from manufacturer data.', color: '#f59e0b' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Built with Next.js 14 and React 19. Zero lag, instant navigation, premium experience.', color: '#06b6d4' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card-hover" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '18px', padding: '28px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '12px', background: `${color}22`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '17px', marginBottom: '8px' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div className="gradient-border" style={{ borderRadius: '24px', padding: '60px 40px', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <Sparkles size={36} style={{ color: '#8b5cf6', marginBottom: '16px' }} />
            <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 900, margin: '0 0 16px', color: 'var(--text-primary)' }}>
              Ready to Find Your Perfect Car?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '17px', lineHeight: '1.7', marginBottom: '36px', maxWidth: '540px', margin: '0 auto 36px' }}>
              Browse 16 models across 4 categories. Customize, compare, and book — it takes less than 2 minutes.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/models" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '16px', padding: '14px 32px', position: 'relative', zIndex: 1 }}>
                Browse Models <ArrowRight size={17} />
              </Link>
              <Link href="/test-drive" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '16px', padding: '14px 32px' }}>
                <Calendar size={17} /> Book Test Drive
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
