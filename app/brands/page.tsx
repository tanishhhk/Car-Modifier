'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { brands } from '@/lib/brands';
import BrandCard from '@/components/BrandCard';
import type { Metadata } from 'next';

const segments = ['all', 'budget', 'premium', 'luxury', 'sports'] as const;
type Segment = typeof segments[number];

export default function BrandsPage() {
  const [activeSegment, setActiveSegment] = useState<Segment>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() =>
    brands.filter(b =>
      (activeSegment === 'all' || b.segment === activeSegment) &&
      b.name.toLowerCase().includes(search.toLowerCase())
    ), [activeSegment, search]);

  const segmentLabels: Record<Segment, string> = {
    all: `All (${brands.length})`,
    budget: 'Budget',
    premium: 'Premium',
    luxury: 'Luxury',
    sports: 'Sports',
  };

  return (
    <div style={{ padding: '60px 24px 100px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-block' }}>OUR PARTNERS</span>
        <h1 className="section-title">Explore Car Brands</h1>
        <p className="section-subtitle">From budget friendly favourites to legendary supercars</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}>
        {segments.map(seg => (
          <button key={seg} onClick={() => setActiveSegment(seg)} style={{
            padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer',
            fontWeight: 600, fontSize: '13px', textTransform: 'capitalize',
            background: activeSegment === seg ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : 'rgba(255,255,255,0.06)',
            color: activeSegment === seg ? 'white' : 'var(--text-muted)',
            transition: 'all 0.2s ease',
            boxShadow: activeSegment === seg ? '0 4px 15px rgba(59,130,246,0.3)' : 'none',
          }}>
            {segmentLabels[seg]}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ maxWidth: '400px', margin: '0 auto 48px', position: 'relative' }}>
        <Search size={17} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search brands..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '44px' }}
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</p>
          <p>No brands found for "{search}"</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '20px' }}
             className="stagger-children">
          {filtered.map(brand => (
            <div key={brand.id} className="fade-in-up" style={{ opacity: 0 }}>
              <BrandCard brand={brand} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
