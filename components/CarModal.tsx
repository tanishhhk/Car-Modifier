'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Gauge, Fuel, Users, Zap, Heart, ArrowRight } from 'lucide-react';
import type { CarModel } from '@/lib/cars';

interface CarModalProps {
  car: CarModel;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function CarModal({ car, onClose, isFavorite, onToggleFavorite }: CarModalProps) {
  const [selectedColor, setSelectedColor] = useState(car.colors[0]);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()} style={{ borderRadius: '4px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>{car.brand}</p>
            <h2 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '26px', margin: 0 }}>{car.name}</h2>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => onToggleFavorite(car.id)}
              style={{
                padding: '8px', borderRadius: '4px',
                background: isFavorite ? '#ef4444' : 'var(--bg-surface)',
                border: '1px solid var(--border)',
                cursor: 'pointer', color: isFavorite ? 'white' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Heart size={16} fill={isFavorite ? 'white' : 'none'} />
            </button>
            <button onClick={onClose} style={{
              padding: '8px', borderRadius: '4px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              cursor: 'pointer', color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image */}
        <div style={{ position: 'relative', width: '100%', paddingTop: '52%', borderRadius: '4px', overflow: 'hidden', background: '#0d0d18', marginBottom: '20px' }}>
          {!imgError ? (
            <Image src={car.img} alt={car.name} fill style={{ objectFit: 'cover' }} onError={() => setImgError(true)} sizes="680px" />
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}>CAR MODEL</div>
          )}
          {/* Color tint overlay */}
          <div style={{ position: 'absolute', inset: 0, background: selectedColor, opacity: 0.08, transition: 'background 0.4s ease', pointerEvents: 'none' }} />
        </div>

        {/* Color picker */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Choose Color</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {car.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                title={color}
                style={{
                  width: 28, height: 28, borderRadius: '4px',
                  background: color,
                  border: selectedColor === color ? '2px solid var(--accent-blue)' : '1px solid var(--border)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>

        {/* Specs grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '20px' }}>
          {[
            { icon: Fuel, label: 'Engine', value: car.engine },
            { icon: Gauge, label: 'Mileage', value: car.mileage },
            { icon: Users, label: 'Seating', value: `${car.seats} Seats` },
            ...(car.horsepower ? [{ icon: Zap, label: 'Power', value: car.horsepower }] : []),
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <Icon size={16} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>{label}</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '12px', margin: 0 }}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>{car.description}</p>

        {/* Price + CTA */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '11px', margin: '0 0 4px' }}>STARTING FROM</p>
            <p style={{ color: 'var(--accent-blue)', fontWeight: 800, fontSize: '22px', margin: 0 }}>{car.price}</p>
          </div>
          <Link
            href={`/test-drive?model=${encodeURIComponent(car.name)}`}
            className="btn-primary"
            style={{ textDecoration: 'none', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Book Garage Consult <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
