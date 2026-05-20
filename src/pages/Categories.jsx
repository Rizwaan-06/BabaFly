import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Plane, SquareStack, Rocket, Zap } from 'lucide-react';
import { categoriesAPI } from '../services/api';
import { PageLoader } from '../components/UI';

const CAT_ICONS = {
  'ultra-long-range': Globe,
  'long-range':       Plane,
  'large-cabin':      SquareStack,
  'super-mid-size':   Rocket,
  'light-jet':        Zap,
};

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoriesAPI.getAll().then(data => { setCats(data); setLoading(false); });
  }, []);

  if (loading) return <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 80 }}><PageLoader /></div>;

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 40px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 14 }}>— Browse by Class</div>
          <h1 style={{ fontSize: 'clamp(36px,5vw,56px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 10 }}>Aircraft Categories</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 480 }}>Explore our fleet organized by aircraft class. From light jets to ultra-long-range flagships.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
          {cats.map((cat, i) => {
            const Icon = CAT_ICONS[cat.id] || Plane;
            return (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link to={`/aircraft?category=${encodeURIComponent(cat.name)}`} style={{ textDecoration: 'none' }}>
                  <motion.div whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.2)' }}
                    style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '32px 28px', cursor: 'pointer', transition: 'border-color 0.3s', minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <Icon size={24} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
                      </div>
                      <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>{cat.name}</h2>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 20 }}>{cat.description}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{cat.count} aircraft</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
                        Browse <ArrowRight size={13} />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
