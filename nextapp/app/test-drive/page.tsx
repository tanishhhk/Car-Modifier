'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ChevronRight, ChevronLeft, User, Mail, Phone, Car, Calendar, Clock, MapPin } from 'lucide-react';
import { cars } from '@/lib/cars';

const TIME_SLOTS = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];
const LOCATIONS = ['New Delhi', 'Noida', 'Ghaziabad', 'Gurugram', 'Mumbai', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
const COUNTRY_CODES = ['+91 🇮🇳 India','+1 🇺🇸 USA','+44 🇬🇧 UK','+61 🇦🇺 Australia','+81 🇯🇵 Japan','+49 🇩🇪 Germany'];

interface FormData {
  name: string; email: string; countryCode: string; phone: string;
  model: string; date: string; time: string; location: string;
}

function TestDriveContent() {
  const searchParams = useSearchParams();
  const modelParam = searchParams.get('model') || '';

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [form, setForm] = useState<FormData>({
    name: '', email: '', countryCode: '+91 🇮🇳 India', phone: '',
    model: modelParam, date: '', time: '', location: '',
  });

  const today = new Date().toISOString().split('T')[0];

  const set = (field: keyof FormData, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validateStep = (s: number) => {
    const e: Partial<FormData> = {};
    if (s === 1) {
      if (!form.name.trim()) e.name = 'Full name is required';
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
      if (!form.phone.trim() || form.phone.length < 7) e.phone = 'Valid phone number required';
    }
    if (s === 2) {
      if (!form.model) e.model = 'Please select a model';
      if (!form.date) e.date = 'Please pick a date';
      if (!form.time) e.time = 'Please pick a time';
      if (!form.location) e.location = 'Please select a location';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);
  const submit = () => { if (validateStep(2)) setSubmitted(true); };

  if (submitted) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.2)', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: 'pulse-glow 2s ease-in-out infinite' }}>
          <Check size={36} style={{ color: '#22c55e' }} />
        </div>
        <h2 style={{ fontWeight: 800, fontSize: '28px', marginBottom: '12px', color: 'var(--text-primary)' }}>Test Drive Booked! 🎉</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.7', marginBottom: '8px' }}>
          Your {form.model} test drive at <strong style={{ color: 'var(--text-primary)' }}>{form.location}</strong> is confirmed for <strong style={{ color: 'var(--text-primary)' }}>{form.date}</strong> at <strong style={{ color: 'var(--text-primary)' }}>{form.time}</strong>.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>A confirmation will be sent to {form.email}.</p>
        <button onClick={() => { setSubmitted(false); setStep(1); setForm({ name:'',email:'',countryCode:'+91 🇮🇳 India',phone:'',model:'',date:'',time:'',location:'' }); }} className="btn-primary" style={{ marginRight: '12px' }}>
          Book Another
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '60px 24px 100px', maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '52px' }}>
        <span className="badge badge-green" style={{ marginBottom: '16px', display: 'inline-block' }}>FREE BOOKING</span>
        <h1 className="section-title">Book a Test Drive</h1>
        <p className="section-subtitle">Experience your dream car before you decide</p>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '52px', gap: '0' }}>
        {['Personal Info', 'Car & Slot', 'Confirm'].map((label, i) => {
          const n = i + 1;
          const state = step > n ? 'done' : step === n ? 'active' : 'pending';
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div className={`step-dot ${state}`}>
                  {state === 'done' ? <Check size={14} /> : n}
                </div>
                <span style={{ fontSize: '11px', color: state === 'active' ? 'var(--accent-blue)' : 'var(--text-muted)', fontWeight: state === 'active' ? 700 : 400, whiteSpace: 'nowrap' }}>{label}</span>
              </div>
              {i < 2 && <div className={`step-line ${step > n ? 'done' : ''}`} style={{ margin: '0 8px', marginBottom: '20px' }} />}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '28px', alignItems: 'start' }}>
        {/* Form */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '36px' }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '28px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={20} style={{ color: 'var(--accent-blue)' }} /> Personal Information
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="John Doe" value={form.name} onChange={e => set('name', e.target.value)} />
                  {errors.name && <p style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" placeholder="john@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                  {errors.email && <p style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <select className="form-input" style={{ width: '160px', flexShrink: 0 }} value={form.countryCode} onChange={e => set('countryCode', e.target.value)}>
                      {COUNTRY_CODES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input className="form-input" type="tel" placeholder="9876543210" value={form.phone} onChange={e => set('phone', e.target.value.replace(/\D/g,''))} />
                  </div>
                  {errors.phone && <p style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '28px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Car size={20} style={{ color: 'var(--accent-blue)' }} /> Car & Booking Details
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label className="form-label">Select Car Model</label>
                  <select className="form-input" value={form.model} onChange={e => set('model', e.target.value)}>
                    <option value="">Choose a model...</option>
                    {cars.map(c => <option key={c.id} value={c.name}>{c.brand} {c.name}</option>)}
                  </select>
                  {errors.model && <p style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px' }}>{errors.model}</p>}
                </div>
                <div>
                  <label className="form-label">Preferred Date</label>
                  <input className="form-input" type="date" min={today} value={form.date} onChange={e => set('date', e.target.value)} />
                  {errors.date && <p style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px' }}>{errors.date}</p>}
                </div>
                <div>
                  <label className="form-label">Time Slot</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))', gap: '8px' }}>
                    {TIME_SLOTS.map(t => (
                      <button key={t} type="button" onClick={() => set('time', t)} style={{
                        padding: '10px 8px', borderRadius: '10px', cursor: 'pointer',
                        fontSize: '13px', fontWeight: 600,
                        background: form.time === t ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
                        color: form.time === t ? 'var(--accent-blue)' : 'var(--text-muted)',
                        border: form.time === t ? '1px solid rgba(59,130,246,0.5)' : '1px solid var(--border)',
                        transition: 'all 0.2s',
                      }}>{t}</button>
                    ))}
                  </div>
                  {errors.time && <p style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px' }}>{errors.time}</p>}
                </div>
                <div>
                  <label className="form-label">Nearest Dealer Location</label>
                  <select className="form-input" value={form.location} onChange={e => set('location', e.target.value)}>
                    <option value="">Select city...</option>
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  {errors.location && <p style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px' }}>{errors.location}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '28px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Check size={20} style={{ color: '#22c55e' }} /> Review & Confirm
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { icon: User, label: 'Name', value: form.name },
                  { icon: Mail, label: 'Email', value: form.email },
                  { icon: Phone, label: 'Phone', value: `${form.countryCode} ${form.phone}` },
                  { icon: Car, label: 'Model', value: form.model },
                  { icon: Calendar, label: 'Date', value: form.date },
                  { icon: Clock, label: 'Time', value: form.time },
                  { icon: MapPin, label: 'Location', value: form.location },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '14px 16px' }}>
                    <Icon size={16} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px', minWidth: '70px' }}>{label}</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>{value || '—'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            {step > 1 && <button onClick={back} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ChevronLeft size={16} /> Back</button>}
            <div style={{ flex: 1 }} />
            {step < 3
              ? <button onClick={next} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 1 }}>Next <ChevronRight size={16} /></button>
              : <button onClick={submit} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 1 }}><Check size={16} /> Confirm Booking</button>
            }
          </div>
        </div>

        {/* Info panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '16px', fontSize: '16px' }}>Why Test Drive?</h3>
            {['Experience the actual drive feel before buying','Check comfort, visibility & ergonomics','Ask the dealer any questions in person','No obligation — completely free to book'].map(point => (
              <div key={point} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                <Check size={16} style={{ color: '#22c55e', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>{point}</p>
              </div>
            ))}
          </div>
          <div style={{ background: 'linear-gradient(135deg,rgba(59,130,246,0.1),rgba(139,92,246,0.1))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '16px', padding: '20px' }}>
            <p style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>📞 Need help?</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>Call us at +91 98765 43210 or email hello@carconfig.in</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 340px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function TestDrivePage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Loading...</div>}>
      <TestDriveContent />
    </Suspense>
  );
}
