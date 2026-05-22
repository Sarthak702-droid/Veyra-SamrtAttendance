'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

type User = { id: string; name: string; phone: string; role: string; email: string };

const weeklyData = [
  { day: 'Mon', attendance: 88, engagement: 75, gestures: 12 },
  { day: 'Tue', attendance: 92, engagement: 82, gestures: 18 },
  { day: 'Wed', attendance: 85, engagement: 78, gestures: 15 },
  { day: 'Thu', attendance: 94, engagement: 88, gestures: 22 },
  { day: 'Fri', attendance: 90, engagement: 85, gestures: 20 },
  { day: 'Sat', attendance: 78, engagement: 70, gestures: 8 },
  { day: 'Sun', attendance: 95, engagement: 90, gestures: 25 },
];

const gestureData = [
  { name: 'Understood 👍', value: 55, color: '#10B981' },
  { name: 'Doubt ✋', value: 25, color: '#F59E0B' },
  { name: 'Confirm 👌', value: 15, color: '#6366F1' },
  { name: 'Peace ✌️', value: 5, color: '#8B5CF6' },
];

export default function StudentDashboard() {
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
    { key: 'attendance', label: 'Attendance', icon: '📋' },
    { key: 'gestures', label: 'My Gestures', icon: '👋' },
    { key: 'analytics', label: 'Analytics', icon: '📈' },
  ];

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar glass-dark text-white flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg"><span className="text-white font-bold">V</span></div>
          <div><div className="font-bold font-[Outfit]">Verya</div><div className="text-[10px] text-white/50">Student Portal</div></div>
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
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1 className="text-2xl font-bold font-[Outfit]">Hey, {user.name}! 👋</h1>
            <p className="text-gray-500 text-sm">Here's your learning summary.</p>
          </div>
          <div className="avatar">{user.name.charAt(0)}</div>
        </div>
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{children}</motion.div>
      </main>
    </div>
  );

  return Layout({ children: (
    <>
      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '📊', label: 'Attendance', value: '95%', change: '+2%', color: 'from-[#6366F1] to-[#8B5CF6]' },
              { icon: '👋', label: 'Participation', value: '42', change: '+5', color: 'from-[#06B6D4] to-[#6366F1]' },
              { icon: '😊', label: 'Engagement', value: '88%', change: '+3%', color: 'from-[#10B981] to-[#34D399]' },
            ].map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-card p-6 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-xl shadow-lg`}>{m.icon}</div>
                <div><div className="text-xs text-gray-500 uppercase tracking-wider">{m.label}</div><div className="text-2xl font-bold font-[Outfit] mt-1">{m.value}</div><div className="text-xs text-emerald-600 mt-1">{m.change} this week</div></div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h3 className="font-semibold font-[Outfit] mb-4">📈 Weekly Attendance Trend</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={weeklyData}>
                  <defs><linearGradient id="attendGrad"><stop offset="0%" stopColor="#6366F1" stopOpacity={0.3}/><stop offset="100%" stopColor="#6366F1" stopOpacity={0}/></linearGradient></defs>
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }} />
                  <Area type="monotone" dataKey="attendance" stroke="#6366F1" strokeWidth={2} fill="url(#attendGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-semibold font-[Outfit] mb-4">👋 Gesture Distribution</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={gestureData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                    {gestureData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 flex-wrap mt-2">
                {gestureData.map((g, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: g.color }} />
                    {g.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'attendance' && (
        <div className="glass-card p-6">
          <h3 className="font-semibold font-[Outfit] mb-4">📋 Attendance Records</h3>
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                <Bar dataKey="attendance" radius={[8, 8, 0, 0]} fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <table className="table-glass">
            <thead><tr><th>Date</th><th>Subject</th><th>Status</th><th>Confidence</th></tr></thead>
            <tbody>
              {['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'English'].map((s, i) => (
                <tr key={i}><td className="text-sm">May {18 - i}, 2026</td><td>{s}</td><td><span className="badge badge-green">Present</span></td><td className="text-gray-500">{(98 - i * 0.5).toFixed(1)}%</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'gestures' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold font-[Outfit] mb-4">👋 Gesture Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={gestureData} cx="50%" cy="50%" outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, percent }: any) => `${((percent ?? 0) * 100).toFixed(0)}%`}>
                  {gestureData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-semibold font-[Outfit] mb-4">📊 Weekly Gesture Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyData}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                <Line type="monotone" dataKey="gestures" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === 'analytics' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold font-[Outfit] mb-4">📈 Engagement & Attendance</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                <Bar dataKey="attendance" radius={[6, 6, 0, 0]} fill="#6366F1" name="Attendance" />
                <Bar dataKey="engagement" radius={[6, 6, 0, 0]} fill="#06B6D4" name="Engagement" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card p-6 flex flex-col items-center justify-center">
            <h3 className="font-semibold font-[Outfit] mb-4">🎯 Overall Performance</h3>
            <div className="relative w-44 h-44 rounded-full gradient-primary flex items-center justify-center shadow-xl shadow-[#6366F1]/20">
              <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold font-[Outfit] text-[#6366F1]">88%</div>
                  <div className="text-xs text-gray-500">Avg Score</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6 w-full">
              <div className="text-center"><div className="text-lg font-bold text-[#6366F1]">95%</div><div className="text-xs text-gray-500">Attendance</div></div>
              <div className="text-center"><div className="text-lg font-bold text-[#8B5CF6]">88%</div><div className="text-xs text-gray-500">Engagement</div></div>
              <div className="text-center"><div className="text-lg font-bold text-[#10B981]">42</div><div className="text-xs text-gray-500">Gestures</div></div>
            </div>
          </div>
        </div>
      )}
    </>
  ) });
}