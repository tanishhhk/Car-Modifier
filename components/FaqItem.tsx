'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export default function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${isOpen ? 'rgba(59,130,246,0.3)' : 'var(--border)'}`,
        borderRadius: '14px',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '16px', lineHeight: '1.4' }}>{question}</span>
        <div style={{
          width: 30, height: 30, flexShrink: 0, borderRadius: '8px',
          background: isOpen ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease',
          color: isOpen ? 'var(--accent-blue)' : 'var(--text-muted)',
        }}>
          <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
        </div>
      </button>

      <div style={{
        maxHeight: isOpen ? '300px' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ padding: '0 24px 20px', borderTop: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7', margin: '16px 0 0' }}>{answer}</p>
        </div>
      </div>
    </div>
  );
}
