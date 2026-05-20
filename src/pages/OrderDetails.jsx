import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plane, MapPin, Clock, Users, CreditCard } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById, clearCurrentOrder } from '../redux/ordersSlice';
import { PageLoader } from '../components/UI';

const STATUS_COLORS = { confirmed: '#22c55e', completed: '#3b82f6', pending: '#f59e0b', cancelled: '#ef4444' };

export default function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current: order, loading, error } = useSelector(s => s.orders);

  useEffect(() => {
    dispatch(fetchOrderById(id));
    return () => dispatch(clearCurrentOrder());
  }, [id, dispatch]);

  if (loading || !order) return <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 80 }}><PageLoader /></div>;
  if (error) return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#ef4444', fontSize: 16, marginBottom: 20 }}>{error}</p>
      <Link to="/orders" style={{ color: '#fff', fontWeight: 700, background: '#1a1a1a', padding: '12px 24px', borderRadius: 10, textDecoration: 'none' }}>Back to Orders</Link>
    </div>
  );

  const statusColor = STATUS_COLORS[order.status] || '#888';

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 40px' }}>
        {/* Header */}
        <Link to="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, textDecoration: 'none', marginBottom: 32 }}>
          <ArrowLeft size={14} /> Back to Orders
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>Order {order.id}</h1>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: statusColor, background: `${statusColor}20`, padding: '4px 12px', borderRadius: 6 }}>{order.status}</span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>Placed on {order.date}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          {/* Flight Info */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '28px' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>Flight Details</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, marginBottom: 28 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#fff' }}>{order.from || 'LHR'}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{order.fromCity || 'London'}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <Plane size={16} color="rgba(255,255,255,0.3)" />
                <div style={{ width: 80, height: 1, background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{order.flightTime || 'N/A'}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#fff' }}>{order.to || 'DXB'}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{order.toCity || 'Dubai'}</div>
              </div>
            </div>
            {[
              { icon: Plane, label: 'Aircraft', val: order.aircraft },
              { icon: Clock, label: 'Flight Time', val: order.flightTime || 'N/A' },
              { icon: Users, label: 'Passengers', val: order.passengers || 'N/A' },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                <Icon size={15} color="rgba(255,255,255,0.35)" />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', flex: 1 }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{val}</span>
              </div>
            ))}
          </motion.div>

          {/* Passenger & Payment */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '28px' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>Booking Details</h3>
            {[
              { icon: Users, label: 'Passenger', val: order.passengerName || 'N/A' },
              { icon: MapPin, label: 'Address', val: order.address || 'N/A' },
              { icon: CreditCard, label: 'Payment', val: order.paymentMethod || 'N/A' },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                <Icon size={15} color="rgba(255,255,255,0.35)" />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', flex: 1 }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', textAlign: 'right', maxWidth: 180 }}>{val}</span>
              </div>
            ))}

            {/* Total */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 20, paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Total Paid</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>${order.total?.toLocaleString()}</span>
            </div>
          </motion.div>
        </div>

        {/* Aircraft preview */}
        {order.aircraftData && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link to={`/aircraft/${order.aircraftId}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '20px', display: 'flex', gap: 20, alignItems: 'center', transition: 'border-color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
                <img src={order.aircraftData.image} alt={order.aircraft} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 12 }} />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{order.aircraft}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{order.aircraftData.manufacturer} • {order.aircraftData.class} • ${order.aircraftData.charterRate.toLocaleString()}/hr</div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
