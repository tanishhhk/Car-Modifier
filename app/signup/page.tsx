'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Car, User, Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';

function PasswordStrength({ password }: { password: string }) {
  const strength = !password ? 0 : password.length < 4 ? 1 : password.length < 6 ? 2 : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4 : 3;
  const labels = ['','Weak','Fair','Good','Strong'];
  const colors = ['','#ef4444','#f59e0b','#3b82f6','#22c55e'];
  if (!password) return null;
  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= strength ? colors[strength] : 'rgba(255,255,255,0.1)', transition: 'background 0.3s' }} />
        ))}
      </div>
      <p style={{ fontSize: '11px', color: colors[strength], margin: 0, fontWeight: 600 }}>{labels[strength]}</p>
    </div>
  );
}

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('Full name is required.'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');
    setSuccess(true);
    setTimeout(() => { window.location.href = '/'; }, 1500);
  };

  if (success) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Check size={28} style={{ color: '#22c55e' }} />
      </div>
      <h2 style={{ fontWeight: 800, fontSize: '24px', color: 'var(--text-primary)' }}>Account Created!</h2>
      <p style={{ color: 'var(--text-muted)' }}>Redirecting you to the home page...</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left panel */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', background: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '340px', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Car size={32} color="white" />
          </div>
          <h2 style={{ fontWeight: 800, fontSize: '28px', marginBottom: '12px' }}>Join GarageAZ</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>Create a free account to save your configurations and access features.</p>
          <div style={{ borderRadius: '4px', padding: '20px', textAlign: 'left', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>What you get</p>
            {['Save unlimited favorites','Persistent car configurations','Multi-device sync','Priority garage consultation'].map(feature => (
              <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Check size={16} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 48px', background: 'var(--bg-primary)' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h1 style={{ fontWeight: 800, fontSize: '28px', marginBottom: '8px' }}>Create Account</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '14px' }}>Already have one? <Link href="/login" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link></p>

          {error && (
            <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: '4px', padding: '12px 16px', marginBottom: '20px', color: '#fda4af', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input className="form-input" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} style={{ borderRadius: '4px', paddingLeft: '38px' }} />
              </div>
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ borderRadius: '4px', paddingLeft: '38px' }} />
              </div>
            </div>
            <div>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} style={{ borderRadius: '4px', paddingLeft: '38px', paddingRight: '40px' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '12px', borderRadius: '4px' }}>
              Create Account
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
