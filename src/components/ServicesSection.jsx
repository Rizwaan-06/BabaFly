import { motion } from 'framer-motion';
import { Shield, Headphones, Award, Globe } from 'lucide-react';

const SERVICES = [
  {
    Icon: Globe,
    title: 'Private Charter',
    desc: 'On-demand access to 500+ ultra-premium aircraft across 40+ countries. Your schedule, your route.',
    tag: 'Most Popular',
  },
  {
    Icon: Award,
    title: 'Aircraft Sales',
    desc: 'Buy or sell pre-owned and new-build jets with full inspection, certification, and delivery support.',
    tag: null,
  },
  {
    Icon: Shield,
    title: 'Maintenance & MRO',
    desc: 'World-class MRO partners ensuring airworthiness, compliance, and operational readiness at all times.',
    tag: null,
  },
  {
    Icon: Headphones,
    title: 'VIP Concierge',
    desc: '24/7 white-glove concierge for in-flight catering, hotel, ground transport, and border facilitation.',
    tag: null,
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{ background: '#080808', padding: '100px 40px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 64 }}
        >
          <div style={{
            fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)',
            fontFamily: "'Inter', sans-serif", fontWeight: 600,
            textTransform: 'uppercase', marginBottom: 14,
          }}>
            — Our Services
          </div>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 800, color: '#fff',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            maxWidth: 480,
          }}>
            Everything Aviation,<br />Under One Roof
          </h2>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
        }}>
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ borderColor: 'rgba(255,255,255,0.18)', y: -4 }}
              style={{
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
                padding: '40px 40px',
                display: 'flex',
                gap: 24,
                cursor: 'default',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
            >
              {/* Icon */}
              <div style={{
                width: 52, height: 52, flexShrink: 0,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svc.Icon size={22} color="rgba(255,255,255,0.65)" strokeWidth={1.5} />
              </div>

              {/* Text */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 17, fontWeight: 700, color: '#fff',
                    letterSpacing: '-0.02em',
                  }}>
                    {svc.title}
                  </h3>
                  {svc.tag && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
                      color: '#000', background: '#fff',
                      borderRadius: 4, padding: '3px 8px',
                      fontFamily: "'Inter', sans-serif",
                      textTransform: 'uppercase',
                    }}>
                      {svc.tag}
                    </span>
                  )}
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14, color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.7,
                }}>
                  {svc.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
