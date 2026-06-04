import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Sliders, Bookmark, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { productsAPI } from '../services/api';
import { CardSkeleton, StarRating } from '../components/UI';

const CLASSES = ['All Aircraft','Ultra Long Range','Long Range','Large Cabin','Super Mid-Size','Light Jet'];
const MANUFACTURERS = ['Any Manufacturer','Gulfstream','Bombardier','Dassault','Embraer','Cessna','Pilatus'];
const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $5k/hr', min: 0, max: 4999 },
  { label: '$5k – $8k/hr', min: 5000, max: 8000 },
  { label: '$8k – $12k/hr', min: 8000, max: 12000 },
  { label: 'Over $12k/hr', min: 12000, max: Infinity },
];
const SORTS = [
  { label: 'Latest', value: 'latest' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Range: Longest', value: 'range' },
];
const PER_PAGE = 6;

function Sel({ label, value, options, onChange }) {
  return (
    <div style={{ flex: 1, minWidth: 130 }}>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{ position: 'relative' }}>
        <select value={value} onChange={e => onChange(e.target.value)}
          style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 13, padding: '11px 36px 11px 14px', outline: 'none', appearance: 'none', cursor: 'pointer' }}>
          {options.map(o => <option key={typeof o === 'string' ? o : o.label} value={typeof o === 'string' ? o : o.label}>{typeof o === 'string' ? o : o.label}</option>)}
        </select>
        <ChevronDown size={13} color="rgba(255,255,255,0.35)" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      </div>
    </div>
  );
}

function Card({ a, index }) {
  const [saved, setSaved] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.06 }}>
      <Link to={`/aircraft/${a.id}`} style={{ textDecoration: 'none' }}>
        <motion.div whileHover={{ y: -4 }}
          style={{ background: '#0e0e0e', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', transition: 'border-color 0.3s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
          <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
            <img src={a.image} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.05) 55%)' }} />
            <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '5px 12px' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: a.status === 'Available' ? '#22c55e' : '#f59e0b' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{a.status}</span>
            </div>
            <button onClick={e => { e.preventDefault(); setSaved(v => !v); }}
              style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: saved ? '#fff' : 'rgba(255,255,255,0.45)' }}>
              <Bookmark size={14} fill={saved ? '#fff' : 'none'} />
            </button>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 14px' }}>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>{a.name}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{a.manufacturer} • {a.year}</p>
            </div>
          </div>
          {/* Rating */}
          <div style={{ padding: '10px 20px 0' }}>
            <StarRating rating={a.rating} count={a.reviewCount} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 10 }}>
            {[['Range', a.range], ['Pax', `${a.pax} seats`], ['Price', a.priceDisplay]].map(([lbl, val], i) => (
              <div key={lbl} style={{ padding: '14px 16px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{lbl}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{val}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function AircraftListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cls, setCls]     = useState(searchParams.get('category') || 'All Aircraft');
  const [mfr, setMfr]     = useState('Any Manufacturer');
  const [pr,  setPr]      = useState('Any Price');
  const [sort, setSort]   = useState('latest');
  const [q,    setQ]      = useState(searchParams.get('q') || '');
  const [page, setPage]   = useState(1);
  const [data, setData]   = useState({ products: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const prObj = PRICE_RANGES.find(p => p.label === pr) || PRICE_RANGES[0];
    productsAPI.getAll({
      page, limit: PER_PAGE, search: q,
      category: cls, manufacturer: mfr,
      minPrice: prObj.min, maxPrice: prObj.max, sort,
    }).then(res => { setData(res); setLoading(false); });
  }, [cls, mfr, pr, sort, q, page]);

  const handleFilter = () => { setPage(1); };

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 80 }}>
      <div className="aircraft-listing-inner" style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 40px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 'clamp(36px,5vw,60px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 10 }}>Global Fleet</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 460 }}>Curated excellence in aviation. Explore our comprehensive marketplace of private jets.</p>
        </motion.div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <Search size={15} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)' }} />
          <input value={q} onChange={e => { setQ(e.target.value); setPage(1); }} placeholder="Search aircraft or manufacturer…"
            style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontSize: 14, padding: '13px 16px 13px 42px', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 22px', marginBottom: 36 }}>
          <Sel label="Class" value={cls} options={CLASSES} onChange={v => { setCls(v); setPage(1); }} />
          <Sel label="Manufacturer" value={mfr} options={MANUFACTURERS} onChange={v => { setMfr(v); setPage(1); }} />
          <Sel label="Price Range" value={pr} options={PRICE_RANGES.map(p => p.label)} onChange={v => { setPr(v); setPage(1); }} />
          <div>
            <div style={{ fontSize: 10, color: 'transparent', marginBottom: 6 }}>_</div>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleFilter}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', color: '#000', fontWeight: 700, fontSize: 13, padding: '12px 20px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
              <Sliders size={13} /> Apply Filters
            </motion.button>
          </div>
        </div>

        {/* Results header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{data.total} aircraft available</span>
          <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}
            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 13, padding: '8px 12px', outline: 'none', cursor: 'pointer' }}>
            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid-aircraft">
            {Array.from({ length: PER_PAGE }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : data.products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Search size={28} color="rgba(255,255,255,0.3)" /></div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, marginBottom: 20 }}>No aircraft match your filters.</p>
            <button onClick={() => { setCls('All Aircraft'); setMfr('Any Manufacturer'); setPr('Any Price'); setQ(''); setPage(1); }}
              style={{ background: '#fff', color: '#000', fontWeight: 700, fontSize: 13, padding: '12px 24px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid-aircraft">
            {data.products.map((a, i) => <Card key={a.id} a={a} index={i} />)}
          </div>
        )}

        {/* Pagination */}
        {data.totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 48 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              style={{ width: 38, height: 38, borderRadius: 10, background: page === 1 ? '#111' : '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', color: page === 1 ? 'rgba(255,255,255,0.2)' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                style={{ width: 38, height: 38, borderRadius: 10, background: p === page ? '#fff' : '#1a1a1a', color: p === page ? '#000' : '#fff', fontWeight: 700, fontSize: 14, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.2s' }}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(data.totalPages, p + 1))} disabled={page === data.totalPages}
              style={{ width: 38, height: 38, borderRadius: 10, background: page === data.totalPages ? '#111' : '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', color: page === data.totalPages ? 'rgba(255,255,255,0.2)' : '#fff', cursor: page === data.totalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
