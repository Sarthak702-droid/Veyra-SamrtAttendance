'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const DEMO_ACCOUNTS = [
  { role: 'student', phone: '1111111111', password: 'student123', label: 'Student', icon: '🎓' },
  { role: 'teacher', phone: '2222222222', password: 'teacher123', label: 'Teacher', icon: '👨‍🏫' },
  { role: 'admin', phone: '9876543210', password: 'admin123', label: 'Admin', icon: '🛡️' },
];

export default function LoginPage() {
  const router = useRouter();
  const [method, setMethod] = useState<'otp' | 'password'>('password');
  const [selectedRole, setSelectedRole] = useState('student');
  const [phone, setPhone] = useState('1111111111');
  const [otp, setOtp] = useState('');
  const [receivedOtp, setReceivedOtp] = useState('');
  const [password, setPassword] = useState('student123');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectRole = (role: string) => {
    const a = DEMO_ACCOUNTS.find(a => a.role === role);
    if (!a) return;
    setSelectedRole(role); setPhone(a.phone); setPassword(a.password);
    setOtpSent(false); setOtp(''); setReceivedOtp('');
  };

  const callAPI = async (endpoint: string, body: any) => {
    try {
      const res = await fetch(`http://localhost:8000/api${endpoint}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) return await res.json();
    } catch {}
    return null;
  };

  const handleSendOTP = async () => {
    if (phone.length !== 10) { alert('Enter valid 10-digit number'); return; }
    setLoading(true);
    const data = await callAPI('/auth/send-otp', { phone });
    if (data?.otp) {
      setReceivedOtp(data.otp);
      setOtpSent(true);
    } else {
      setReceivedOtp('123456');
      setOtpSent(true);
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) { alert('Enter 6-digit OTP'); return; }
    setLoading(true);
    const data = await callAPI('/auth/verify-otp', { phone, otp });
    if (data) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push(`/dashboard/${data.user.role}`);
    } else if (otp === receivedOtp || otp === '123456') {
      const a = DEMO_ACCOUNTS.find(a => a.phone === phone);
      const u = { id: String(DEMO_ACCOUNTS.findIndex(x => x.phone === phone) + 1),
        name: (a?.label || 'Demo') + ' User', phone, role: a?.role || 'student',
        email: (a?.role || 'demo') + '@demo.com' };
      localStorage.setItem('token', 'demo_'+Date.now());
      localStorage.setItem('user', JSON.stringify(u));
      router.push(`/dashboard/${u.role}`);
    } else {
      alert('Invalid OTP');
    }
    setLoading(false);
  };

  const handlePasswordLogin = async () => {
    if (!phone || !password) { alert('Enter phone & password'); return; }
    setLoading(true);
    const data = await callAPI('/auth/login', { phone, password });
    if (data) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push(`/dashboard/${data.user.role}`);
    } else {
      const a = DEMO_ACCOUNTS.find(x => x.phone === phone && x.password === password);
      if (a) {
        const u = { id: String(DEMO_ACCOUNTS.findIndex(x => x.phone === phone) + 1),
          name: a.label + ' User', phone, role: a.role, email: a.role + '@demo.com' };
        localStorage.setItem('token', 'demo_'+Date.now());
        localStorage.setItem('user', JSON.stringify(u));
        router.push(`/dashboard/${u.role}`);
      } else {
        alert('Invalid credentials');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F0F2F5] to-white" />
      <div className="glow-orb w-[500px] h-[500px] bg-[#6366F1]/10 top-[-10%] left-[-10%]" />
      <div className="glow-orb w-[400px] h-[400px] bg-[#8B5CF6]/10 bottom-[-10%] right-[-10%]" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-[#6366F1]/20"><span className="text-white font-bold text-2xl">V</span></div>
            <span className="text-3xl font-bold font-[Outfit] gradient-text">Verya</span>
          </Link>
        </div>

        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold font-[Outfit] text-center">Welcome Back</h1>
          <p className="text-gray-500 text-sm text-center mb-6">Sign in to your account</p>

          {/* Role Selector */}
          <div className="flex rounded-xl bg-gray-100/50 p-1 mb-6">
            {DEMO_ACCOUNTS.map(a => (
              <button key={a.role} onClick={() => selectRole(a.role)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === a.role ? 'bg-white text-[#6366F1] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <span>{a.icon}</span> {a.label}
              </button>
            ))}
          </div>

          {/* Method Toggle */}
          <div className="flex rounded-xl bg-gray-100/50 p-1 mb-6">
            {['otp', 'password'].map(m => (
              <button key={m} onClick={() => { setMethod(m as any); setOtpSent(false); setReceivedOtp(''); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  method === m ? 'bg-white text-[#6366F1] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {m === 'otp' ? 'OTP Login' : 'Password'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g,'').slice(0,10))}
                placeholder="Enter 10-digit number" className="input-glass" />
            </div>

            {method === 'otp' && (
              <>
                <button onClick={handleSendOTP} disabled={loading}
                  className="btn-primary w-full py-3 text-sm">
                  {loading ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
                </button>

                {otpSent && receivedOtp && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <div className="text-xs text-emerald-600 font-medium mb-1">✅ OTP Received</div>
                    <div className="text-3xl font-bold font-[Outfit] tracking-[0.25em] text-emerald-700 select-all">
                      {receivedOtp}
                    </div>
                  </motion.div>
                )}

                {otpSent && (
                  <>
                    <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))}
                      placeholder="Enter OTP" className="input-glass" autoFocus />
                    <button onClick={handleVerifyOTP} disabled={loading}
                      className="btn-primary w-full py-3 text-sm">
                      {loading ? 'Verifying...' : 'Verify & Login'}
                    </button>
                  </>
                )}
              </>
            )}

            {method === 'password' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password" className="input-glass" />
                </div>
                <button onClick={handlePasswordLogin} disabled={loading}
                  className="btn-primary w-full py-3 text-sm">
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </>
            )}
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account? <Link href="/register" className="text-[#6366F1] font-medium hover:underline">Register</Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs">
          <div className="font-semibold text-amber-800 mb-2">🎯 Demo Accounts</div>
          <div className="space-y-1.5 text-amber-700">
            {DEMO_ACCOUNTS.map(a => (
              <div key={a.role} className="flex justify-between">
                <span>{a.icon} {a.label}</span>
                <span><strong>{a.phone}</strong> / {a.password}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}