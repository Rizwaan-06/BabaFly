import { motion } from 'framer-motion';

export function Skeleton({ w = '100%', h = 20, r = 8, style = {} }) {
  return (
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{ width: w, height: h, borderRadius: r, background: 'rgba(255,255,255,0.06)', ...style }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div style={{ background: '#0e0e0e', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
      <Skeleton w="100%" h={260} r={0} />
      <div style={{ padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Skeleton w="70%" h={22} />
        <Skeleton w="50%" h={14} />
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Skeleton w="33%" h={44} r={8} />
          <Skeleton w="33%" h={44} r={8} />
          <Skeleton w="33%" h={44} r={8} />
        </div>
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#fff', borderRadius: '50%' }}
      />
    </div>
  );
}

export function StarRating({ rating = 0, count = 0, size = 13 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= Math.round(rating) ? '#fbbf24' : 'rgba(255,255,255,0.15)' }}>★</span>
      ))}
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 4, fontWeight: 600 }}>{rating}</span>
      {count > 0 && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>({count})</span>}
    </div>
  );
}
