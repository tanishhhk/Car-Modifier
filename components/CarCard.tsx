'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Box } from 'lucide-react';
import type { CarModel } from '@/lib/cars';

interface CarCardProps {
  car: CarModel;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onConfigure3D: (car: CarModel) => void;
}

const categoryColors: Record<string, string> = {
  sedan:  'badge-blue',
  suv:    'badge-green',
  luxury: 'badge-violet',
  sports: 'badge-rose',
};

export default function CarCard({ car, isFavorite, onToggleFavorite, onConfigure3D }: CarCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="card-hover"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#0d0d18', overflow: 'hidden' }}>
        {!imgError ? (
          <Image
            src={car.img}
            alt={car.name}
            fill
            style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface)', color: 'var(--text-muted)', fontSize: '40px' }}>🚗</div>
        )}

        {/* Favorite overlay button */}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <button
            onClick={() => onToggleFavorite(car.id)}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: isFavorite ? 'rgba(244,63,94,0.9)' : 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s', backdropFilter: 'blur(8px)',
              color: isFavorite ? 'white' : 'rgba(255,255,255,0.7)',
            }}
          >
            <Heart size={16} fill={isFavorite ? 'white' : 'none'} />
          </button>
        </div>

        {/* Category badge */}
        <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
          <span className={`badge ${categoryColors[car.category]}`}>{car.category}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{car.brand}</p>
          <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '18px', margin: 0 }}>{car.name}</h3>
        </div>

        {/* Quick specs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ background: 'var(--bg-glass-light)', borderRadius: '8px', padding: '8px 10px', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600, margin: '0 0 2px', textTransform: 'uppercase' }}>Mileage</p>
            <p style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600, margin: 0 }}>{car.mileage}</p>
          </div>
          <div style={{ background: 'var(--bg-glass-light)', borderRadius: '8px', padding: '8px 10px', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600, margin: '0 0 2px', textTransform: 'uppercase' }}>Seats</p>
            <p style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600, margin: 0 }}>{car.seats} Seats</p>
          </div>
        </div>

        <p style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: '16px', margin: 0 }}>{car.price}</p>

        <button
          onClick={() => onConfigure3D(car)}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: 'auto', width: '100%', position: 'relative', zIndex: 1 }}
        >
          <Box size={15} />
          Open 3D CAD
        </button>
      </div>
    </div>
  );
}
