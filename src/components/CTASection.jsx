import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      style={{
        background: '#050505',
        padding: '100px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 400,
        background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 640,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{
            fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)',
            fontFamily: "'Inter', sans-serif", fontWeight: 600,
            textTransform: 'uppercase', marginBottom: 20,
          }}>
            — Ready to Fly?
          </div>

          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '-0.04em',
            lineHeight: 1.05, marginBottom: 20,
          }}>
            Your Next Journey<br />Starts Here
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15, color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.7, marginBottom: 44,
          }}>
            Join thousands of discerning travellers. Get exclusive access to our fleet, private deals, and concierge priority — delivered to your inbox.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                gap: 0,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 50,
                padding: '6px 6px 6px 24px',
                maxWidth: 480, margin: '0 auto',
              }}
            >
              <input
                type="email"
                id="cta-email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  caretColor: '#fff',
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: '#fff', color: '#000',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700, fontSize: 13,
                  padding: '12px 24px',
                  borderRadius: 44, border: 'none',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                Get Access <ArrowRight size={14} strokeWidth={2.5} />
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 16, padding: '20px 32px',
                fontFamily: "'Inter', sans-serif",
                fontSize: 15, color: 'rgba(255,255,255,0.7)',
              }}
            >
              ✓ You're on the list. Welcome to BabaFly.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
