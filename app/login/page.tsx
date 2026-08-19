'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Car, Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email.'); return; }
    const stored = localStorage.getItem('userEmail');
    if (stored === email) {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = '/';
    } else {
      setError('No account found with this email. Please sign up first.');
    }
  };

  const handleOtp = () => {
    if (!email) { setError('Enter your email first.'); return; }
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('otp', generated);
    alert(`Your OTP is: ${generated}`);
    setOtpSent(true);
    setError('');
  };

  const verifyOtp = () => {
    if (otp === localStorage.getItem('otp')) {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = '/';
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left panel */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', background: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '360px', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Car size={32} color="white" />
          </div>
          <h2 style={{ fontWeight: 800, fontSize: '28px', marginBottom: '12px' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>Log in to save your configurations, favorites, and access your bookings.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
            {['Browse 16+ models','Save your favorites','Compare specs side-by-side','Book test drives instantly'].map(point => (
              <div key={point} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Check size={16} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 48px', background: 'var(--bg-primary)' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h1 style={{ fontWeight: 800, fontSize: '28px', marginBottom: '8px' }}>Sign In</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '14px' }}>Don't have an account? <Link href="/signup" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}>Sign up free</Link></p>

          {error && (
            <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: '4px', padding: '12px 16px', marginBottom: '20px', color: '#fda4af', fontSize: '14px' }}>
              {error}
            </div>
          )}

          {!otpMode ? (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
                  <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ borderRadius: '4px', paddingLeft: '38px', paddingRight: '40px' }} />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '12px', borderRadius: '4px' }}>
                Sign In
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                  <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ borderRadius: '4px', paddingLeft: '38px' }} />
                </div>
              </div>
              {!otpSent ? (
                <button onClick={handleOtp} className="btn-primary" style={{ padding: '12px', borderRadius: '4px' }}>
                  Send OTP
                </button>
              ) : (
                <>
                  <div>
                    <label className="form-label">Enter OTP</label>
                    <input className="form-input" type="text" placeholder="6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} maxLength={6} style={{ borderRadius: '4px' }} />
                  </div>
                  <button onClick={verifyOtp} className="btn-primary" style={{ padding: '12px', borderRadius: '4px' }}>
                    Verify OTP
                  </button>
                </>
              )}
            </div>
          )}

          <div style={{ textAlign: 'center', margin: '24px 0', position: 'relative' }}>
            <div style={{ height: '1px', background: 'var(--border)', position: 'absolute', inset: '50% 0 auto' }} />
            <span style={{ background: 'var(--bg-primary)', padding: '0 16px', color: 'var(--text-muted)', fontSize: '13px', position: 'relative' }}>or</span>
          </div>

          <button onClick={() => { setOtpMode(!otpMode); setError(''); setOtp(''); setOtpSent(false); }} className="btn-ghost" style={{ width: '100%', padding: '12px', borderRadius: '4px' }}>
            {otpMode ? 'Back to Password' : 'Continue with OTP'}
          </button>
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
