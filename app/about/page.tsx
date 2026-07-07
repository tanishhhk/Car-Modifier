'use client';

import Link from 'next/link';
import { Target, Zap, Heart, ArrowRight } from 'lucide-react';

const team = [
  { name: 'Riya Sharma', role: 'Lead 3D Designer', emoji: '👩‍💻', color: '#3b82f6' },
  { name: 'Arjun Mehta', role: '3D WebGL Developer', emoji: '👨‍🔧', color: '#8b5cf6' },
  { name: 'Priya Nair', role: 'Product Manager', emoji: '👩‍💼', color: '#f43f5e' },
];

const milestones = [
  { year: '2023', event: 'Project launched with 6 car models' },
  { year: '2024', event: 'Expanded to 16 models across 10 brands' },
  { year: '2025', event: 'Redesigned with Next.js 14 and React 19' },
  { year: '2026', event: 'Launched WebGL 3D CAD customizer and garage integration' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient" style={{ padding: '100px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span className="badge badge-violet" style={{ marginBottom: '20px', display: 'inline-block' }}>OUR STORY</span>
          <h1 className="section-title" style={{ marginBottom: '20px' }}>
            We Believe Customizing a Car<br />
            Should Be an <span className="gradient-text">Experience</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
            CarConfig was built to give every car owner the power to visualize real world upgrades, load detailed 3D CAD schematics, and consult local garages to bring their vision to life.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '100px 24px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '24px' }}>
          {[
            { icon: Target, title: 'Our Mission', color: '#3b82f6', desc: 'Democratize the car customization experience. Every enthusiast deserves to preview paint finishes, alloy wheels, and subwoofers in high fidelity 3D before committing to a build.' },
            { icon: Zap, title: 'Our Technology', color: '#8b5cf6', desc: 'Built with Next.js 16, React 19, TypeScript, and Three.js WebGL. Our procedural rendering pipeline runs smooth on mobile devices and 4K displays alike.' },
            { icon: Heart, title: 'Our Values', color: '#f43f5e', desc: 'Transparency in design, collaboration with certified local tuning shops. We connect you directly with experts, no middleman markup, no high pressure sales.' },
          ].map(({ icon: Icon, title, color, desc }) => (
            <div key={title} className="card-hover" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px' }}>
              <div style={{ width: 52, height: 52, borderRadius: '14px', background: `${color}22`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Icon size={24} style={{ color }} />
              </div>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '20px', marginBottom: '12px' }}>{title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.75', margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '100px 24px', background: 'var(--bg-glass-light)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-block' }}>HOW IT WORKS</span>
          <h2 className="section-title" style={{ marginBottom: '52px' }}>Three Steps to Customize</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '32px' }}>
            {[
              { step: '01', title: 'Load CAD Model', desc: 'Select a car model and variant to generate its structural 3D CAD mesh.' },
              { step: '02', title: 'Customize in 3D', desc: 'Pick colors, swap out alloys, add subwoofers, and design the cabin interior.' },
              { step: '03', title: 'Consult Nearest Garage', desc: 'Schedule a home visit or shop consultation to discuss build execution details.' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 900, color: 'var(--accent-blue)' }}>{step}</div>
                <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '18px', margin: 0 }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '100px 24px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge badge-rose" style={{ marginBottom: '16px', display: 'inline-block' }}>THE TEAM</span>
          <h2 className="section-title" style={{ marginBottom: '52px' }}>People Behind CarConfig</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '24px' }}>
            {team.map(({ name, role, emoji, color }) => (
              <div key={name} className="card-hover" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px 24px', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: `${color}22`, border: `2px solid ${color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', margin: '0 auto 16px' }}>{emoji}</div>
                <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '4px', fontSize: '17px' }}>{name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '100px 24px', background: 'var(--bg-glass-light)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span className="badge badge-amber" style={{ marginBottom: '16px', display: 'inline-block' }}>JOURNEY</span>
            <h2 className="section-title">Our Milestones</h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '28px', top: '12px', bottom: '12px', width: '2px', background: 'linear-gradient(to bottom, var(--accent-blue), var(--accent-violet))', opacity: 0.3 }} />
            {milestones.map(({ year, event }, i) => (
              <div key={year} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: i < milestones.length - 1 ? '32px' : 0 }}>
                <div style={{ width: 56, height: 56, flexShrink: 0, borderRadius: '50%', background: 'var(--bg-card)', border: '2px solid rgba(59,130,246,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, color: 'var(--accent-blue)', zIndex: 1 }}>{year}</div>
                <div style={{ paddingTop: '14px' }}>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '16px', margin: 0 }}>{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 800, fontSize: '28px', marginBottom: '16px', color: 'var(--text-primary)' }}>Ready to Customize in 3D?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '28px' }}>Load your chosen car blueprint and start designing your build today.</p>
          <Link href="/models" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '16px', padding: '14px 32px', position: 'relative', zIndex: 1 }}>
            Browse Models <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}
