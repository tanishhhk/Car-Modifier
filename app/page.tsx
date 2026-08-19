'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cars } from '@/lib/cars';

const TYPING_TEXTS = ['Customize in 3D.', 'Configure CAD.', 'Design Interiors.', 'Schedule Garage.'];

function TypingHero() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_TEXTS[textIndex];
    let timeout: ReturnType<ReturnType<typeof setTimeout> extends number ? typeof setTimeout : any>;

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
      <section className="hero-gradient" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px 60px', position: 'relative' }}>
        <h1 className="fade-in-up" style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 16px', maxWidth: '900px', letterSpacing: '-1px' }}>
          The Future of Car<br />
          <TypingHero />
        </h1>

        <p className="fade-in-up" style={{ color: 'var(--text-muted)', fontSize: 'clamp(16px,2vw,18px)', maxWidth: '720px', lineHeight: 1.7, margin: '0 auto 40px' }}>
          Explore premium models, load high fidelity 3D CAD schematics, apply real world customizations, and schedule a garage consultation at your convenience.
        </p>

        <div className="fade-in-up" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/models" className="btn-primary" style={{ textDecoration: 'none', fontSize: '15px', padding: '12px 28px', borderRadius: '4px' }}>
            Start Customizing
          </Link>
          <Link href="/brands" className="btn-ghost" style={{ textDecoration: 'none', fontSize: '15px', padding: '12px 28px', borderRadius: '4px' }}>
            Explore Brands
          </Link>
          <Link href="/test-drive" className="btn-ghost" style={{ textDecoration: 'none', fontSize: '15px', padding: '12px 28px', borderRadius: '4px' }}>
            Garage Appointment
          </Link>
        </div>
      </section>

      {/* Feature Steps (2x2 grid format) */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '24px' }}>
          {[
            { step: '01', title: 'Load CAD Model', desc: 'Choose a car, select its model variant, and load its detailed 3D CAD schematic.' },
            { step: '02', title: 'Apply Customizations', desc: 'Modify body paint, alloy wheels, boot subwoofers, and seat trims live in 3D.' },
            { step: '03', title: 'Garage Consult', desc: 'Schedule a session with experts. They can visit your home, or you can visit their shop.' },
            { step: '04', title: 'Save & Drive', desc: 'Export your configuration and bring your dream build to life.' }
          ].map(f => (
            <div key={f.step} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'var(--bg-surface)', padding: '20px', borderRadius: '4px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-blue)' }}>{f.step}</span>
              <div>
                <h3 style={{ margin: '0 0 4px', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>{f.title}</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge" style={{ marginBottom: '12px', display: 'inline-block' }}>FEATURED MODELS</span>
            <h2 className="section-title">Select Model to Customize</h2>
            <p className="section-subtitle">Click any model below to open its dedicated 3D CAD customizer panel</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '24px' }}>
            {featured.map((car) => (
              <Link key={car.id} href="/models" style={{ textDecoration: 'none' }}>
                <div className="card-hover" style={{ background: 'var(--bg-card)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <div style={{ position: 'relative', paddingTop: '62%', background: '#0f172a' }}>
                    <Image src={car.img} alt={car.name} fill style={{ objectFit: 'cover' }} sizes="350px" />
                    <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px' }}>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', margin: '0 0 4px', textTransform: 'uppercase', fontWeight: 600 }}>{car.brand}</p>
                      <h3 style={{ color: 'white', fontWeight: 700, fontSize: '18px', margin: '0 0 6px' }}>{car.name}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'white', fontWeight: 600, fontSize: '15px' }}>{car.price}</span>
                        <span className="badge">{car.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/models" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', borderRadius: '4px' }}>
              View All Models
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge" style={{ marginBottom: '12px', display: 'inline-block' }}>CAPABILITIES</span>
            <h2 className="section-title">Built for Car Enthusiasts</h2>
            <p className="section-subtitle">An interactive customization suite</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '24px' }}>
            {[
              { title: 'Paint & Finishes', desc: 'Modify body paint with gloss, matte, or metallic swatches, or input a custom hex value.' },
              { title: 'Alloy Spokes', desc: 'Select and preview custom alloys like Chrome Spoke, Matte Black Star, Gold Mesh, or Sport Red Line.' },
              { title: '3D CAD Blueprints', desc: 'Switch between Exterior and 360 degree Interior look around views, or toggle the wireframe schematic.' },
              { title: 'Garage Consultations', desc: 'Schedule verified shops to perform customizations. Technicians visit your home or you visit them.' },
            ].map(({ title, desc }) => (
              <div key={title} className="card-hover" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '4px', padding: '24px' }}>
                <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '17px', marginBottom: '8px' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ borderRadius: '4px', padding: '48px 32px', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 800, margin: '0 0 16px', color: 'var(--text-primary)' }}>
              Ready to Customize in 3D?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
              Choose from our catalog, load its 3D CAD blueprint, configure it to your liking, and schedule your garage consultation.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/models" className="btn-primary" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', fontSize: '15px', padding: '12px 28px', borderRadius: '4px' }}>
                Browse Models
              </Link>
              <Link href="/test-drive" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', fontSize: '15px', padding: '12px 28px', borderRadius: '4px' }}>
                Garage Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
