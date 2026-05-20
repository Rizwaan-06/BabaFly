import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroVideo from '../assets/videos/vp2home.mp4';

export default function Hero() {
  const videoRef = useRef(null);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 600,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Video Background ─────────────────────────── */}
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* ── Dark Gradient Overlay ─────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.62) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero Content ─────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(48px, 7vw, 86px)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            marginBottom: 20,
          }}
        >
          Elevated Excellence
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(13px, 1.8vw, 16px)',
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.65,
            maxWidth: 520,
            marginBottom: 40,
            letterSpacing: '0.01em',
          }}
        >
          Discover a curated marketplace of luxury aviation. Where technical precision
          meets aesthetic elegance at 40,000 feet.
        </motion.p>

        {/* CTA Button — Links to /aircraft listing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
        >
          <Link
            to="/aircraft"
            id="hero-explore-fleet"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff',
              color: '#000',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '16px 42px',
              borderRadius: 50,
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            Explore Fleet
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.45)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 36,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
