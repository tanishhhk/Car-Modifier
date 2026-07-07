'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ChevronRight, ChevronLeft, User, Mail, Phone, Car, Calendar, Clock, MapPin, Wrench, Shield, Home } from 'lucide-react';
import { cars } from '@/lib/cars';

const TIME_SLOTS = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];
const LOCATIONS = ['New Delhi', 'Noida', 'Ghaziabad', 'Gurugram', 'Mumbai', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
const COUNTRY_CODES = ['+91 🇮🇳 India','+1 🇺🇸 USA','+44 🇬🇧 UK','+61 🇦🇺 Australia','+81 🇯🇵 Japan','+49 🇩🇪 Germany'];

const GARAGES = [
  { name: 'Apex Auto Customizers', rating: '4.9 ★', specialties: 'Alloys, Paint & Suspension' },
  { name: 'Precision Tuning & Audio', rating: '4.8 ★', specialties: 'Subwoofers & System Tuning' },
  { name: 'GlowDrive Body & Paint Shop', rating: '4.7 ★', specialties: 'Metallic & Matte Wraps' },
  { name: 'HyperAudio Woofers', rating: '4.9 ★', specialties: 'Soundproofing & Trunk Audio' },
  { name: 'Elite Leather Interiors', rating: '4.8 ★', specialties: 'Alcantara, Leather & Console Trim' }
];

interface FormData {
  name: string; email: string; countryCode: string; phone: string;
  model: string; variant: string; date: string; time: string; location: string;
  visitType: 'garage' | 'home'; garageName: string; address: string;
}

function GarageAppointmentContent() {
  const searchParams = useSearchParams();
  const carIdParam = searchParams.get('car') || '';
  const variantParam = searchParams.get('variant') || '';
  const paintParam = searchParams.get('paint') || '';
  const alloyParam = searchParams.get('alloy') || '';
  const wooferParam = searchParams.get('woofer') || '';
  const interiorParam = searchParams.get('interior') || '';

  const carObj = cars.find(c => c.id === carIdParam);

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [form, setForm] = useState<FormData>({
    name: '', email: '', countryCode: '+91 🇮🇳 India', phone: '',
    model: carObj ? `${carObj.brand} ${carObj.name}` : '',
    variant: variantParam, date: '', time: '', location: '',
    visitType: 'garage', garageName: '', address: ''
  });

  // Autofill if redirected from customizer
  useEffect(() => {
    if (carObj) {
      setForm(f => ({
        ...f,
        model: `${carObj.brand} ${carObj.name}`,
        variant: variantParam
      }));
    }
  }, [carObj, variantParam]);

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
      if (!form.model) e.model = 'Please select a car model';
      if (!form.garageName) e.garageName = 'Please select a customizer garage';
      if (!form.date) e.date = 'Please pick a date';
      if (!form.time) e.time = 'Please pick a time';
      if (!form.location) e.location = 'Please select a city location';
      if (form.visitType === 'home' && !form.address.trim()) e.address = 'Home address is required for home visits';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);
  const submit = () => { if (validateStep(2)) setSubmitted(true); };

  const alloyLabels = { spoke: 'Chrome Spoke', star: 'Matte Black Star', mesh: 'Golden Mesh', redline: 'Sport Red Line' };
  const wooferLabels = { none: 'Factory Audio (None)', bassking: 'Bass King 12"', jbl: 'JBL Club 1000W', sony: 'Sony Xplod Duo' };
  const interiorLabels = { tan: 'Premium Tan Leather', carbon: 'Carbon Sport Red', cream: 'Royal Cream Alcantara', obsidian: 'Midnight Obsidian' };

  if (submitted) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '540px' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Check size={36} style={{ color: '#22c55e' }} />
        </div>
        <h2 style={{ fontWeight: 900, fontSize: '32px', marginBottom: '12px', color: 'var(--text-primary)' }}>Appointment Scheduled! 🎉</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.75', marginBottom: '16px' }}>
          Your appointment is confirmed for <strong style={{ color: 'var(--text-primary)' }}>{form.date}</strong> at <strong style={{ color: 'var(--text-primary)' }}>{form.time}</strong> with <strong style={{ color: 'var(--text-primary)' }}>{form.garageName}</strong>.
        </p>
        
        {form.visitType === 'home' ? (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Home size={16} style={{ color: 'var(--accent-blue)' }} /> Home Visit Address
            </p>
            <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '13px' }}>{form.address}</p>
          </div>
        ) : (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} style={{ color: 'var(--accent-blue)' }} /> Garage Shop Location
            </p>
            <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '13px' }}>Partner shop located in {form.location}. Please bring your configuration details.</p>
          </div>
        )}

        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>A confirmation detail block was sent to {form.email}. Our technician will call you shortly.</p>
        <button onClick={() => { setSubmitted(false); setStep(1); setForm({ name:'',email:'',countryCode:'+91 🇮🇳 India',phone:'',model:'',variant:'',date:'',time:'',location:'',visitType:'garage',garageName:'',address:'' }); }} className="btn-primary" style={{ marginRight: '12px' }}>
          Schedule Another
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '60px 24px 100px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '52px' }}>
        <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-block' }}>GARAGE COLLABORATION</span>
        <h1 className="section-title">Schedule Garage Appointment</h1>
        <p className="section-subtitle">Meet our customization experts, discuss details, and build your custom car</p>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '52px', gap: '0' }}>
        {['Personal Info', 'Garage & Slot', 'Review & Confirm'].map((label, i) => {
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '28px', alignItems: 'start' }}>
        {/* Form panel */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '36px' }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '28px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={20} style={{ color: 'var(--accent-blue)' }} /> Contact Details
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
                <Wrench size={20} style={{ color: 'var(--accent-blue)' }} /> Garage & Time Slot
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Visit Type */}
                <div>
                  <label className="form-label">Appointment Type</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => set('visitType', 'garage')}
                      style={{
                        padding: '12px', borderRadius: '10px', cursor: 'pointer',
                        fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        background: form.visitType === 'garage' ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)',
                        color: form.visitType === 'garage' ? 'var(--accent-blue)' : 'var(--text-muted)',
                        border: form.visitType === 'garage' ? '1px solid rgba(59,130,246,0.4)' : '1px solid var(--border)',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Wrench size={16} /> I will visit shop
                    </button>
                    <button
                      type="button"
                      onClick={() => set('visitType', 'home')}
                      style={{
                        padding: '12px', borderRadius: '10px', cursor: 'pointer',
                        fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        background: form.visitType === 'home' ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)',
                        color: form.visitType === 'home' ? 'var(--accent-blue)' : 'var(--text-muted)',
                        border: form.visitType === 'home' ? '1px solid rgba(59,130,246,0.4)' : '1px solid var(--border)',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Home size={16} /> Visit my location
                    </button>
                  </div>
                </div>

                {/* Home Visit Address */}
                {form.visitType === 'home' && (
                  <div>
                    <label className="form-label">Your Address (For Home Visit)</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      placeholder="Enter your complete home or office address..."
                      value={form.address}
                      onChange={e => set('address', e.target.value)}
                      style={{ fontFamily: 'inherit', resize: 'vertical' }}
                    />
                    {errors.address && <p style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px' }}>{errors.address}</p>}
                  </div>
                )}

                {/* Car model selection */}
                <div>
                  <label className="form-label">Car Model</label>
                  <select className="form-input" value={form.model} onChange={e => set('model', e.target.value)}>
                    <option value="">Select a car...</option>
                    {cars.map(c => <option key={c.id} value={`${c.brand} ${c.name}`}>{c.brand} {c.name}</option>)}
                  </select>
                  {errors.model && <p style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px' }}>{errors.model}</p>}
                </div>

                {/* Customizer Garage */}
                <div>
                  <label className="form-label">Choose Specialized Garage</label>
                  <select className="form-input" value={form.garageName} onChange={e => set('garageName', e.target.value)}>
                    <option value="">Select garage partner...</option>
                    {GARAGES.map(g => <option key={g.name} value={g.name}>{g.name} ({g.specialties})</option>)}
                  </select>
                  {errors.garageName && <p style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px' }}>{errors.garageName}</p>}
                </div>

                {/* Preferred City */}
                <div>
                  <label className="form-label">Your City</label>
                  <select className="form-input" value={form.location} onChange={e => set('location', e.target.value)}>
                    <option value="">Select city...</option>
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  {errors.location && <p style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px' }}>{errors.location}</p>}
                </div>

                {/* Date */}
                <div>
                  <label className="form-label">Preferred Date</label>
                  <input className="form-input" type="date" min={today} value={form.date} onChange={e => set('date', e.target.value)} />
                  {errors.date && <p style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px' }}>{errors.date}</p>}
                </div>

                {/* Time Slot */}
                <div>
                  <label className="form-label">Time Slot</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))', gap: '8px' }}>
                    {TIME_SLOTS.map(t => (
                      <button key={t} type="button" onClick={() => set('time', t)} style={{
                        padding: '10px 8px', borderRadius: '10px', cursor: 'pointer',
                        fontSize: '13px', fontWeight: 600,
                        background: form.time === t ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)',
                        color: form.time === t ? 'var(--accent-blue)' : 'var(--text-muted)',
                        border: form.time === t ? '1px solid rgba(59,130,246,0.4)' : '1px solid var(--border)',
                        transition: 'all 0.2s',
                      }}>{t}</button>
                    ))}
                  </div>
                  {errors.time && <p style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px' }}>{errors.time}</p>}
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
                  { icon: Car, label: 'Car & Variant', value: `${form.model} ${form.variant ? `(${form.variant})` : ''}` },
                  { icon: Wrench, label: 'Garage', value: form.garageName },
                  { icon: Home, label: 'Visit Type', value: form.visitType === 'home' ? 'Home Visit (We visit you)' : 'Garage Visit (You visit shop)' },
                  { icon: Calendar, label: 'Date', value: form.date },
                  { icon: Clock, label: 'Time', value: form.time },
                  { icon: MapPin, label: 'City', value: form.location },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'var(--bg-glass-light)', borderRadius: '10px', padding: '14px 16px', border: '1px solid var(--border)' }}>
                    <Icon size={16} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px', minWidth: '85px' }}>{label}</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>{value || '-'}</span>
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
              : <button onClick={submit} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 1 }}><Check size={16} /> Confirm Appointment</button>
            }
          </div>
        </div>

        {/* Right side info panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* 3D Customization summary card (if prefilled) */}
          {carObj && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: 800, margin: '0 0 16px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Car size={18} style={{ color: 'var(--accent-blue)' }} /> Configuration Specs
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Base Car</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '13px' }}>{carObj.name}</span>
                </div>
                {variantParam && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Variant CAD</span>
                    <span style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '13px' }}>{variantParam}</span>
                  </div>
                )}
                {paintParam && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Paint Finish</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontWeight: 600, fontSize: '13px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: paintParam, border: '1px solid rgba(255,255,255,0.2)' }} />
                      {paintParam}
                    </span>
                  </div>
                )}
                {alloyParam && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Alloy Wheels</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '13px' }}>{alloyLabels[alloyParam as keyof typeof alloyLabels] || alloyParam}</span>
                  </div>
                )}
                {wooferParam && wooferParam !== 'none' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Subwoofer</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '13px' }}>{wooferLabels[wooferParam as keyof typeof wooferLabels] || wooferParam}</span>
                  </div>
                )}
                {interiorParam && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Interior Cabin</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '13px' }}>{interiorLabels[interiorParam as keyof typeof interiorLabels] || interiorParam}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Garage specialties */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '16px', fontSize: '16px' }}>Garage Options</h3>
            {['Garage team will visit you or you can visit them','Discuss alloy rims, wraps, and subwoofer acoustics','Get custom quotes based on your Three.js CAD specs','Expert installation with full replacement warranties'].map(point => (
              <div key={point} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                <Check size={16} style={{ color: '#22c55e', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>{point}</p>
              </div>
            ))}
          </div>
          
          <div style={{ background: 'linear-gradient(135deg,var(--glow-blue),var(--glow-violet))', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
            <p style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>📞 Questions about build?</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>Call us at +91 98765 43210 or email experts@carconfig.in</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 360px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function GarageAppointmentPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Loading...</div>}>
      <GarageAppointmentContent />
    </Suspense>
  );
}
