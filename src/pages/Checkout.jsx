import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Lock, Check, Plus, CreditCard, ChevronDown, ArrowRight } from 'lucide-react';
import { clearCart } from '../redux/cartSlice';
import { createOrder } from '../redux/ordersSlice';
import toast from 'react-hot-toast';

const SAVED_CARDS = [
  { id: 'amex', label: 'Corporate Amex', last4: '4092', exp: '12/26', brand: 'AMEX' },
  { id: 'visa', label: 'Personal Visa',  last4: '8817', exp: '09/27', brand: 'VISA' },
];

function InputField({ label, placeholder, type = 'text', id, icon, value, onChange, required }) {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 7 }}>{label}{required && <span style={{ color: '#ef4444' }}> *</span>}</label>
      <div style={{ display: 'flex', alignItems: 'center', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, overflow: 'hidden' }}>
        <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange}
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: 14, padding: '12px 14px', caretColor: '#fff' }} />
        {icon && <span style={{ paddingRight: 14, color: 'rgba(255,255,255,0.25)' }}>{icon}</span>}
      </div>
    </div>
  );
}

export default function Checkout() {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const items      = useSelector(s => s.cart.items);
  const user       = useSelector(s => s.auth.user);

  const [step, setStep]         = useState(1);
  const [selCard, setSelCard]   = useState('amex');
  const [addNew, setAddNew]     = useState(false);
  const [loading, setLoading]   = useState(false);

  // Address form state
  const [form, setForm] = useState({
    fullName: user?.name || '', email: user?.email || '',
    phone: '', address: '', city: '', state: '', zip: '', country: '',
  });
  const updateForm = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const aircraft = items[0];
  const subtotal = aircraft ? aircraft.charterRate * (aircraft.qty || 1) : 0;
  const taxes    = Math.round(subtotal * 0.05);
  const total    = subtotal + taxes;

  const canProceedStep1 = form.fullName && form.email && form.phone && form.address && form.city && form.country;

  const handleAuthorize = async () => {
    setLoading(true);
    try {
      const card = SAVED_CARDS.find(c => c.id === selCard);
      await dispatch(createOrder({
        aircraft: aircraft?.name || 'Charter Aircraft',
        aircraftId: aircraft?.id || 'unknown',
        route: aircraft?.route ? `${aircraft.route.from} → ${aircraft.route.to}` : 'N/A',
        from: aircraft?.route?.from, fromCity: aircraft?.route?.fromCity,
        to: aircraft?.route?.to, toCity: aircraft?.route?.toCity,
        total, passengers: aircraft?.passengers || 1,
        flightTime: aircraft?.flightTime || 'N/A',
        passengerName: form.fullName, passengerEmail: form.email,
        address: `${form.address}, ${form.city}, ${form.country}`,
        paymentMethod: card ? `${card.label} ••••${card.last4}` : 'New Card',
      })).unwrap();
      dispatch(clearCart());
      toast.success('Payment authorised! Your charter is confirmed.');
      navigate('/orders');
    } catch (e) {
      toast.error('Payment failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '48px 32px' }}>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 36 }}>
          <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 8 }}>Secure Checkout</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', maxWidth: 440 }}>Complete your reservation. All transactions are encrypted and secured.</p>
        </motion.div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {['Passenger Details', 'Payment'].map((label, i) => (
            <div key={label} style={{ flex: 1, height: 4, borderRadius: 2, background: step > i ? '#fff' : 'rgba(255,255,255,0.08)', transition: 'background 0.4s' }} />
          ))}
        </div>

        <div className="grid-checkout">

          {/* ── LEFT ── */}
          <div>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '28px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#000' }}>1</span>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Passenger & Address Details</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <InputField id="fullName" label="Full Name" placeholder="John Doe" value={form.fullName} onChange={e => updateForm('fullName', e.target.value)} required />
                    <InputField id="email" label="Email Address" type="email" placeholder="name@domain.com" value={form.email} onChange={e => updateForm('email', e.target.value)} required />
                    <InputField id="phone" label="Phone Number" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => updateForm('phone', e.target.value)} required />
                    <InputField id="country" label="Country" placeholder="United Kingdom" value={form.country} onChange={e => updateForm('country', e.target.value)} required />
                  </div>
                  <InputField id="address" label="Street Address" placeholder="42 Mayfair Lane, London W1K" value={form.address} onChange={e => updateForm('address', e.target.value)} required />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 16 }}>
                    <InputField id="city" label="City" placeholder="London" value={form.city} onChange={e => updateForm('city', e.target.value)} required />
                    <InputField id="state" label="State / Region" placeholder="Greater London" value={form.state} onChange={e => updateForm('state', e.target.value)} />
                    <InputField id="zip" label="Postal Code" placeholder="W1K 3QR" value={form.zip} onChange={e => updateForm('zip', e.target.value)} />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => canProceedStep1 && setStep(2)} disabled={!canProceedStep1}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: canProceedStep1 ? '#fff' : 'rgba(255,255,255,0.1)', color: canProceedStep1 ? '#000' : 'rgba(255,255,255,0.3)', fontWeight: 700, fontSize: 14, padding: '15px', borderRadius: 12, border: 'none', cursor: canProceedStep1 ? 'pointer' : 'not-allowed', marginTop: 24 }}>
                    Continue to Payment <ArrowRight size={15} />
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  {/* Completed step 1 summary */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 24px', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, marginBottom: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={12} color="#fff" strokeWidth={3} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Passenger: {form.fullName}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{form.address}, {form.city}</div>
                    </div>
                    <button onClick={() => setStep(1)} style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                  </div>

                  {/* Payment */}
                  <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '24px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#000' }}>2</span>
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Payment Information</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
                      {SAVED_CARDS.map(card => (
                        <button key={card.id} onClick={() => { setSelCard(card.id); setAddNew(false); }}
                          style={{ background: selCard === card.id && !addNew ? 'rgba(255,255,255,0.07)' : '#111', border: `1px solid ${selCard === card.id && !addNew ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 12, padding: '14px 16px', cursor: 'pointer', textAlign: 'left', position: 'relative' }}>
                          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{card.label}</div>
                          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '0.12em', marginBottom: 4 }}>•••• {card.last4}</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Exp: {card.exp}</span>
                            <CreditCard size={13} color="rgba(255,255,255,0.25)" />
                          </div>
                          {selCard === card.id && !addNew && (
                            <div style={{ position: 'absolute', top: 10, right: 10, width: 18, height: 18, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Check size={10} color="#fff" strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      ))}
                      <button onClick={() => { setAddNew(true); setSelCard(null); }}
                        style={{ background: addNew ? 'rgba(255,255,255,0.07)' : '#111', border: `1px solid ${addNew ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 12, padding: '14px 16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <div style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Plus size={14} color="rgba(255,255,255,0.5)" />
                        </div>
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Add New Card</span>
                      </button>
                    </div>

                    {addNew && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ overflow: 'hidden' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 8, paddingBottom: 8 }}>
                          <InputField id="cardNumber" label="Card Number" placeholder="1234 5678 9012 3456" icon={<CreditCard size={15} />} />
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                            <InputField id="expiry" label="Expiry Date" placeholder="MM / YY" />
                            <InputField id="cvc" label="CVC" placeholder="123" icon={<Lock size={14} />} />
                          </div>
                          <InputField id="cardName" label="Cardholder Name" placeholder="Name on card" />
                        </div>
                      </motion.div>
                    )}

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleAuthorize} disabled={loading || (!selCard && !addNew)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: '#000', fontWeight: 700, fontSize: 14, padding: '15px', borderRadius: 12, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, marginTop: 20 }}>
                      {loading ? <span style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> : <><Lock size={14} /> Authorize Payment</>}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT — Order Summary ── */}
          <div style={{ position: 'sticky', top: 90, alignSelf: 'start' }}>
            <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '28px', overflow: 'hidden' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Order Summary</h2>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: 14, marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <img src={item.image} alt={item.name} style={{ width: 70, height: 50, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                      {item.route ? `${item.route.from} → ${item.route.to}` : 'Route TBD'} · {item.passengers || 1} pax
                    </div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', flexShrink: 0 }}>${(item.charterRate * (item.qty || 1)).toLocaleString()}</div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Subtotal</span>
                <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>${subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Taxes & Fees (5%)</span>
                <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>${taxes.toLocaleString()}</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>${total.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14 }}>
              <Lock size={11} color="rgba(255,255,255,0.25)" />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>AES-256 encrypted · PCI DSS compliant</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
