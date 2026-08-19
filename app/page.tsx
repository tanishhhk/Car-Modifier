'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, ArrowRight, Calendar, Palette, Disc, Layers, Wrench, Sliders, CheckCircle2, Compass, Music, ShieldCheck, Cpu } from 'lucide-react';
import { cars } from '@/lib/cars';

const TYPING_TEXTS = ['3D CAD Blueprints.', 'Alloy Wheel Styles.', 'Trunk Audio Tuning.', 'Garage Appointments.'];

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
  const [activeTab, setActiveTab] = useState<'cad' | 'interior' | 'paint' | 'garage'>('cad');

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero-gradient" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '100px 24px 70px', position: 'relative' }}>
        
        {/* WebGL Badge */}
        <div className="fade-in-up">
          <span className="badge" style={{ padding: '6px 16px', marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <Cpu size={14} style={{ color: 'var(--accent-blue)' }} /> WEBGL 3D CAD CUSTOMIZATION SUITE
          </span>
        </div>

        <h1 className="fade-in-up" style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 20px', maxWidth: '960px', letterSpacing: '-1px' }}>
          Design, Modify & Build<br />
          Your Machine with <TypingHero />
        </h1>

        <p className="fade-in-up" style={{ color: 'var(--text-muted)', fontSize: 'clamp(16px,2vw,19px)', maxWidth: '760px', lineHeight: 1.7, margin: '0 auto 40px' }}>
          Explore luxury & sport models, load interactive 3D CAD blueprints, preview custom paint & alloy fitments live, and schedule an appointment with verified garages.
        </p>

        <div className="fade-in-up" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '60px' }}>
          <Link href="/models" className="btn-primary" style={{ textDecoration: 'none', fontSize: '15px', padding: '14px 32px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Box size={18} /> Start Customizing in 3D
          </Link>
          <Link href="/brands" className="btn-ghost" style={{ textDecoration: 'none', fontSize: '15px', padding: '14px 28px', borderRadius: '4px' }}>
            Explore Brands
          </Link>
          <Link href="/test-drive" className="btn-ghost" style={{ textDecoration: 'none', fontSize: '15px', padding: '14px 28px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} /> Garage Consult
          </Link>
        </div>

        {/* Hero Stats Bar */}
        <div className="fade-in-up" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '24px',
          }}>
            {[
              { stat: '16+', label: 'Car Models', sub: 'Sedans, SUVs & Supercars' },
              { stat: '360°', label: '3D CAD & Interior', sub: 'Real-time WebGL view' },
              { stat: '4+', label: 'Alloy & Paint Styles', sub: 'Custom hex finishes' },
              { stat: '50+', label: 'Verified Garages', sub: 'Home & shop visits' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'left', padding: '8px 12px', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <p style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-blue)', margin: '0 0 2px' }}>{item.stat}</p>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px' }}>{item.label}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW STEPS */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge" style={{ marginBottom: '12px', display: 'inline-block' }}>WORKFLOW</span>
            <h2 className="section-title">4 Steps to Your Custom Build</h2>
            <p className="section-subtitle">From interactive 3D CAD blueprints to professional garage installation</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { icon: Box, step: '01', title: 'Load CAD Model', desc: 'Choose a car, select its model variant, and load its detailed 3D CAD schematic.' },
              { icon: Sliders, step: '02', title: 'Apply Customizations', desc: 'Modify body paint, alloy wheels, boot subwoofers, and seat trims live in 3D.' },
              { icon: Wrench, step: '03', title: 'Garage Consult', desc: 'Schedule a session with experts. They can visit your home, or you can visit their shop.' },
              { icon: CheckCircle2, step: '04', title: 'Save & Drive', desc: 'Export your configuration and bring your dream build to life.' }
            ].map(({ icon: Icon, step, title, desc }) => (
              <div
                key={step}
                className="card-hover"
                style={{
                  background: 'var(--bg-surface)',
                  padding: '28px 24px',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon size={22} style={{ color: 'var(--accent-blue)' }} />
                  </div>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: 'var(--accent-blue)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {step}
                  </span>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 8px', fontWeight: 700, fontSize: '17px', color: 'var(--text-primary)' }}>{title}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CARS */}
      <section style={{ padding: '90px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span className="badge" style={{ marginBottom: '12px', display: 'inline-block' }}>FEATURED MODELS</span>
            <h2 className="section-title">Select Model to Customize</h2>
            <p className="section-subtitle">Click any model below to open its dedicated 3D CAD customizer panel</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: '24px' }}>
            {featured.map((car) => (
              <Link key={car.id} href="/models" style={{ textDecoration: 'none' }}>
                <div className="card-hover" style={{ background: 'var(--bg-card)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ position: 'relative', paddingTop: '60%', background: '#0f172a', overflow: 'hidden' }}>
                    <Image src={car.img} alt={car.name} fill style={{ objectFit: 'cover' }} sizes="350px" />
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      <span className="badge">{car.category}</span>
                    </div>
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '11px', margin: 0, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>{car.brand}</p>
                    <h3 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '19px', margin: 0 }}>{car.name}</h3>
                    <p style={{ color: 'var(--accent-blue)', fontWeight: 800, fontSize: '17px', margin: 0 }}>{car.price}</p>
                    <div className="btn-primary" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', fontSize: '13px', borderRadius: '4px' }}>
                      <Box size={16} /> Open 3D CAD
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '44px' }}>
            <Link href="/models" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px', padding: '12px 28px' }}>
              View All 16+ Models <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CAPABILITIES / SUITE */}
      <section style={{ padding: '90px 24px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span className="badge" style={{ marginBottom: '12px', display: 'inline-block' }}>CAPABILITIES</span>
            <h2 className="section-title">Built for Car Enthusiasts</h2>
            <p className="section-subtitle">An interactive WebGL 3D customization suite designed for precision</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '24px' }}>
            {[
              { icon: Cpu, title: '3D CAD Blueprints', desc: 'Switch between shaded rendering and CAD structural schematics in real-time WebGL.' },
              { icon: Palette, title: 'Paint & Finishes', desc: 'Modify body paint with gloss, matte, or metallic swatches, or input a custom hex value.' },
              { icon: Disc, title: 'Alloy Spokes', desc: 'Select and preview custom alloys like Chrome Spoke, Matte Black Star, Gold Mesh, or Sport Red Line.' },
              { icon: Music, title: 'Subwoofer Sound', desc: 'Fit JBL, Sony, or Bass King trunk woofers with live open-trunk visualizer preview.' },
              { icon: Compass, title: '360° Interior Cabin', desc: 'Switch to interior lookaround view to inspect steering wheel, dashboard, and seat trims.' },
              { icon: Wrench, title: 'Garage Consultations', desc: 'Schedule verified partner shops to inspect your CAD spec and install custom parts.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-hover" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '28px' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon size={22} style={{ color: 'var(--accent-blue)' }} />
                </div>
                <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / GUARANTEE BAR */}
      <section style={{ padding: '60px 24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {[
            { icon: ShieldCheck, title: '100% Fitment Accuracy', desc: 'Verified 3D CAD schematic dimensions' },
            { icon: Wrench, title: 'Partner Garages', desc: 'Verified technicians for home & shop visits' },
            { icon: Cpu, title: 'Free 3D Configurator', desc: 'Zero cost WebGL customizer suite' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-card)', padding: '20px', borderRadius: '4px', border: '1px solid var(--border)' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--bg-surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} style={{ color: 'var(--accent-blue)' }} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 2px', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>{title}</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '12px' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '90px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ borderRadius: '4px', padding: '56px 36px', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <span className="badge" style={{ marginBottom: '16px', display: 'inline-block' }}>GET STARTED</span>
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, margin: '0 0 16px', color: 'var(--text-primary)' }}>
              Ready to Customize Your Build in 3D?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.7', marginBottom: '36px', maxWidth: '640px', margin: '0 auto 36px' }}>
              Select a model from our catalog, load its 3D CAD blueprint, configure paint & alloy fitments, and schedule your garage consultation today.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/models" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '15px', padding: '14px 32px', borderRadius: '4px' }}>
                Browse Models <ArrowRight size={16} />
              </Link>
              <Link href="/test-drive" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '15px', padding: '14px 32px', borderRadius: '4px' }}>
                <Calendar size={16} /> Schedule Garage Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
