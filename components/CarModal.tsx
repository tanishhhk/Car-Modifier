'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Gauge, Fuel, Users, Zap, ArrowRight, Heart } from 'lucide-react';
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
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>{car.brand}</p>
            <h2 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '26px', margin: 0 }}>{car.name}</h2>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => onToggleFavorite(car.id)}
              style={{
                width: 40, height: 40, borderRadius: '10px',
                background: isFavorite ? 'rgba(244,63,94,0.2)' : 'rgba(255,255,255,0.06)',
                border: isFavorite ? '1px solid rgba(244,63,94,0.5)' : '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: isFavorite ? '#f43f5e' : 'var(--text-muted)',
              }}
            >
              <Heart size={18} fill={isFavorite ? '#f43f5e' : 'none'} />
            </button>
            <button onClick={onClose} style={{
              width: 40, height: 40, borderRadius: '10px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-muted)',
            }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image */}
        <div style={{ position: 'relative', width: '100%', paddingTop: '52%', borderRadius: '14px', overflow: 'hidden', background: '#0d0d18', marginBottom: '24px' }}>
          {!imgError ? (
            <Image src={car.img} alt={car.name} fill style={{ objectFit: 'cover' }} onError={() => setImgError(true)} sizes="680px" />
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px' }}>🚗</div>
          )}
          {/* Color tint overlay */}
          <div style={{ position: 'absolute', inset: 0, background: selectedColor, opacity: 0.08, transition: 'background 0.4s ease', pointerEvents: 'none' }} />
        </div>

        {/* Color picker */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Choose Color</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {car.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                title={color}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: color,
                  border: selectedColor === color ? '3px solid var(--accent-blue)' : '3px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedColor === color ? '0 0 12px rgba(59,130,246,0.5)' : 'none',
                  transform: selectedColor === color ? 'scale(1.2)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Specs grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {[
            { icon: Gauge, label: 'Engine', value: car.engine },
            { icon: Fuel, label: 'Mileage', value: car.mileage },
            { icon: Users, label: 'Seating', value: `${car.seats} Seats` },
            ...(car.horsepower ? [{ icon: Zap, label: 'Power', value: car.horsepower }] : []),
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '14px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Icon size={14} style={{ color: 'var(--accent-blue)' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>{label}</p>
              </div>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '13px', margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>{car.description}</p>

        {/* Price + CTA */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '11px', margin: '0 0 4px' }}>STARTING FROM</p>
            <p style={{ color: 'var(--accent-blue)', fontWeight: 800, fontSize: '22px', margin: 0 }}>{car.price}</p>
          </div>
          <Link
            href={`/test-drive?model=${encodeURIComponent(car.name)}`}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', position: 'relative', zIndex: 1 }}
          >
            Book Test Drive <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
