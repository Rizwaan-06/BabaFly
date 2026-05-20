import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import toast from 'react-hot-toast';

import { loginSchema, registerSchema } from '../utils/loginSchema';
import loginImg from '../assets/images/login.png';

/* ── Inline SVG Icons ─────────────────────────────── */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
    <path d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
    <path d="M6.306 14.691l6.571 4.819C14.655 15.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
    <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.311 0-9.818-3.604-11.283-8.504l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
    <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

/* ── Reusable Field ───────────────────────────────── */
function Field({ id, label, type = 'text', placeholder, reg, error, leftIcon, rightEl, rightLabel }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-200">
            {label}
          </label>
        )}
        {rightLabel && rightLabel}
      </div>
      <div className={`flex items-center rounded-xl border transition-all duration-200 ${
        error
          ? 'border-red-500/60 bg-[#1a1a1a]'
          : 'border-white/[0.12] bg-[#1a1a1a] focus-within:border-white/30 focus-within:bg-[#202020]'
      }`}>
        {leftIcon && (
          <span className="pl-4 text-gray-500 flex-shrink-0">{leftIcon}</span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...reg}
          className="w-full bg-transparent text-white text-sm py-3.5 px-3.5 outline-none placeholder:text-gray-600 caret-white"
        />
        {rightEl && (
          <span className="pr-4 flex-shrink-0">{rightEl}</span>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

/* ── Animation variants ───────────────────────────── */
const pageVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};
const leftVariants = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const rightVariants = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const formVariants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

/* ════════════════════════════════════════════════════
   LOGIN PAGE
════════════════════════════════════════════════════ */
export default function Login() {
  const [tab,          setTab]          = useState('signin');
  const [showPass,     setShowPass]     = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const isSignIn = tab === 'signin';

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(isSignIn ? loginSchema : registerSchema),
    mode: 'onTouched',
  });

  const switchTab = (t) => { setTab(t); reset(); };

  const onSubmit  = async (data) => {
    await new Promise((r) => setTimeout(r, 900));
    // Mock authentication — dispatch to Redux
    dispatch(setCredentials({
      user:  { name: data.name || data.email.split('@')[0], email: data.email },
      token: 'mock-jwt-' + Date.now(),
    }));
    toast.success(isSignIn ? 'Welcome back to BabaFly!' : 'Account created! Welcome to BabaFly.');
    navigate('/');
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      style={{ minHeight: 'calc(100vh - 64px)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080808', padding: '48px 24px' }}
    >
      {/* ── Card shell ─────────────────────────────── */}
      <div
        className="w-full flex flex-col md:flex-row overflow-hidden"
        style={{
          maxWidth: 900,
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
          minHeight: 560,
        }}
      >
        {/* ══════════════════════════════════════════
            LEFT — aircraft image
        ══════════════════════════════════════════ */}
        <motion.div
          variants={leftVariants}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden flex-shrink-0 hidden md:block"
          style={{ width: '46%', minHeight: 560 }}
        >
          <img
            src={loginImg}
            alt="BabaFly jet"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* overlays */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.08) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)' }} />

          {/* brand */}
          <div className="absolute bottom-0 left-0" style={{ padding: '36px 40px' }}>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              style={{ fontSize: 42, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.5px', marginBottom: 10 }}
            >
              BabaFly
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.6 }}
              style={{ color: '#b0b0b0', fontSize: 13, lineHeight: 1.6, maxWidth: 210 }}
            >
              Elevated excellence. Experience the pinnacle of modern aerospace travel.
            </motion.p>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            RIGHT — auth form
        ══════════════════════════════════════════ */}
        <motion.div
          variants={rightVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col"
          style={{ background: '#0d0d0d', padding: '48px 52px' }}
        >
          {/* Heading */}
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px', marginBottom: 8 }}>
              Access Portal
            </h2>
            <p style={{ fontSize: 14, color: '#777', lineHeight: 1.55 }}>
              Enter your credentials to manage your charter or<br />discover the marketplace.
            </p>
          </div>

          {/* ── Tabs ───────────────────────────────── */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.09)', marginBottom: 28 }}>
            {[['signin', 'Sign In'], ['register', 'Register']].map(([key, label]) => (
              <button
                key={key}
                id={`tab-${key}`}
                onClick={() => switchTab(key)}
                style={{
                  position: 'relative',
                  paddingBottom: 12,
                  marginRight: 32,
                  fontSize: 14,
                  fontWeight: 600,
                  color: tab === key ? '#fff' : '#555',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
              >
                {label}
                {tab === key && (
                  <motion.span
                    layoutId="tab-line"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: '#fff',
                      borderRadius: 2,
                    }}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* ── Form ───────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.form
              key={tab}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              {/* name — register only */}
              {!isSignIn && (
                <Field
                  id="name"
                  label="Full Name"
                  placeholder="John Doe"
                  reg={register('name')}
                  error={errors.name?.message}
                  leftIcon={<User size={16} />}
                />
              )}

              {/* Email */}
              <Field
                id="email"
                label="Email Address"
                type="email"
                placeholder="name@domain.com"
                reg={register('email')}
                error={errors.email?.message}
                leftIcon={<Mail size={16} />}
              />

              {/* Password */}
              <Field
                id="password"
                label="Password"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                reg={register('password')}
                error={errors.password?.message}
                leftIcon={<Lock size={16} />}
                rightLabel={
                  isSignIn && (
                    <button
                      type="button"
                      style={{ fontSize: 13, color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}
                      onMouseEnter={e => e.target.style.color = '#fff'}
                      onMouseLeave={e => e.target.style.color = '#888'}
                    >
                      Forgot?
                    </button>
                  )
                }
                rightEl={
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    aria-label="Toggle password visibility"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', display: 'flex', alignItems: 'center' }}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />

              {/* Confirm — register only */}
              {!isSignIn && (
                <Field
                  id="confirmPassword"
                  label="Confirm Password"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  reg={register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                  leftIcon={<Lock size={16} />}
                  rightEl={
                    <button
                      type="button"
                      onClick={() => setShowConfirm(v => !v)}
                      aria-label="Toggle confirm password"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', display: 'flex', alignItems: 'center' }}
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
              )}

              {/* Authenticate button */}
              <motion.button
                whileHover={{ scale: 1.012 }}
                whileTap={{ scale: 0.988 }}
                type="submit"
                id="btn-authenticate"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: '#fff',
                  color: '#000',
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: '0.02em',
                  padding: '15px 0',
                  borderRadius: 12,
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.6 : 1,
                  marginTop: 4,
                }}
              >
                {isSubmitting ? (
                  <span style={{
                    width: 16, height: 16,
                    border: '2px solid rgba(0,0,0,0.2)',
                    borderTopColor: '#000',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.7s linear infinite',
                  }} />
                ) : (
                  <>Authenticate <ArrowRight size={16} strokeWidth={2.5} /></>
                )}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          {/* ── Divider ────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.16em', color: '#555', fontWeight: 600 }}>
              OR CONTINUE WITH
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* ── Social buttons ─────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Google', Icon: GoogleIcon, id: 'btn-google' },
              { label: 'Apple',  Icon: AppleIcon,  id: 'btn-apple'  },
            ].map(({ label, Icon, id }) => (
              <motion.button
                key={label}
                id={id}
                type="button"
                whileHover={{ backgroundColor: '#222' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  background: '#181818',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  padding: '13px 0',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#ccc',
                  cursor: 'pointer',
                }}
              >
                <Icon />{label}
              </motion.button>
            ))}
          </div>

          {/* ── Footer ─────────────────────────────── */}
          <p style={{ textAlign: 'center', fontSize: 11, color: '#444', marginTop: 24, lineHeight: 1.6 }}>
            By authenticating, you agree to BabaFly's{' '}
            <span style={{ color: '#888', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}>
              Terms of Service
            </span>
            {' '}&{' '}
            <span style={{ color: '#888', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}>
              Privacy Policy
            </span>
            .
          </p>
        </motion.div>
        {/* end right */}

      </div>
      {/* end card */}

      {/* spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
}
