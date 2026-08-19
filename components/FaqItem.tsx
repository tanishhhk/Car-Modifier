'use client';

import { useState } from 'react';

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
        border: `1px solid ${isOpen ? 'var(--accent-blue)' : 'var(--border)'}`,
        borderRadius: '4px',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '15px', lineHeight: '1.4' }}>{question}</span>
        <span style={{
          fontSize: '16px',
          fontWeight: 700,
          color: isOpen ? 'var(--accent-blue)' : 'var(--text-muted)',
        }}>
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div style={{ padding: '0 20px 16px', borderTop: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: '12px 0 0' }}>{answer}</p>
        </div>
      )}
    </div>
  );
}
