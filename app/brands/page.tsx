'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { brands } from '@/lib/brands';
import BrandCard from '@/components/BrandCard';

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
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="badge" style={{ marginBottom: '16px', display: 'inline-block' }}>OUR PARTNERS</span>
        <h1 className="section-title">Explore Car Brands</h1>
        <p className="section-subtitle">From budget friendly favourites to legendary supercars</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '28px' }}>
        {segments.map(seg => (
          <button key={seg} onClick={() => setActiveSegment(seg)} style={{
            padding: '8px 16px', borderRadius: '4px', border: '1px solid var(--border)', cursor: 'pointer',
            fontWeight: 600, fontSize: '13px', textTransform: 'capitalize',
            background: activeSegment === seg ? 'var(--accent-blue)' : 'var(--bg-surface)',
            color: activeSegment === seg ? 'white' : 'var(--text-primary)',
            transition: 'all 0.2s ease',
          }}>
            {segmentLabels[seg]}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ maxWidth: '400px', margin: '0 auto 40px', position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search brands..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '40px', borderRadius: '4px' }}
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <p>No brands found for "{search}"</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '20px' }}>
          {filtered.map(brand => (
            <div key={brand.id} className="fade-in-up">
              <BrandCard brand={brand} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
