'use client';

import Link from 'next/link';

const team = [
  { name: 'Riya Sharma', role: 'Lead 3D Designer', initials: 'RS' },
  { name: 'Arjun Mehta', role: '3D WebGL Developer', initials: 'AM' },
  { name: 'Priya Nair', role: 'Product Manager', initials: 'PN' },
  { name: 'Karan Patel', role: 'Automotive Engineer', initials: 'KP' },
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
      <section className="hero-gradient" style={{ padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span className="badge" style={{ marginBottom: '16px', display: 'inline-block' }}>OUR STORY</span>
          <h1 className="section-title" style={{ marginBottom: '16px' }}>
            We Believe Customizing a Car Should Be an Intuitive Experience
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
            GarageAZ was built to give every car owner the power to visualize real world upgrades, load detailed 3D CAD schematics, and consult local garages to bring their vision to life.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '24px' }}>
          {[
            { title: 'Our Mission', desc: 'Democratize the car customization experience. Every enthusiast deserves to preview paint finishes, alloy wheels, and subwoofers in high fidelity 3D before committing to a build.' },
            { title: 'Our Technology', desc: 'Built with Next.js 16, React 19, TypeScript, and Three.js WebGL. Our procedural rendering pipeline runs smooth on mobile devices and 4K displays alike.' },
            { title: 'Our Values', desc: 'Transparency in design, collaboration with certified local tuning shops. We connect you directly with experts, no middleman markup, no high pressure sales.' },
          ].map(({ title, desc }) => (
            <div key={title} className="card-hover" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px', padding: '24px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>{title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge" style={{ marginBottom: '16px', display: 'inline-block' }}>HOW IT WORKS</span>
          <h2 className="section-title" style={{ marginBottom: '40px' }}>Customization Steps</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '24px' }}>
            {[
              { step: '01', title: 'Load CAD Model', desc: 'Select a car model and variant to generate its structural 3D CAD mesh.' },
              { step: '02', title: 'Customize in 3D', desc: 'Pick colors, swap out alloys, add subwoofers, and design the cabin interior.' },
              { step: '03', title: 'Consult Garage', desc: 'Schedule a home visit or shop consultation to discuss build execution details.' },
              { step: '04', title: 'Execution', desc: 'Work with verified garage partners to complete the custom vehicle build.' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', background: 'var(--bg-primary)', padding: '24px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <div style={{ width: 44, height: 44, borderRadius: '4px', background: 'var(--bg-surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: 'var(--accent-blue)' }}>{step}</div>
                <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '16px', margin: 0 }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge" style={{ marginBottom: '16px', display: 'inline-block' }}>THE TEAM</span>
          <h2 className="section-title" style={{ marginBottom: '40px' }}>People Behind GarageAZ</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '24px' }}>
            {team.map(({ name, role, initials }) => (
              <div key={name} className="card-hover" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px', padding: '24px', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '4px', background: 'var(--bg-surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 auto 16px' }}>{initials}</div>
                <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '4px', fontSize: '16px' }}>{name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge" style={{ marginBottom: '16px', display: 'inline-block' }}>JOURNEY</span>
            <h2 className="section-title">Our Milestones</h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '24px', top: '12px', bottom: '12px', width: '2px', background: 'var(--border)' }} />
            {milestones.map(({ year, event }, i) => (
              <div key={year} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: i < milestones.length - 1 ? '24px' : 0 }}>
                <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: '4px', background: 'var(--bg-primary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--accent-blue)', zIndex: 1 }}>{year}</div>
                <div style={{ paddingTop: '12px' }}>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '15px', margin: 0 }}>{event}</p>
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
          <Link href="/models" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', fontSize: '15px', padding: '12px 28px', borderRadius: '4px' }}>
            Browse Models
          </Link>
        </div>
      </section>
    </div>
  );
}
