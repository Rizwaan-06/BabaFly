import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 500,  suffix: '+', label: 'Aircraft Listed'   },
  { value: 40,   suffix: '+', label: 'Countries Served'  },
  { value: 10000,suffix: '+', label: 'Flights Completed' },
  { value: 24,   suffix: '/7', label: 'Concierge Support' },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '52px 40px',
      }}
    >
      <div className="grid-4col" style={{ maxWidth: 1100, margin: '0 auto' }}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{
              textAlign: 'center',
              padding: '0 24px',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(36px, 4vw, 52px)',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: 10,
              }}
            >
              <Counter target={stat.value} suffix={stat.suffix} />
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
