'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, GitCompare, Eye } from 'lucide-react';
import type { CarModel } from '@/lib/cars';

interface CarCardProps {
  car: CarModel;
  isFavorite: boolean;
  isCompared: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onViewDetails: (car: CarModel) => void;
}

const categoryColors: Record<string, string> = {
  sedan:  'badge-blue',
  suv:    'badge-green',
  luxury: 'badge-violet',
  sports: 'badge-rose',
};

export default function CarCard({ car, isFavorite, isCompared, onToggleFavorite, onToggleCompare, onViewDetails }: CarCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="card-hover"
      style={{
        background: 'var(--bg-card)',
        border: isCompared ? '1px solid var(--accent-blue)' : '1px solid var(--border)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isCompared ? '0 0 20px var(--glow-blue)' : 'none',
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
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a2e', color: 'var(--text-muted)', fontSize: '40px' }}>🚗</div>
        )}

        {/* Overlay buttons */}
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
          <button
            onClick={() => onToggleCompare(car.id)}
            title={isCompared ? 'Remove from compare' : 'Add to compare'}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: isCompared ? 'rgba(59,130,246,0.9)' : 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s', backdropFilter: 'blur(8px)',
              color: 'white',
            }}
          >
            <GitCompare size={16} />
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
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '8px 10px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600, margin: '0 0 2px', textTransform: 'uppercase' }}>Mileage</p>
            <p style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600, margin: 0 }}>{car.mileage}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '8px 10px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600, margin: '0 0 2px', textTransform: 'uppercase' }}>Seats</p>
            <p style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600, margin: 0 }}>{car.seats} Seater</p>
          </div>
        </div>

        <p style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: '16px', margin: 0 }}>{car.price}</p>

        <button
          onClick={() => onViewDetails(car)}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: 'auto', width: '100%' }}
        >
          <Eye size={15} />
          View Details
        </button>
      </div>
    </div>
  );
}
