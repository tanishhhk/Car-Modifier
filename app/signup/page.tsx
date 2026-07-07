'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Car, Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';

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
      <div style={{ fontSize: '60px' }}>🎉</div>
      <h2 style={{ fontWeight: 800, fontSize: '24px', color: 'var(--text-primary)' }}>Account Created!</h2>
      <p style={{ color: 'var(--text-muted)' }}>Redirecting you to the home page...</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left panel */}
      <div className="animated-gradient" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '340px', textAlign: 'center', zIndex: 1 }}>
          <div style={{ width: 80, height: 80, borderRadius: '20px', background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <Car size={40} color="white" />
          </div>
          <h2 style={{ fontWeight: 900, fontSize: '28px', marginBottom: '12px' }}>Join CarConfig</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.7', marginBottom: '40px' }}>Create a free account to save your configurations and access exclusive features.</p>
          <div className="glass-light" style={{ borderRadius: '14px', padding: '20px', textAlign: 'left' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>What you get</p>
            {['Save unlimited favorites','Persistent car configurations','Multi-device sync (coming soon)','Priority test drive slots'].map(feature => (
              <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8b5cf6', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 48px', background: 'var(--bg-primary)' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h1 style={{ fontWeight: 800, fontSize: '30px', marginBottom: '8px' }}>Create Account</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '36px' }}>Already have one? <Link href="/login" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link></p>

          {error && (
            <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#fda4af', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input className="form-input" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} style={{ paddingLeft: '44px' }} />
              </div>
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ paddingLeft: '44px' }} />
              </div>
            </div>
            <div>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingLeft: '44px', paddingRight: '48px' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', position: 'relative', zIndex: 1 }}>
              Create Account <ArrowRight size={17} />
            </button>
          </form>

          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '20px', lineHeight: '1.6', textAlign: 'center' }}>
            By signing up you agree to our{' '}
            <a href="#" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>Terms of Service</a>
            {' '}and{' '}
            <a href="#" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>Privacy Policy</a>.
          </p>
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
