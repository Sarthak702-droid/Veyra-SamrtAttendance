'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

type User = { id: string; name: string; phone: string; role: string; email: string };

const revenueData = [
  { month: 'Jan', revenue: 85000, users: 520 },
  { month: 'Feb', revenue: 92000, users: 580 },
  { month: 'Mar', revenue: 105000, users: 640 },
  { month: 'Apr', revenue: 118000, users: 720 },
  { month: 'May', revenue: 135000, users: 810 },
  { month: 'Jun', revenue: 142000, users: 890 },
];

const planData = [
  { name: 'Enterprise', value: 12, color: '#8B5CF6' },
  { name: 'Pro', value: 18, color: '#6366F1' },
  { name: 'Basic', value: 22, color: '#06B6D4' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (!raw) { router.push('/login'); return; }
    try { setUser(JSON.parse(raw)); } catch { router.push('/login'); }
  }, [router]);

  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); router.push('/login'); };
  if (!user) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#6366F1]/20 border-t-[#6366F1] rounded-full animate-spin" /></div>;

  const nav = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'users', label: 'Users', icon: '👥' },
    { key: 'institutions', label: 'Institutions', icon: '🏛️' },
    { key: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const sidebar = (
    <aside className="dashboard-sidebar glass-dark text-white flex flex-col">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg"><span className="text-white font-bold">V</span></div>
        <div><div className="font-bold font-[Outfit]">Verya</div><div className="text-[10px] text-white/50">Admin Panel</div></div>
      </div>
      <nav className="flex-1 space-y-1">
        {nav.map(n => (
          <button key={n.key} onClick={() => setTab(n.key)}
            className={`nav-link w-full text-sm ${tab === n.key ? 'active !text-white !bg-white/10' : '!text-white/60 hover:!text-white hover:!bg-white/5'}`}>
            <span>{n.icon}</span><span>{n.label}</span>
          </button>
        ))}
      </nav>
      <button onClick={logout} className="nav-link w-full text-sm !text-white/40 hover:!text-white hover:!bg-white/5 mt-auto">🚪 Logout</button>
    </aside>
  );

  return (
    <div className="dashboard-layout">
      {sidebar}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1 className="text-2xl font-bold font-[Outfit]">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Full platform control &amp; analytics.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-purple-50 text-purple-700 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" /> Admin
            </div>
            <div className="avatar">{user.name.charAt(0)}</div>
          </div>
        </div>
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Users', value: '1,247', icon: '👥', change: '+48 this month', color: '#6366F1' },
                  { label: 'Active Institutions', value: '52', icon: '🏛️', change: '+5 this quarter', color: '#8B5CF6' },
                  { label: 'Attendance Today', value: '94.2%', icon: '📊', change: '+1.8% vs yesterday', color: '#06B6D4' },
                  { label: 'Revenue (MRR)', value: '₹1.42L', icon: '💰', change: '+12% growth', color: '#10B981' },
                ].map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="glass-card p-5">
                    <div className="flex items-center gap-3 mb-3"><div className="text-2xl">{m.icon}</div><div className="text-xs text-gray-500 uppercase tracking-wider">{m.label}</div></div>
                    <div className="text-2xl font-bold font-[Outfit]">{m.value}</div>
                    <div className="text-xs text-emerald-600 mt-1">{m.change}</div>
                  </motion.div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="font-semibold font-[Outfit] mb-4">💰 Revenue Growth</h3>
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={revenueData}>
                      <defs><linearGradient id="revGrad"><stop offset="0%" stopColor="#10B981" stopOpacity={0.3}/><stop offset="100%" stopColor="#10B981" stopOpacity={0}/></linearGradient></defs>
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} formatter={(v: any) => [`₹${Number(v).toLocaleString()}`, 'Revenue']} />
                      <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fill="url(#revGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-semibold font-[Outfit] mb-4">📊 Plan Distribution</h3>
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie data={planData} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                        {planData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="font-semibold font-[Outfit] mb-4">📈 Platform Overview</h3>
                  <div className="space-y-4">
                    {[
                      { l: 'Active Students', v: '1,024', p: 85 },
                      { l: 'Active Teachers', v: '186', p: 60 },
                      { l: 'Active Admins', v: '37', p: 40 },
                      { l: 'Total Classes Today', v: '143', p: 75 },
                    ].map((s, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1"><span>{s.l}</span><span className="font-semibold">{s.v}</span></div>
                        <div className="h-2.5 rounded-full bg-gray-100"><div className="h-2.5 rounded-full gradient-primary transition-all" style={{ width: `${s.p}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-semibold font-[Outfit] mb-4">📋 Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { icon: '🏛️', text: 'New institution: Delhi Public School', time: '5 min ago' },
                      { icon: '👤', text: 'Teacher created: Ananya Verma', time: '1 hr ago' },
                      { icon: '📊', text: 'Monthly report for 52 institutions', time: '3 hrs ago' },
                      { icon: '💰', text: 'Payment: ₹24,999 from St. Mary\'s', time: '5 hrs ago' },
                    ].map((a, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50">
                        <div className="w-8 h-8 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-sm">{a.icon}</div>
                        <div><div className="text-sm">{a.text}</div><div className="text-xs text-gray-500">{a.time}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'users' && (
            <div className="glass-card p-6 overflow-x-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold font-[Outfit]">👥 User Management</h3>
                <button className="btn-primary text-sm px-4 py-2">+ Add User</button>
              </div>
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { role: 'Students', count: 1024 },
                    { role: 'Teachers', count: 186 },
                    { role: 'Admins', count: 37 },
                  ]}>
                    <XAxis dataKey="role" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <table className="table-glass">
                <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th></th></tr></thead>
                <tbody>
                  {[
                    { n: 'Admin User', e: 'admin@verya.com', r: 'Admin', s: 'Active', j: 'Jan 2026' },
                    { n: 'Ananya Verma', e: 'ananya@school.com', r: 'Teacher', s: 'Active', j: 'Mar 2026' },
                    { n: 'Aarav Sharma', e: 'aarav@student.com', r: 'Student', s: 'Active', j: 'Feb 2026' },
                    { n: 'Priya Patel', e: 'priya@student.com', r: 'Student', s: 'Active', j: 'Feb 2026' },
                  ].map((u, i) => (
                    <tr key={i}>
                      <td className="font-medium">{u.n}</td>
                      <td className="text-gray-500 text-sm">{u.e}</td>
                      <td><span className={`badge ${u.r === 'Admin' ? 'badge-purple' : u.r === 'Teacher' ? 'badge-blue' : 'badge-green'}`}>{u.r}</span></td>
                      <td><span className="badge badge-green">{u.s}</span></td>
                      <td className="text-gray-500 text-sm">{u.j}</td>
                      <td><button className="text-xs text-[#6366F1] font-medium hover:underline">Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'institutions' && (
            <div className="glass-card p-6 overflow-x-auto">
              <h3 className="font-semibold font-[Outfit] mb-6">🏛️ Institutions</h3>
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { name: 'DPS', students: 450, teachers: 28 },
                    { name: 'St. Mary\'s', students: 320, teachers: 18 },
                    { name: 'IIT Coaching', students: 120, teachers: 8 },
                    { name: 'Global Acad', students: 280, teachers: 15 },
                    { name: 'Oxford Pub', students: 380, teachers: 22 },
                  ]}>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                    <Bar dataKey="students" radius={[6, 6, 0, 0]} fill="#6366F1" name="Students" />
                    <Bar dataKey="teachers" radius={[6, 6, 0, 0]} fill="#8B5CF6" name="Teachers" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <table className="table-glass">
                <thead><tr><th>Name</th><th>Plan</th><th>Students</th><th>Teachers</th><th>Status</th></tr></thead>
                <tbody>
                  {[
                    { n: 'Delhi Public School', p: 'Enterprise', s: '450', t: '28', st: 'Active' },
                    { n: "St. Mary's College", p: 'Pro', s: '320', t: '18', st: 'Active' },
                    { n: 'IIT Coaching Center', p: 'Basic', s: '120', t: '8', st: 'Active' },
                    { n: 'Global Academy', p: 'Pro', s: '280', t: '15', st: 'Active' },
                  ].map((inst, i) => (
                    <tr key={i}>
                      <td className="font-medium">{inst.n}</td>
                      <td><span className={`badge ${inst.p === 'Enterprise' ? 'badge-purple' : inst.p === 'Pro' ? 'badge-blue' : 'badge-green'}`}>{inst.p}</span></td>
                      <td>{inst.s}</td>
                      <td>{inst.t}</td>
                      <td><span className="badge badge-green">{inst.st}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'settings' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="font-semibold font-[Outfit] mb-4">⚙️ Platform Settings</h3>
                <div className="space-y-5">
                  {[
                    { l: 'Allow Self-Registration', t: 'Users can register without admin approval' },
                    { l: 'Auto-Attendance', t: 'Enable AI-powered face recognition' },
                    { l: 'Gesture Detection', t: 'Enable hand gesture recognition' },
                    { l: 'Email Notifications', t: 'Send daily summaries to teachers' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/50">
                      <div><div className="text-sm font-medium">{s.l}</div><div className="text-xs text-gray-500">{s.t}</div></div>
                      <div className="w-11 h-6 rounded-full bg-[#6366F1] relative cursor-pointer transition-all">
                        <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5 shadow-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold font-[Outfit] mb-4">💳 Subscription Plans</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={planData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {planData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 mt-4">
                  {[
                    { n: 'Basic', p: '₹999/mo', u: '22', c: '#06B6D4' },
                    { n: 'Pro', p: '₹2,499/mo', u: '18', c: '#6366F1' },
                    { n: 'Enterprise', p: 'Custom', u: '12', c: '#8B5CF6' },
                  ].map((pl, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ background: pl.c }} />
                        <div><div className="text-sm font-medium">{pl.n}</div><div className="text-xs text-gray-500">{pl.p}</div></div>
                      </div>
                      <div className="text-right"><div className="font-semibold text-sm">{pl.u}</div><div className="text-xs text-gray-500">institutions</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}