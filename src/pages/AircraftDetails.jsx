import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Globe, Users, ArrowRight, Check, Plane, ChevronDown, Lock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { getAircraftById, AIRCRAFT } from '../utils/mockData';
import toast from 'react-hot-toast';

const AIRPORTS = [
  { code: 'LHR', city: 'London', country: 'UK' },
  { code: 'DXB', city: 'Dubai', country: 'UAE' },
  { code: 'JFK', city: 'New York', country: 'USA' },
  { code: 'CDG', city: 'Paris', country: 'France' },
  { code: 'SIN', city: 'Singapore', country: 'Singapore' },
  { code: 'HKG', city: 'Hong Kong', country: 'China' },
  { code: 'LAX', city: 'Los Angeles', country: 'USA' },
  { code: 'MIA', city: 'Miami', country: 'USA' },
  { code: 'ZRH', city: 'Zurich', country: 'Switzerland' },
  { code: 'NRT', city: 'Tokyo', country: 'Japan' },
  { code: 'YYZ', city: 'Toronto', country: 'Canada' },
  { code: 'SYD', city: 'Sydney', country: 'Australia' },
];

function RouteSelect({ label, value, onChange, id }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{ position: 'relative' }}>
        <select id={id} value={value} onChange={e => onChange(e.target.value)}
          style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, padding: '11px 32px 11px 14px', outline: 'none', appearance: 'none', cursor: 'pointer' }}>
          {AIRPORTS.map(ap => (
            <option key={ap.code} value={ap.code}>{ap.code} — {ap.city}</option>
          ))}
        </select>
        <ChevronDown size={12} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      </div>
    </div>
  );
}

export default function AircraftDetails() {
  const { id }         = useParams();
  const navigate       = useNavigate();
  const dispatch       = useDispatch();
  const { isAuthenticated } = useSelector(s => s.auth);
  const cartItems      = useSelector(s => s.cart.items);
  const a              = getAircraftById(id);
  const [activeImg, setActiveImg] = useState(0);
  const inCart = cartItems.some(i => i.id === id);

  // Route selection state
  const [fromCode, setFromCode] = useState(a?.route?.from || 'LHR');
  const [toCode, setToCode]     = useState(a?.route?.to || 'DXB');
  const [depDate, setDepDate]   = useState('');
  const [pax, setPax]           = useState(2);

  if (!a) return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><Plane size={28} color="rgba(255,255,255,0.3)" /></div>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, marginBottom: 24 }}>Aircraft not found.</p>
      <Link to="/aircraft" style={{ color: '#fff', fontWeight: 700, background: '#1a1a1a', padding: '12px 24px', borderRadius: 10, textDecoration: 'none' }}>Back to Fleet</Link>
    </div>
  );

  const fromAP = AIRPORTS.find(ap => ap.code === fromCode) || AIRPORTS[0];
  const toAP   = AIRPORTS.find(ap => ap.code === toCode) || AIRPORTS[1];

  const handleCart = () => {
    if (!isAuthenticated) { toast.error('Please sign in to add to cart.'); navigate('/login'); return; }
    if (inCart) { navigate('/cart'); return; }
    if (fromCode === toCode) { toast.error('Departure and arrival must be different.'); return; }
    dispatch(addToCart({
      id: a.id, name: a.name, image: a.image, charterRate: a.charterRate,
      manufacturer: a.manufacturer, tail: a.tail, seats: a.seats,
      route: { from: fromCode, fromCity: fromAP.city, to: toCode, toCity: toAP.city },
      departure: depDate || a.departure, flightTime: a.flightTime,
      costs: a.costs, passengers: pax,
    }));
    toast.success(`${a.name} added to your charter selection!`);
  };

  const related = AIRCRAFT.filter(x => x.id !== id && x.class === a.class).slice(0, 3);

  const swapRoute = () => { setFromCode(toCode); setToCode(fromCode); };

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 80 }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
        <motion.img key={activeImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={a.gallery[activeImg]} alt={a.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(8,8,8,0.85) 100%)' }} />
        <button onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: 24, left: 32, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 16px', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
          <ArrowLeft size={14} /> Back to Fleet
        </button>
        {a.gallery.length > 1 && (
          <div style={{ position: 'absolute', bottom: 24, left: 32, display: 'flex', gap: 10 }}>
            {a.gallery.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                style={{ width: 64, height: 44, borderRadius: 8, overflow: 'hidden', border: `2px solid ${i === activeImg ? '#fff' : 'rgba(255,255,255,0.2)'}`, cursor: 'pointer', padding: 0, background: 'none' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>

          {/* Left content */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>{a.class}</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
              <span style={{ fontSize: 11, color: a.status === 'Available' ? '#22c55e' : '#f59e0b', fontWeight: 600 }}>{a.status}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 8 }}>{a.name}</h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>{a.manufacturer} • {a.year} • Tail: {a.tail}</p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 40 }}>{a.description}</p>

            {/* Specs */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Specifications</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                {[['Range', a.range, Globe], ['Speed', a.speed, Zap], ['Cabin', `${a.pax} pax`, Users], ['Ceiling', a.ceiling, Zap], ['Engines', a.engines, Zap], ['Tail No.', a.tail, Users]].map(([lbl, val]) => (
                  <div key={lbl} style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '16px 18px' }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>{lbl}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Cabin Features</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {a.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={11} color="rgba(255,255,255,0.7)" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — booking card */}
          <div>
            <div style={{ position: 'sticky', top: 90, background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '28px', overflow: 'hidden' }}>

              {/* Rate */}
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>Charter Rate</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 4 }}>${a.charterRate.toLocaleString()}<span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>/hr</span></div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>All-inclusive pricing</div>

              {/* ── Route Selector ── */}
              <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px 16px', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 14 }}>
                  <RouteSelect label="From" id="route-from" value={fromCode} onChange={setFromCode} />
                  <button onClick={swapRoute} title="Swap route"
                    style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', flexShrink: 0, marginBottom: 2, transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
                    ⇄
                  </button>
                  <RouteSelect label="To" id="route-to" value={toCode} onChange={setToCode} />
                </div>
                {/* Route preview */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{fromCode}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{fromAP.city}</div>
                  </div>
                  <Plane size={14} color="rgba(255,255,255,0.3)" />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{toCode}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{toAP.city}</div>
                  </div>
                </div>
              </div>

              {/* Date + Passengers */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Departure Date</div>
                  <input id="dep-date" type="date" value={depDate} onChange={e => setDepDate(e.target.value)}
                    style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 13, padding: '11px 14px', outline: 'none', cursor: 'pointer', colorScheme: 'dark' }} />
                </div>
                <div style={{ width: 100 }}>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Passengers</div>
                  <div style={{ position: 'relative' }}>
                    <select id="pax-count" value={pax} onChange={e => setPax(Number(e.target.value))}
                      style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, padding: '11px 28px 11px 14px', outline: 'none', appearance: 'none', cursor: 'pointer' }}>
                      {Array.from({ length: a.pax }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>

              {/* Cost breakdown */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 18, marginBottom: 18 }}>
                {[['Base Rate', `$${a.costs.base.toLocaleString()}`], ['Taxes & Fees', `$${a.costs.taxes.toLocaleString()}`], ['Premium Extras', `$${a.costs.extras.toLocaleString()}`]].map(([lbl, val]) => (
                  <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{lbl}</span>
                    <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Total</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>${(a.costs.base + a.costs.taxes + a.costs.extras).toLocaleString()}</span>
                </div>
              </div>

              {/* CTA */}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleCart}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: '#000', fontWeight: 700, fontSize: 14, padding: '15px', borderRadius: 12, border: 'none', cursor: 'pointer', marginBottom: 12 }}>
                {inCart ? 'View in Cart' : 'Add to Charter'} <ArrowRight size={15} strokeWidth={2.5} />
              </motion.button>
              <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.25)', lineHeight: 1.6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}><Lock size={10} /> AES-256 encrypted. Refundable up to 48hrs.</p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 28, letterSpacing: '-0.02em' }}>Similar Aircraft</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
              {related.map(r => (
                <Link key={r.id} to={`/aircraft/${r.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
                    <img src={r.image} alt={r.name} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{r.manufacturer} • ${r.charterRate.toLocaleString()}/hr</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
