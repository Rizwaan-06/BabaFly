import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../redux/authSlice';
import toast from 'react-hot-toast';
import loginImg from '../assets/images/login.png';

const schema = yup.object({
  name:     yup.string().min(2, 'Name too short').required('Full name is required'),
  email:    yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Min 8 characters').required('Password is required'),
  confirm:  yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Please confirm your password'),
});

function Field({ id, label, type = 'text', placeholder, reg, error, leftIcon, rightEl }) {
  return (
    <div>
      {label && <label htmlFor={id} style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#ccc', marginBottom: 8 }}>{label}</label>}
      <div style={{ display: 'flex', alignItems: 'center', background: '#1a1a1a', border: `1px solid ${error ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 12, transition: 'border-color 0.2s' }}>
        {leftIcon && <span style={{ paddingLeft: 14, color: '#555', flexShrink: 0 }}>{leftIcon}</span>}
        <input id={id} type={type} placeholder={placeholder} {...reg}
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: 14, padding: '13px 14px', caretColor: '#fff' }} />
        {rightEl && <span style={{ paddingRight: 14, flexShrink: 0 }}>{rightEl}</span>}
      </div>
      {error && <p style={{ marginTop: 6, fontSize: 12, color: '#f87171' }}>{error}</p>}
    </div>
  );
}

export default function Register() {
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema), mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 800));
    // Simulate successful registration
    dispatch(setCredentials({ user: { name: data.name, email: data.email }, token: 'mock-jwt-token-' + Date.now() }));
    toast.success('Account created! Welcome to BabaFly.');
    navigate('/');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080808', padding: '48px 24px' }}>
      <div style={{ width: '100%', maxWidth: 900, display: 'flex', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 32px 80px rgba(0,0,0,0.8)' }}>

        {/* Left image */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
          style={{ width: '46%', position: 'relative', minHeight: 560, flexShrink: 0 }}>
          <img src={loginImg} alt="BabaFly" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 36, left: 40 }}>
            <h1 style={{ fontSize: 38, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 10 }}>BabaFly</h1>
            <p style={{ color: '#aaa', fontSize: 13, maxWidth: 200, lineHeight: 1.6 }}>Join the world's most exclusive aviation platform.</p>
          </div>
        </motion.div>

        {/* Right form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }}
          style={{ flex: 1, background: '#0d0d0d', padding: '48px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.02em' }}>Create Account</h2>
          <p style={{ fontSize: 14, color: '#666', marginBottom: 28 }}>Start your journey with BabaFly today.</p>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }} noValidate>
            <Field id="name" label="Full Name" placeholder="Alexander Sterling" reg={register('name')} error={errors.name?.message} leftIcon={<User size={15} />} />
            <Field id="email" label="Email Address" type="email" placeholder="name@domain.com" reg={register('email')} error={errors.email?.message} leftIcon={<Mail size={15} />} />
            <Field id="password" label="Password" type={showPass ? 'text' : 'password'} placeholder="••••••••" reg={register('password')} error={errors.password?.message}
              leftIcon={<Lock size={15} />}
              rightEl={<button type="button" onClick={() => setShowPass(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', display: 'flex' }}>{showPass ? <EyeOff size={15} /> : <Eye size={15} />}</button>} />
            <Field id="confirm" label="Confirm Password" type={showConfirm ? 'text' : 'password'} placeholder="••••••••" reg={register('confirm')} error={errors.confirm?.message}
              leftIcon={<Lock size={15} />}
              rightEl={<button type="button" onClick={() => setShowConfirm(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', display: 'flex' }}>{showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}</button>} />

            <motion.button whileHover={{ scale: 1.012 }} whileTap={{ scale: 0.988 }} type="submit" disabled={isSubmitting}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: '#000', fontWeight: 700, fontSize: 14, padding: '14px', borderRadius: 12, border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.6 : 1, marginTop: 4 }}>
              {isSubmitting ? 'Creating Account…' : <><span>Create Account</span><ArrowRight size={15} strokeWidth={2.5} /></>}
            </motion.button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#555', marginTop: 24 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
