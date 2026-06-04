import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Globe, Plane, SquareStack, Rocket, Zap } from 'lucide-react';
import { CATEGORIES } from '../services/api';

const CAT_ICONS = {
  'ultra-long-range': Globe,
  'long-range':       Plane,
  'large-cabin':      SquareStack,
  'super-mid-size':   Rocket,
  'light-jet':        Zap,
};

export default function HomepageCategories() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/aircraft?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <section style={{ background: '#080808', padding: '80px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 14 }}>— Quick Search</div>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,40px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 20 }}>Find Your Aircraft</h2>
          <form onSubmit={handleSearch} className="search-form" style={{ display: 'flex', gap: 0, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50, padding: '6px 6px 6px 24px', maxWidth: 560 }}>
            <Search size={16} color="rgba(255,255,255,0.3)" style={{ flexShrink: 0, marginTop: 10 }} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search jets, manufacturers, categories…"
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: 14, padding: '10px 14px', caretColor: '#fff' }} />
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} type="submit"
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', color: '#000', fontWeight: 700, fontSize: 13, padding: '12px 24px', borderRadius: 44, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Search <ArrowRight size={14} strokeWidth={2.5} />
            </motion.button>
          </form>
        </motion.div>

        {/* Categories Grid */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 10 }}>— Browse by Class</div>
              <h2 style={{ fontSize: 'clamp(28px,3.5vw,40px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>Aircraft Categories</h2>
            </div>
            <Link to="/categories" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
              All Categories <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid-5col">
            {CATEGORIES.map((cat, i) => {
              const Icon = CAT_ICONS[cat.id] || Plane;
              return (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Link to={`/aircraft?category=${encodeURIComponent(cat.name)}`} style={{ textDecoration: 'none' }}>
                  <motion.div whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.2)' }}
                    style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '28px 20px', cursor: 'pointer', transition: 'border-color 0.3s', textAlign: 'center' }}>
                    <div style={{ width: 48, height: 48, margin: '0 auto 14px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={22} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{cat.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{cat.count} aircraft</div>
                  </motion.div>
                </Link>
              </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
