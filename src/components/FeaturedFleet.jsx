import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const FLEET = [
  {
    id: 'g700',
    name: 'Gulfstream G700',
    category: 'Ultra Long Range',
    range: '7,500 nm',
    speed: 'Mach 0.925',
    pax: '19 Passengers',
    price: 'From $12,500 / hr',
    image: '/jets/jet_g700.png',
    badge: 'FEATURED',
  },
  {
    id: 'global7500',
    name: 'Global 7500',
    category: 'Long Range',
    range: '7,700 nm',
    speed: 'Mach 0.925',
    pax: '17 Passengers',
    price: 'From $11,200 / hr',
    image: '/jets/jet_global7500.png',
    badge: 'POPULAR',
  },
  {
    id: 'falcon10x',
    name: 'Dassault Falcon 10X',
    category: 'Ultra Long Range',
    range: '7,500 nm',
    speed: 'Mach 0.925',
    pax: '16 Passengers',
    price: 'From $10,800 / hr',
    image: '/jets/jet_falcon10x.png',
    badge: 'NEW',
  },
];

function AircraftCard({ aircraft, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      style={{
        background: '#0e0e0e',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
    >
      {/* Wrap entire card in Link to aircraft details */}
      <Link to={`/aircraft/${aircraft.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {/* Image */}
        <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
          <img
            src={aircraft.image}
            alt={aircraft.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
          {/* Badge */}
          <div style={{
            position: 'absolute', top: 16, left: 16,
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6, padding: '4px 10px',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.14em',
            color: '#fff', fontFamily: "'Inter', sans-serif",
          }}>
            {aircraft.badge}
          </div>
          {/* Category */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
            padding: '28px 20px 14px',
          }}>
            <span style={{
              fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)',
              fontFamily: "'Inter', sans-serif", fontWeight: 600, textTransform: 'uppercase',
            }}>
              {aircraft.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px 24px 24px' }}>
          <h3 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 19, fontWeight: 700, color: '#fff',
            letterSpacing: '-0.02em', marginBottom: 16,
          }}>
            {aircraft.name}
          </h3>

          {/* Specs */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12, marginBottom: 20,
            paddingBottom: 20,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            {[
              { Icon: Globe, label: 'Range', val: aircraft.range },
              { Icon: Zap,   label: 'Speed', val: aircraft.speed },
              { Icon: Users, label: 'Cabin', val: aircraft.pax  },
            ].map(({ Icon, label, val }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <Icon size={13} color="rgba(255,255,255,0.3)" style={{ marginBottom: 4 }} />
                <div style={{
                  fontSize: 10, color: 'rgba(255,255,255,0.35)',
                  fontFamily: "'Inter', sans-serif", fontWeight: 500,
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3,
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize: 12, color: 'rgba(255,255,255,0.8)',
                  fontFamily: "'Inter', sans-serif", fontWeight: 600,
                }}>
                  {val}
                </div>
              </div>
            ))}
          </div>

          {/* Price + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                fontSize: 10, color: 'rgba(255,255,255,0.35)',
                fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em',
                textTransform: 'uppercase', marginBottom: 2,
              }}>
                Charter Rate
              </div>
              <div style={{
                fontSize: 15, fontWeight: 700, color: '#fff',
                fontFamily: "'Inter', sans-serif",
              }}>
                {aircraft.price}
              </div>
            </div>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#fff', color: '#000',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700, fontSize: 12,
                padding: '10px 18px', borderRadius: 10,
                letterSpacing: '0.02em',
              }}
            >
              Charter <ArrowRight size={13} strokeWidth={2.5} />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedFleet() {
  return (
    <section id="marketplace" style={{ background: '#080808', padding: '100px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 60 }}
        >
          <div style={{
            fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)',
            fontFamily: "'Inter', sans-serif", fontWeight: 600,
            textTransform: 'uppercase', marginBottom: 14,
          }}>
            — Featured Fleet
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800, color: '#fff',
              letterSpacing: '-0.03em', lineHeight: 1.1,
            }}>
              Curated for<br />Perfectionists
            </h2>
            <Link
              to="/aircraft"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13, fontWeight: 600,
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              View All Aircraft <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid-3col">
          {FLEET.map((aircraft, i) => (
            <AircraftCard key={aircraft.id} aircraft={aircraft} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
