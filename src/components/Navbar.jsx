import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { selectCartCount } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const NAV_LINKS = [
  { label: 'Marketplace', href: '/aircraft' },
  { label: 'Categories',  href: '/categories' },
  { label: 'Charter',     href: '/aircraft' },
  { label: 'Experience',  href: '/#experience' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [dropOpen, setDropOpen]   = useState(false);
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const location   = useLocation();
  const { isAuthenticated, user } = useSelector(s => s.auth);
  const cartCount  = useSelector(selectCartCount);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Signed out successfully.');
    navigate('/');
    setDropOpen(false);
  };

  const isHome = location.pathname === '/';

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 64,
        background: scrolled || !isHome ? 'rgba(8,8,8,0.95)' : 'rgba(0,0,0,0.18)',
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        borderBottom: scrolled || !isHome ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s',
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: '0.12em', color: '#fff', textDecoration: 'none', textTransform: 'uppercase' }}>
        BabaFly
      </Link>

      {/* Nav links — desktop */}
      <ul style={{ display: 'flex', gap: 36, listStyle: 'none', margin: 0, padding: 0 }}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <Link to={href}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
            >{label}</Link>
          </li>
        ))}
      </ul>

      {/* Icon actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Cart */}
        <Link to="/cart" style={{ position: 'relative', display: 'flex', color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>
          <ShoppingCart size={19} strokeWidth={1.8} />
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                style={{ position: 'absolute', top: -6, right: -7, background: '#fff', color: '#000', fontSize: 9, fontWeight: 800, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Wishlist */}
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', display: 'flex', padding: 0, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>
          <Heart size={19} strokeWidth={1.8} />
        </button>

        {/* User */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setDropOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', display: 'flex', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>
            <User size={19} strokeWidth={1.8} />
          </button>

          <AnimatePresence>
            {dropOpen && (
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
                style={{ position: 'absolute', top: 36, right: 0, background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, overflow: 'hidden', minWidth: 180, boxShadow: '0 16px 40px rgba(0,0,0,0.6)' }}>
                {isAuthenticated ? (
                  <>
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{user?.name ?? 'Traveller'}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{user?.email ?? ''}</div>
                    </div>
                    {[{ label: 'My Bookings', to: '/orders' }, { label: 'Cart', to: '/cart' }].map(({ label, to }) => (
                      <Link key={to} to={to} onClick={() => setDropOpen(false)}
                        style={{ display: 'block', padding: '12px 16px', fontSize: 13, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        {label}
                      </Link>
                    ))}
                    <button onClick={handleLogout}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', fontSize: 13, color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', borderTop: '1px solid rgba(255,255,255,0.07)', transition: 'background 0.15s', textAlign: 'left' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <LogOut size={13} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setDropOpen(false)}
                      style={{ display: 'block', padding: '13px 16px', fontSize: 13, color: '#fff', textDecoration: 'none', fontWeight: 600, textAlign: 'center' }}>
                      Sign In
                    </Link>
                    <Link to="/register" onClick={() => setDropOpen(false)}
                      style={{ display: 'block', padding: '13px 16px', fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                      Create Account
                    </Link>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
