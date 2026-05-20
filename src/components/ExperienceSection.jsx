import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import jetInterior from '../assets/images/jet_interior.png';

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      style={{ background: '#050505', padding: '100px 40px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
        }}>
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{
              borderRadius: 24,
              overflow: 'hidden',
              aspectRatio: '4/3',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <img
                src={jetInterior}
                alt="BabaFly cabin experience"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Floating Stat Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                position: 'absolute',
                bottom: -24,
                right: -24,
                background: 'rgba(14,14,14,0.92)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
                padding: '20px 28px',
              }}
            >
              <div style={{
                fontSize: 28, fontWeight: 800, color: '#fff',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '-0.03em', lineHeight: 1,
                marginBottom: 4,
              }}>
                40,000 ft
              </div>
              <div style={{
                fontSize: 11, color: 'rgba(255,255,255,0.4)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500, letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                Above the ordinary
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)',
              fontFamily: "'Inter', sans-serif", fontWeight: 600,
              textTransform: 'uppercase', marginBottom: 20,
            }}>
              — The Experience
            </div>

            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(30px, 3.5vw, 44px)',
              fontWeight: 800, color: '#fff',
              letterSpacing: '-0.03em',
              lineHeight: 1.1, marginBottom: 24,
            }}>
              Where Precision<br />Meets Serenity
            </h2>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15, color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.8, marginBottom: 16,
            }}>
              Step aboard and leave the world behind. Our fleet is curated for those who demand only the finest — from bespoke cabin interiors to Michelin-level in-flight dining.
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15, color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.8, marginBottom: 40,
            }}>
              Every detail is orchestrated with obsessive precision. Because at BabaFly, the journey is as extraordinary as the destination.
            </p>

            {/* Feature Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 44 }}>
              {[
                'Bespoke cabin configuration on request',
                'Michelin-standard in-flight catering',
                'Private FBO access at 3,000+ airports',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.5)',
                    marginTop: 7, flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14, color: 'rgba(255,255,255,0.6)',
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/aircraft"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700, fontSize: 13,
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '14px 32px', borderRadius: 50,
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
            >
              Discover the Experience <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
