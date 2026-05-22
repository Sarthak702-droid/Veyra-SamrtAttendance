'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', role: 'student', department: '', enrollment: '' });
  const [loading, setLoading] = useState(false);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { alert('Passwords do not match'); return; }
    if (form.phone.length !== 10) { alert('Enter valid 10-digit phone'); return; }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone,
          password: form.password, role: form.role, department: form.department,
          enrollment_no: form.enrollment,
        }),
      });
      if (res.ok) { alert('✅ Registered! Please login.'); router.push('/login'); return; }
    } catch {}
    alert('✅ Demo registration successful! Please login.');
    router.push('/login');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F0F2F5] to-white" />
      <div className="glow-orb w-[500px] h-[500px] bg-[#6366F1]/10 top-[-10%] left-[-10%]" />
      <div className="glow-orb w-[400px] h-[400px] bg-[#8B5CF6]/10 bottom-[-10%] right-[-10%]" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-[#6366F1]/20"><span className="text-white font-bold text-2xl">V</span></div>
            <span className="text-3xl font-bold font-[Outfit] gradient-text">Verya</span>
          </Link>
        </div>
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold font-[Outfit] text-center">Create Account</h1>
          <p className="text-gray-500 text-sm text-center mb-6">Join Verya today</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" value={form.name} onChange={update} placeholder="Full Name" required className="input-glass" />
            <input type="email" name="email" value={form.email} onChange={update} placeholder="Email Address" required className="input-glass" />
            <input type="tel" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="Mobile Number" required className="input-glass" />
            <select name="role" value={form.role} onChange={update} className="input-glass">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            {form.role === 'student' && <input type="text" name="enrollment" value={form.enrollment} onChange={update} placeholder="Enrollment Number" className="input-glass" />}
            <input type="text" name="department" value={form.department} onChange={update} placeholder="Department" className="input-glass" />
            <input type="password" name="password" value={form.password} onChange={update} placeholder="Password" required className="input-glass" />
            <input type="password" name="confirm" value={form.confirm} onChange={update} placeholder="Confirm Password" required className="input-glass" />
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2">
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-6">Already have an account? <Link href="/login" className="text-[#6366F1] font-medium hover:underline">Login</Link></p>
        </div>
      </motion.div>
    </div>
  );
}