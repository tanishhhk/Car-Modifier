'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: '#0d0d14',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '60px 24px 28px',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '4px', background: 'var(--accent-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
                AZ
              </div>
              <span style={{ fontWeight: 800, fontSize: '18px', color: 'white' }}>
                GarageAZ
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: '1.7', maxWidth: '240px' }}>
              Explore, customize in 3D CAD, and schedule garage appointments, all in one place.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['/', 'Home'],['brands','Brands'],['models','Models'],['test-drive','Garage Appointment'],['about','About'],['faq','FAQ']].map(([href, label]) => (
                <li key={href}>
                  <Link href={`/${href === '/' ? '' : href}`} style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='#3b82f6'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.45)'}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Categories</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Sedans','SUVs','Luxury Cars','Sports Cars','Electric Vehicles','Hybrid Cars'].map(cat => (
                <li key={cat}>
                  <Link href="/models" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='#3b82f6'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.45)'}>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Email', text: 'hello@garageaz.in' },
                { label: 'Phone', text: '+91 98765 43210' },
                { label: 'Location', text: 'New Delhi, India' },
              ].map(({ label, text }) => (
                <div key={text} style={{ display: 'flex', gap: '8px', color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>
                  <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{label}:</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', margin: 0 }}>
            © 2025 GarageAZ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
