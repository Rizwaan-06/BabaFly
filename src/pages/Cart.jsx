import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQty, selectCartTotal } from '../redux/cartSlice';
import toast from 'react-hot-toast';

export default function Cart() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const items     = useSelector(s => s.cart.items);
  const subtotal  = useSelector(selectCartTotal);
  const taxes     = Math.round(subtotal * 0.05);
  const total     = subtotal + taxes;

  if (items.length === 0) return (
    <div style={{ minHeight: '100vh', background: '#080808', paddingTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <ShoppingCart size={56} color="rgba(255,255,255,0.15)" />
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Your cart is empty</h2>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Add an aircraft to start your charter journey.</p>
      <Link to="/aircraft" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#000', fontWeight: 700, fontSize: 13, padding: '13px 28px', borderRadius: 50, textDecoration: 'none' }}>
        Browse Fleet <ArrowRight size={14} />
      </Link>
    </div>
  );

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 40px' }}>
        <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 8 }}>Charter Selection</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>{items.length} aircraft in your selection</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }}>
          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {items.map(item => (
              <motion.div key={item.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '20px 22px', display: 'flex', gap: 20, alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: 110, height: 76, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>{item.manufacturer} • Tail: {item.tail} • {item.seats} seats</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: '#1a1a1a', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                      <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))}
                        style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}>
                        <Minus size={12} />
                      </button>
                      <span style={{ width: 28, textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#fff' }}>{item.qty}</span>
                      <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}
                        style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}>
                        <Plus size={12} />
                      </button>
                    </div>
                    <button onClick={() => { dispatch(removeFromCart(item.id)); toast.success('Removed from selection.'); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,68,68,0.7)', fontSize: 12 }}>
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>${(item.charterRate * item.qty).toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>/hr × {item.qty}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ position: 'sticky', top: 90 }}>
            <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '28px' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Order Summary</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Subtotal</span>
                  <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>${subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Taxes & Fees (5%)</span>
                  <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>${taxes.toLocaleString()}</span>
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 18, display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Total</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>${total.toLocaleString()}</span>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/checkout')}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: '#000', fontWeight: 700, fontSize: 14, padding: '15px', borderRadius: 12, border: 'none', cursor: 'pointer', marginBottom: 12 }}>
                Proceed to Checkout <ArrowRight size={15} strokeWidth={2.5} />
              </motion.button>
              <Link to="/aircraft" style={{ display: 'block', textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>← Continue browsing</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
