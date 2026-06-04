import { motion } from 'framer-motion';
import { Search, CalendarCheck, Plane, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
  { num: '01', Icon: Search, title: 'Browse & Select', desc: 'Explore our curated fleet of ultra-premium aircraft. Filter by range, capacity, and cabin class to find your perfect match.' },
  { num: '02', Icon: CalendarCheck, title: 'Confirm & Book', desc: 'Secure your aircraft in minutes. Our concierge team handles every detail — catering, ground transport, customs clearance.' },
  { num: '03', Icon: Plane, title: 'Fly in Luxury', desc: 'Board at your convenience. No queues, no delays. Experience aerospace at its finest, entirely on your schedule.' },
];

export default function CharterSection() {
  return (
    <section id="charter" style={{ background: '#050505', padding: '100px 40px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter', sans-serif", fontWeight: 600, textTransform: 'uppercase', marginBottom: 14 }}>— How It Works</div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1 }}>Charter in Three<br />Simple Steps</h2>
        </motion.div>
        <div className="grid-3col" style={{ gap: 2, marginBottom: 64 }}>
          {STEPS.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: i * 0.13 }}
              style={{ padding: '48px 40px', background: i === 1 ? 'rgba(255,255,255,0.04)' : 'transparent', border: '1px solid', borderColor: i === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)', borderRadius: 20, position: 'relative' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 72, fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1, position: 'absolute', top: 20, right: 24 }}>{step.num}</div>
              <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.07)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <step.Icon size={20} color="rgba(255,255,255,0.7)" strokeWidth={1.6} />
              </div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>{step.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} style={{ textAlign: 'center' }}>
          <Link to="/aircraft" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#000', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', padding: '16px 36px', borderRadius: 50, textDecoration: 'none' }}>
            Request a Charter <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
