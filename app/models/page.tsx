'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, LayoutGrid, LayoutList, GitCompare, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cars } from '@/lib/cars';
import type { CarModel } from '@/lib/cars';
import CarCard from '@/components/CarCard';
import CarModal from '@/components/CarModal';

type Category = 'all' | 'sedan' | 'suv' | 'luxury' | 'sports';

const CATEGORIES: Category[] = ['all', 'sedan', 'suv', 'luxury', 'sports'];

function ModelsContent() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get('brand');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);
  const [isGrid, setIsGrid] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const filtered = useMemo(() => {
    let list = cars;
    if (brandParam) list = list.filter(c => c.brand.toLowerCase() === brandParam.toLowerCase());
    if (category !== 'all') list = list.filter(c => c.category === category);
    if (search.trim()) list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [search, category, brandParam]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(c => c !== id);
      if (prev.length >= 2) return prev; // max 2
      return [...prev, id];
    });
  };

  const compareCarObjs = compareList.map(id => cars.find(c => c.id === id)!).filter(Boolean);

  const categoryLabels: Record<Category, string> = {
    all: `All (${brandParam ? filtered.length : cars.length})`,
    sedan: 'Sedan', suv: 'SUV', luxury: 'Luxury', sports: 'Sports',
  };

  return (
    <div style={{ padding: '60px 24px 120px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '52px' }}>
        {brandParam && (
          <div style={{ marginBottom: '12px' }}>
            <span className="badge badge-blue">Showing: {brandParam}</span>
            <Link href="/models" style={{ color: 'var(--text-muted)', fontSize: '13px', marginLeft: '10px', textDecoration: 'none' }}>Clear filter ✕</Link>
          </div>
        )}
        <h1 className="section-title">Explore Car Models</h1>
        <p className="section-subtitle">Browse, compare, and customize — find your perfect match</p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '32px' }}>
        {/* Search */}
        <div style={{ flex: '1 1 260px', position: 'relative', minWidth: '200px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input type="text" placeholder="Search models..." value={search} onChange={e => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: '42px' }} />
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{
              padding: '8px 16px', borderRadius: '999px', border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: '13px', textTransform: 'capitalize',
              background: category === cat ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : 'rgba(255,255,255,0.06)',
              color: category === cat ? 'white' : 'var(--text-muted)',
              transition: 'all 0.2s ease',
            }}>
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
          {([true, false] as const).map(grid => (
            <button key={String(grid)} onClick={() => setIsGrid(grid)} style={{
              padding: '8px 12px', background: isGrid === grid ? 'rgba(59,130,246,0.2)' : 'transparent',
              border: 'none', cursor: 'pointer', color: isGrid === grid ? 'var(--accent-blue)' : 'var(--text-muted)',
              transition: 'all 0.2s',
            }}>
              {grid ? <LayoutGrid size={18} /> : <LayoutList size={18} />}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
        Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> results
        {compareList.length > 0 && <span style={{ color: 'var(--accent-blue)', marginLeft: '12px' }}>· {compareList.length} selected for compare</span>}
      </p>

      {/* Grid / List */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</p>
          <p>No models found. Try a different search or category.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isGrid ? 'repeat(auto-fill,minmax(280px,1fr))' : '1fr',
          gap: '20px',
        }}>
          {filtered.map(car => (
            <CarCard
              key={car.id}
              car={car}
              isFavorite={favorites.includes(car.id)}
              isCompared={compareList.includes(car.id)}
              onToggleFavorite={toggleFavorite}
              onToggleCompare={toggleCompare}
              onViewDetails={setSelectedCar}
            />
          ))}
        </div>
      )}

      {/* Compare bar */}
      {compareList.length === 2 && (
        <div className="compare-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <GitCompare size={20} style={{ color: 'var(--accent-blue)' }} />
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Comparing:</span>
            {compareCarObjs.map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-blue">{c.name}</span>
                <button onClick={() => toggleCompare(c.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setCompareList([])} className="btn-ghost" style={{ padding: '8px 16px', fontSize: '13px' }}>Clear</button>
            <button onClick={() => {
              const [a, b] = compareCarObjs;
              const specs = ['engine','mileage','price','seats','horsepower'];
              alert(
                `📊 COMPARISON\n\n` +
                specs.map(s => `${s.toUpperCase()}\n  ${a.name}: ${(a as unknown as Record<string, unknown>)[s] ?? 'N/A'}\n  ${b.name}: ${(b as unknown as Record<string, unknown>)[s] ?? 'N/A'}`).join('\n\n')
              );
            }} className="btn-primary" style={{ padding: '8px 20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 1 }}>
              <ArrowRight size={15} /> Compare Now
            </button>
          </div>
        </div>
      )}

      {/* Car Modal */}
      {selectedCar && (
        <CarModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          isFavorite={favorites.includes(selectedCar.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export default function ModelsPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Loading models...</div>}>
      <ModelsContent />
    </Suspense>
  );
}
