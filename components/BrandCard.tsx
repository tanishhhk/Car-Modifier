'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import type { Brand } from '@/lib/brands';

interface BrandCardProps {
  brand: Brand;
}

const brandInitials: Record<string, string> = {
  Honda: 'H', Mahindra: 'M', Toyota: 'T', Maruti: 'M',
  Hyundai: 'H', Tata: 'T', Mercedes: 'MB', Audi: 'A',
  'Rolls-Royce': 'RR', Ferrari: 'F', 'Toyota GR': 'GR', Volkswagen: 'VW', Skoda: 'Š',
};

export default function BrandCard({ brand }: BrandCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/models?brand=${encodeURIComponent(brand.name)}`)}
      className="card-hover"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        padding: '20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {/* Logo area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)',
          flexShrink: 0,
        }}>
          {brandInitials[brand.name] || brand.name.charAt(0)}
        </div>
        <div>
          <h3 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '17px', margin: '0 0 2px' }}>{brand.name}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: 0 }}>{brand.country} · Est. {brand.founded}</p>
        </div>
      </div>

      {/* Tagline */}
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>{brand.tagline}</p>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="badge" style={{ textTransform: 'capitalize' }}>{brand.segment}</span>
        <span style={{ color: 'var(--accent-blue)', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          {brand.modelCount} {brand.modelCount === 1 ? 'Model' : 'Models'} <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
}
