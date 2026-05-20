import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plane, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/ordersSlice';
import { PageLoader, Skeleton } from '../components/UI';

const STATUS_COLORS = { confirmed: '#22c55e', completed: '#3b82f6', pending: '#f59e0b', cancelled: '#ef4444' };

export default function Orders() {
  const dispatch = useDispatch();
  const { user } = useSelector(s => s.auth);
  const { items: orders, loading } = useSelector(s => s.orders);

  useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

  if (loading) return <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 80 }}><PageLoader /></div>;

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 40px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 14 }}>— My Account</div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 8 }}>My Bookings</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Welcome back, {user?.name || 'traveller'}. Here are your charter reservations.</p>
        </motion.div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Plane size={48} color="rgba(255,255,255,0.12)" style={{ marginBottom: 16 }} />
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, marginBottom: 20 }}>No bookings yet.</p>
            <Link to="/aircraft" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#000', fontWeight: 700, fontSize: 13, padding: '13px 28px', borderRadius: 50, textDecoration: 'none' }}>
              Browse Fleet <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {orders.map((o, i) => {
              const statusColor = STATUS_COLORS[o.status] || '#888';
              return (
                <motion.div key={o.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Plane size={20} color="rgba(255,255,255,0.3)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{o.aircraft}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: statusColor, background: `${statusColor}20`, padding: '3px 10px', borderRadius: 5 }}>{o.status}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{o.route} · {o.date} · {o.id}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 6 }}>${o.total?.toLocaleString()}</div>
                    <Link to={`/orders/${o.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '6px 14px', textDecoration: 'none', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}>
                      View Details <ArrowRight size={11} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
