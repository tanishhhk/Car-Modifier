'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Calendar, Eye, Palette, Star, Shield, Zap, Wrench } from 'lucide-react';
import { cars } from '@/lib/cars';

const TYPING_TEXTS = ['Customize in 3D.', 'Configure CAD.', 'Design Interiors.', 'Schedule Garage.'];

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

const featuredIds = ['ferrari-sf90', 'rolls-royce', 'toyota-supra', 'audi-q7'];

export default function HomePage() {
  const featured = cars.filter(c => featuredIds.includes(c.id));

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        {/* Background orbs */}
        <div style={{ position: 'absolute', top: '15%', left: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <span className="badge badge-blue" style={{ marginBottom: '20px', display: 'inline-block', fontSize: '12px' }}>
            ✨ Interactive 3D CAD Visualization
          </span>
        </div>

        <h1 className="fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, fontSize: 'clamp(36px,6vw,80px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 12px', maxWidth: '900px', letterSpacing: '-2px' }}>
          The Future of Car<br />
          <TypingHero />
        </h1>

        <p className="fade-in-up" style={{ animationDelay: '0.4s', opacity: 0, color: 'var(--text-muted)', fontSize: 'clamp(16px,2vw,20px)', maxWidth: '720px', lineHeight: 1.7, margin: '0 auto 40px' }}>
          Explore premium models, load high fidelity 3D CAD schematics, apply real world customizations, and schedule a garage consultation at your convenience.
        </p>

        <div className="fade-in-up" style={{ animationDelay: '0.55s', opacity: 0, display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/models" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '16px', padding: '14px 32px', position: 'relative', zIndex: 1 }}>
            Start Customizing <ArrowRight size={18} />
          </Link>
          <Link href="/brands" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '16px', padding: '14px 32px' }}>
            Explore Brands
          </Link>
          <Link href="/test-drive" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '16px', padding: '14px 32px' }}>
            <Calendar size={17} /> Garage Appointment
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="fade-in-up" style={{ animationDelay: '1s', opacity: 0, marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scroll to explore</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
        </div>
      </section>

      {/* Feature Steps */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-glass-light)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '40px' }}>
          {[
            { step: '01', title: 'Load CAD Model', desc: 'Choose a car, select its model variant, and load its detailed 3D CAD schematic.' },
            { step: '02', title: 'Apply Customizations', desc: 'Modify body paint, alloy wheels, boot subwoofers, and seat trims live in 3D.' },
            { step: '03', title: 'Garage Consult', desc: 'Schedule a session with experts. They can visit your home, or you can visit their shop.' }
          ].map(f => (
            <div key={f.step} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '32px', fontWeight: 900, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{f.step}</span>
              <div>
                <h3 style={{ margin: '0 0 6px', fontWeight: 800, fontSize: '16px', color: 'var(--text-primary)' }}>{f.title}</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span className="badge badge-violet" style={{ marginBottom: '16px', display: 'inline-block' }}>⭐ FEATURED MODELS</span>
            <h2 className="section-title">Select Model to Customize</h2>
            <p className="section-subtitle">Click any model below to open its dedicated 3D CAD customizer panel</p>
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
              View All Models <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section style={{ padding: '100px 24px', background: 'var(--bg-glass-light)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-block' }}>CAPABILITIES</span>
            <h2 className="section-title">Built for Car Enthusiasts</h2>
            <p className="section-subtitle">A state of the art interactive customization suite</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '24px' }}>
            {[
              { icon: Palette, title: 'Paint & Finishes', desc: 'Modify body paint with gloss, matte, or chrome metallic swatches, or input a custom hex value.', color: '#3b82f6' },
              { icon: Wrench, title: 'Alloy Spokes', desc: 'Select and preview custom alloys like Chrome Spoke, Matte Black Star, Gold Mesh, or Sport Red Line.', color: '#8b5cf6' },
              { icon: Star, title: '3D CAD Blueprints', desc: 'Switch between Exterior and 360 degree Interior look around views, or toggle the glowing wireframe schematic.', color: '#f43f5e' },
              { icon: Calendar, title: 'Garage Consultations', desc: 'Schedule verified shops to perform customizations. Technicians visit your home or you visit them.', color: '#10b981' },
              { icon: Shield, title: 'Subwoofer Sound systems', desc: 'Fit subwoofers into the trunk and watch the speakers pulsate in sync with mock soundwave frequencies.', color: '#f59e0b' },
              { icon: Zap, title: 'Save Favorites', desc: 'Shortlist configurations that you love. Your selections persist across browser sessions.', color: '#06b6d4' },
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

      {/* CTA Banner */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div className="gradient-border" style={{ borderRadius: '24px', padding: '60px 40px', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <Sparkles size={36} style={{ color: '#8b5cf6', marginBottom: '16px' }} />
            <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 900, margin: '0 0 16px', color: 'var(--text-primary)' }}>
              Ready to Customize in 3D?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '17px', lineHeight: '1.7', marginBottom: '36px', maxWidth: '600px', margin: '0 auto 36px' }}>
              Choose from our catalog, load its 3D CAD blueprint, configure it to your liking, and schedule your garage consultation.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/models" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '16px', padding: '14px 32px', position: 'relative', zIndex: 1 }}>
                Browse Models <ArrowRight size={17} />
              </Link>
              <Link href="/test-drive" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '16px', padding: '14px 32px' }}>
                <Calendar size={17} /> Garage Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
