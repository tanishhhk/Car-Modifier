'use client';

import Link from 'next/link';
import { Car, Code2, MessageCircle, Share2, Mail, Phone, MapPin } from 'lucide-react';

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
              <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Car size={20} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '18px', color: 'white' }}>
                Car<span style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Config</span>
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: '1.7', maxWidth: '240px' }}>
              Explore, customize in 3D CAD, and schedule garage appointments, all in one place.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {[Code2, MessageCircle, Share2].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: '8px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)', transition: 'all 0.2s',
                  textDecoration: 'none',
                }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='#3b82f6'; (e.currentTarget as HTMLElement).style.borderColor='rgba(59,130,246,0.4)'; }}
                   onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.5)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.08)'; }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
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
                { Icon: Mail, text: 'hello@carconfig.in' },
                { Icon: Phone, text: '+91 98765 43210' },
                { Icon: MapPin, text: 'New Delhi, India' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>
                  <Icon size={15} style={{ color: '#3b82f6', flexShrink: 0 }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', margin: 0 }}>
            © 2025 CarConfig 3D. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.6)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.3)'}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
