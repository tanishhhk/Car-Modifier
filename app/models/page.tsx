'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, LayoutGrid, LayoutList, X, ArrowLeft, ArrowRight, Compass, Hammer, Disc, Music, Layers } from 'lucide-react';
import Link from 'next/link';
import { cars } from '@/lib/cars';
import type { CarModel } from '@/lib/cars';
import CarCard from '@/components/CarCard';
import Car3DViewer from '@/components/Car3DViewer';

type Category = 'all' | 'sedan' | 'suv' | 'luxury' | 'sports';
const CATEGORIES: Category[] = ['all', 'sedan', 'suv', 'luxury', 'sports'];

function ModelsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const brandParam = searchParams.get('brand');

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isGrid, setIsGrid] = useState(true);

  // Customizer selection state
  const [variantSelectionCar, setVariantSelectionCar] = useState<CarModel | null>(null);
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('');

  // 3D customization parameters
  const [paintColor, setPaintColor] = useState<string>('#FFFFFF');
  const [alloyStyle, setAlloyStyle] = useState<'spoke' | 'star' | 'mesh' | 'redline'>('spoke');
  const [wooferStyle, setWooferStyle] = useState<'none' | 'bassking' | 'jbl' | 'sony'>('none');
  const [interiorColor, setInteriorColor] = useState<string>('#d97706');
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [cadMode, setCadMode] = useState<boolean>(false);
  const [trunkOpen, setTrunkOpen] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Set default customization states when a car is loaded
  useEffect(() => {
    if (selectedCar) {
      setPaintColor(selectedCar.colors[0]);
      setAlloyStyle('spoke');
      setWooferStyle('none');
      setInteriorColor('#d97706'); // Premium Tan default
      setViewMode('exterior');
      setCadMode(false);
      setTrunkOpen(false);
    }
  }, [selectedCar]);

  const filtered = useMemo(() => {
    let list = cars;
    if (brandParam) list = list.filter(c => c.brand.toLowerCase() === brandParam.toLowerCase());
    if (category !== 'all') list = list.filter(c => c.category === category);
    if (search.trim()) {
      list = list.filter(
        c =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.brand.toLowerCase().includes(search.toLowerCase())
      );
    }
    return list;
  }, [search, category, brandParam]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  const handleStartCustomizer = (car: CarModel) => {
    setVariantSelectionCar(car);
  };

  const handleSelectVariant = (variantName: string) => {
    if (!variantSelectionCar) return;
    setSelectedCar(variantSelectionCar);
    setSelectedVariant(variantName);
    setVariantSelectionCar(null);
  };

  const handleBackToCatalog = () => {
    setSelectedCar(null);
    setSelectedVariant('');
  };

  const handleBookAppointment = () => {
    if (!selectedCar) return;
    const params = new URLSearchParams({
      car: selectedCar.id,
      variant: selectedVariant,
      paint: paintColor,
      alloy: alloyStyle,
      woofer: wooferStyle,
      interior: interiorColor === '#d97706' ? 'tan' : interiorColor === '#ef4444' ? 'carbon' : interiorColor === '#fef08a' ? 'cream' : 'obsidian',
    });
    router.push(`/test-drive?${params.toString()}`);
  };

  const alloyLabels = {
    spoke: 'Chrome Spoke',
    star: 'Matte Black Star',
    mesh: 'Golden Mesh',
    redline: 'Sport Red Line',
  };

  const wooferLabels = {
    none: 'Factory Audio (None)',
    bassking: 'Bass King 12"',
    jbl: 'JBL Club 1000W',
    sony: 'Sony Xplod Duo',
  };

  const interiorLabels = {
    '#d97706': 'Premium Tan Leather',
    '#ef4444': 'Carbon Sport Red',
    '#fef08a': 'Royal Cream Alcantara',
    '#09090b': 'Midnight Obsidian',
  };

  // IF CAR IS SELECTED, RENDER 3D CUSTOMIZER VIEW
  if (selectedCar) {
    return (
      <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto', minHeight: 'calc(100vh - 68px)' }}>
        {/* Customizer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <button
              onClick={handleBackToCatalog}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '8px',
                padding: 0,
              }}
            >
              <ArrowLeft size={16} /> Back to Catalog
            </button>
            <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Configure {selectedCar.brand} {selectedCar.name}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '4px 0 0' }}>
              Active Variant: <strong style={{ color: 'var(--accent-blue)' }}>{selectedVariant}</strong>
            </p>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px', padding: '12px 18px', textAlign: 'right' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 2px' }}>Total Est. Price</p>
            <p style={{ color: 'var(--accent-blue)', fontWeight: 800, fontSize: '20px', margin: 0 }}>{selectedCar.price}</p>
          </div>
        </div>

        {/* Customizer Split Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '24px', minHeight: '600px' }} className="customizer-grid">
          {/* LEFT COLUMN: 3D Visualizer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ flex: 1, minHeight: '480px', position: 'relative' }}>
              <Car3DViewer
                carId={selectedCar.id}
                carCategory={selectedCar.category}
                carName={selectedCar.name}
                variantName={selectedVariant}
                paintColor={paintColor}
                alloyStyle={alloyStyle}
                wooferStyle={wooferStyle}
                interiorColor={interiorColor}
                viewMode={viewMode}
                cadMode={cadMode}
                trunkOpen={trunkOpen}
              />
            </div>

            {/* Visualizer Toolbar */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px', padding: '12px' }}>
              {/* Perspective Mode */}
              <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-surface)', padding: '4px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <button
                  onClick={() => setViewMode('exterior')}
                  style={{
                    padding: '8px 14px', borderRadius: '4px', border: 'none', cursor: 'pointer',
                    fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px',
                    background: viewMode === 'exterior' ? 'var(--accent-blue)' : 'transparent',
                    color: viewMode === 'exterior' ? 'white' : 'var(--text-muted)',
                    transition: 'all 0.2s',
                  }}
                >
                  <Compass size={15} /> Exterior
                </button>
                <button
                  onClick={() => setViewMode('interior')}
                  style={{
                    padding: '8px 14px', borderRadius: '4px', border: 'none', cursor: 'pointer',
                    fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px',
                    background: viewMode === 'interior' ? 'var(--accent-blue)' : 'transparent',
                    color: viewMode === 'interior' ? 'white' : 'var(--text-muted)',
                    transition: 'all 0.2s',
                  }}
                >
                  <Compass size={15} /> Interior (360°)
                </button>
              </div>

              <div style={{ flex: 1 }} />

              {/* Trunk toggle (Exterior only) */}
              {viewMode === 'exterior' && wooferStyle !== 'none' && (
                <button
                  onClick={() => setTrunkOpen(!trunkOpen)}
                  style={{
                    padding: '8px 16px', borderRadius: '4px', cursor: 'pointer',
                    fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px',
                    background: trunkOpen ? 'var(--bg-surface)' : 'var(--bg-card)',
                    color: trunkOpen ? 'var(--accent-blue)' : 'var(--text-muted)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <Layers size={15} /> {trunkOpen ? 'Close Trunk' : 'Open Trunk'}
                </button>
              )}

              {/* CAD Mode */}
              <button
                onClick={() => setCadMode(!cadMode)}
                style={{
                  padding: '8px 16px', borderRadius: '4px', cursor: 'pointer',
                  fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px',
                  background: cadMode ? 'var(--bg-surface)' : 'var(--bg-card)',
                  color: cadMode ? '#16a34a' : 'var(--text-muted)',
                  border: '1px solid var(--border)',
                }}
              >
                <Layers size={15} /> {cadMode ? 'CAD Wireframe ON' : 'Show CAD Model'}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Customization Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Control Panel Card */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Paint Selection */}
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', margin: '0 0 12px' }}>
                  <Hammer size={15} style={{ color: 'var(--accent-blue)' }} /> Paint Finish
                </h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {selectedCar.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setPaintColor(color)}
                      title={color}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '4px',
                        background: color,
                        border: paintColor === color ? '2px solid var(--accent-blue)' : '1px solid var(--border)',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                  <div style={{ width: '1px', height: '24px', background: 'var(--border)' }} />
                  {/* Custom color picker */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="color"
                      value={paintColor}
                      onChange={e => setPaintColor(e.target.value)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        padding: 0,
                        background: 'transparent',
                      }}
                    />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>CUSTOM</span>
                  </div>
                </div>
              </div>

              {/* Alloys Selection */}
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', margin: '0 0 12px' }}>
                  <Disc size={15} style={{ color: 'var(--accent-blue)' }} /> Alloy Wheels
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(['spoke', 'star', 'mesh', 'redline'] as const).map(style => (
                    <button
                      key={style}
                      onClick={() => setAlloyStyle(style)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '4px',
                        border: alloyStyle === style ? '1px solid var(--accent-blue)' : '1px solid var(--border)',
                        background: alloyStyle === style ? 'var(--bg-surface)' : 'var(--bg-primary)',
                        color: alloyStyle === style ? 'var(--accent-blue)' : 'var(--text-primary)',
                        textAlign: 'left',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      {alloyLabels[style]}
                      {alloyStyle === style && <span style={{ fontSize: '11px', background: 'var(--bg-card)', padding: '2px 8px', borderRadius: '2px', border: '1px solid var(--border)' }}>Selected</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Woofers Selection */}
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', margin: '0 0 12px' }}>
                  <Music size={15} style={{ color: 'var(--accent-blue)' }} /> Subwoofer Sound System
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(['none', 'bassking', 'jbl', 'sony'] as const).map(style => (
                    <button
                      key={style}
                      onClick={() => {
                        setWooferStyle(style);
                        if (style !== 'none') {
                          setTrunkOpen(true);
                        } else {
                          setTrunkOpen(false);
                        }
                      }}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '4px',
                        border: wooferStyle === style ? '1px solid var(--accent-blue)' : '1px solid var(--border)',
                        background: wooferStyle === style ? 'var(--bg-surface)' : 'var(--bg-primary)',
                        color: wooferStyle === style ? 'var(--accent-blue)' : 'var(--text-primary)',
                        textAlign: 'left',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      {wooferLabels[style]}
                      {wooferStyle === style && <span style={{ fontSize: '11px', background: 'var(--bg-card)', padding: '2px 8px', borderRadius: '2px', border: '1px solid var(--border)' }}>Selected</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interiors Selection */}
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', margin: '0 0 12px' }}>
                  <Layers size={15} style={{ color: 'var(--accent-blue)' }} /> Cabin Seats & Trim
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(['#d97706', '#ef4444', '#fef08a', '#09090b'] as const).map(style => (
                    <button
                      key={style}
                      onClick={() => setInteriorColor(style)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '4px',
                        border: interiorColor === style ? '1px solid var(--accent-blue)' : '1px solid var(--border)',
                        background: interiorColor === style ? 'var(--bg-surface)' : 'var(--bg-primary)',
                        color: interiorColor === style ? 'var(--accent-blue)' : 'var(--text-primary)',
                        textAlign: 'left',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: style, border: '1px solid var(--border)' }} />
                        {interiorLabels[style]}
                      </div>
                      {interiorColor === style && <span style={{ fontSize: '11px', background: 'var(--bg-card)', padding: '2px 8px', borderRadius: '2px', border: '1px solid var(--border)' }}>Selected</span>}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div
          style={{
            position: 'sticky',
            bottom: '20px',
            left: 0,
            right: 0,
            zIndex: 100,
            marginTop: '32px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Customized Spec Summary</span>
            <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500, margin: '2px 0 0' }}>
              {selectedCar.name} {selectedVariant} · Paint ({paintColor}) · Alloys ({alloyLabels[alloyStyle]}) · Woofer ({wooferLabels[wooferStyle].split('(')[0].trim()}) · Seats ({interiorLabels[interiorColor as keyof typeof interiorLabels]})
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleBackToCatalog} className="btn-ghost" style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '4px' }}>
              Back to Catalog
            </button>
            <button
              onClick={handleBookAppointment}
              className="btn-primary"
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '4px',
              }}
            >
              Schedule Garage Appointment <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 992px) {
            .customizer-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    );
  }

  // IF NO CAR IS SELECTED, RENDER NORMAL CAR CATALOG GRID
  return (
    <div style={{ padding: '60px 24px 120px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        {brandParam && (
          <div style={{ marginBottom: '12px' }}>
            <span className="badge">Showing: {brandParam}</span>
            <Link href="/models" style={{ color: 'var(--text-muted)', fontSize: '13px', marginLeft: '10px', textDecoration: 'none' }}>Clear filter ✕</Link>
          </div>
        )}
        <h1 className="section-title">Explore Car Models</h1>
        <p className="section-subtitle">Choose a model and configure it in high fidelity 3D CAD mode</p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '32px' }}>
        {/* Search */}
        <div style={{ flex: '1 1 260px', position: 'relative', minWidth: '200px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input type="text" placeholder="Search models..." value={search} onChange={e => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: '40px', borderRadius: '4px' }} />
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{
              padding: '8px 16px', borderRadius: '4px', border: '1px solid var(--border)', cursor: 'pointer',
              fontWeight: 600, fontSize: '13px', textTransform: 'capitalize',
              background: category === cat ? 'var(--accent-blue)' : 'var(--bg-surface)',
              color: category === cat ? 'white' : 'var(--text-primary)',
              transition: 'all 0.2s ease',
            }}>
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
          <button onClick={() => setIsGrid(true)} style={{
            padding: '8px 12px', background: isGrid ? 'var(--accent-blue)' : 'var(--bg-surface)',
            border: 'none', cursor: 'pointer', color: isGrid ? 'white' : 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <LayoutGrid size={16} />
          </button>
          <button onClick={() => setIsGrid(false)} style={{
            padding: '8px 12px', background: !isGrid ? 'var(--accent-blue)' : 'var(--bg-surface)',
            border: 'none', cursor: 'pointer', color: !isGrid ? 'white' : 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <LayoutList size={16} />
          </button>
        </div>
      </div>

      {/* Count */}
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
        Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> results
      </p>

      {/* Grid / List */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
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
              onToggleFavorite={toggleFavorite}
              onConfigure3D={handleStartCustomizer}
            />
          ))}
        </div>
      )}

      {/* VARIANT SELECTION POPUP */}
      {variantSelectionCar && (
        <div className="modal-overlay" onClick={() => setVariantSelectionCar(null)}>
          <div className="modal-panel" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Select CAD Model</h3>
              <button
                onClick={() => setVariantSelectionCar(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <X size={18} />
              </button>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '0 0 20px', lineHeight: '1.5' }}>
              Choose a specific model variant of the <strong>{variantSelectionCar.brand} {variantSelectionCar.name}</strong> to load its corresponding 3D CAD schematic from inside and outside.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {variantSelectionCar.variants.map(variant => (
                <button
                  key={variant}
                  onClick={() => handleSelectVariant(variant)}
                  className="btn-ghost"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {variant}
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const categoryLabels: Record<Category, string> = {
  all: 'All',
  sedan: 'Sedan',
  suv: 'SUV',
  luxury: 'Luxury',
  sports: 'Sports',
};

export default function ModelsPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Loading models...</div>}>
      <ModelsContent />
    </Suspense>
  );
}
