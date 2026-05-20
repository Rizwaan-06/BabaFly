import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "BabaFly redefined what I thought private aviation could be. From booking to landing, every moment was flawless. The G700 they arranged was nothing short of extraordinary.",
    name: 'James Harrington',
    title: 'CEO, Harrington Capital Group',
    initials: 'JH',
  },
  {
    quote: "I've flown private for 15 years. BabaFly is on another level — the platform, the concierge, the aircraft. It's the only service I trust for intercontinental travel.",
    name: 'Sophia Laurent',
    title: 'Creative Director, Maison Laurent',
    initials: 'SL',
  },
  {
    quote: "Exceptional. The team sourced a Falcon 10X within 4 hours for an urgent deal in Geneva. The professionalism and speed were unmatched by any provider I've used.",
    name: 'Rajan Mehta',
    title: 'Managing Partner, Apex Ventures',
    initials: 'RM',
  },
];

export default function Testimonials() {
  return (
    <section
      style={{ background: '#080808', padding: '100px 40px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{
            fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)',
            fontFamily: "'Inter', sans-serif", fontWeight: 600,
            textTransform: 'uppercase', marginBottom: 14,
          }}>
            — Client Stories
          </div>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 800, color: '#fff',
            letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>
            Trusted by the World's<br />Most Discerning Travellers
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3 }}>
                {[...Array(5)].map((_, si) => (
                  <span key={si} style={{ color: '#fff', fontSize: 12 }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14, color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.75, flex: 1,
                fontStyle: 'italic',
              }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 42, height: 42,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700, fontSize: 13, color: '#fff',
                  flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14, fontWeight: 700, color: '#fff',
                    marginBottom: 2,
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12, color: 'rgba(255,255,255,0.35)',
                  }}>
                    {t.title}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
