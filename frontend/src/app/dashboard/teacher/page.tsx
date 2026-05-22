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

const emotionData = [
  { name: 'Attentive', value: 55, color: '#10B981' },
  { name: 'Happy', value: 20, color: '#6366F1' },
  { name: 'Neutral', value: 12, color: '#8B5CF6' },
  { name: 'Confused', value: 8, color: '#F59E0B' },
  { name: 'Distracted', value: 5, color: '#EF4444' },
];

export default function TeacherDashboard() {
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
    { key: 'class', label: 'My Class', icon: '🏫' },
    { key: 'live', label: 'Live Monitor', icon: '🎥' },
    { key: 'reports', label: 'Reports', icon: '📑' },
  ];

  const sidebar = (
    <aside className="dashboard-sidebar glass-dark text-white flex flex-col">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg"><span className="text-white font-bold">V</span></div>
        <div><div className="font-bold font-[Outfit]">Verya</div><div className="text-[10px] text-white/50">Teacher Portal</div></div>
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
            <h1 className="text-2xl font-bold font-[Outfit]">Good Morning, Prof. {user.name}! 👋</h1>
            <p className="text-gray-500 text-sm">Classroom insights at a glance.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live
            </div>
            <div className="avatar">{user.name.charAt(0)}</div>
          </div>
        </div>
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Students', value: '128', icon: '👥', change: '+4 this sem' },
                  { label: 'Avg Attendance', value: '92%', icon: '📊', change: '+2.5%' },
                  { label: 'Class Engagement', value: '85%', icon: '😊', change: '+5%' },
                  { label: "Today's Gestures", value: '47', icon: '👋', change: '12 doubts' },
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
                  <h3 className="font-semibold font-[Outfit] mb-4">📈 Weekly Attendance</h3>
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={weeklyData}>
                      <defs><linearGradient id="tAttend"><stop offset="0%" stopColor="#6366F1" stopOpacity={0.3}/><stop offset="100%" stopColor="#6366F1" stopOpacity={0}/></linearGradient></defs>
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                      <Area type="monotone" dataKey="attendance" stroke="#6366F1" strokeWidth={2} fill="url(#tAttend)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-semibold font-[Outfit] mb-4">😊 Emotion Breakdown</h3>
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie data={emotionData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                        {emotionData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-3 flex-wrap mt-2">
                    {emotionData.map((g, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: g.color }} />
                        {g.name} {g.value}%
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'class' && (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-semibold font-[Outfit] mb-4">🏫 Class Performance - CS-A</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={[
                    { name: 'Aarav', attendance: 98, engagement: 90 },
                    { name: 'Priya', attendance: 95, engagement: 85 },
                    { name: 'Rahul', attendance: 88, engagement: 78 },
                    { name: 'Sneha', attendance: 92, engagement: 88 },
                    { name: 'Arjun', attendance: 78, engagement: 72 },
                    { name: 'Neha', attendance: 96, engagement: 92 },
                    { name: 'Vikas', attendance: 85, engagement: 80 },
                  ]}>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                    <Bar dataKey="attendance" radius={[6, 6, 0, 0]} fill="#6366F1" name="Attendance" />
                    <Bar dataKey="engagement" radius={[6, 6, 0, 0]} fill="#06B6D4" name="Engagement" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="glass-card p-6 overflow-x-auto">
                <h3 className="font-semibold font-[Outfit] mb-4">📋 Class Roster</h3>
                <table className="table-glass">
                  <thead><tr><th>Roll No</th><th>Name</th><th>Attendance</th><th>Engagement</th><th>Today</th></tr></thead>
                  <tbody>
                    {['Aarav Sharma', 'Priya Patel', 'Rahul Singh', 'Sneha Gupta', 'Arjun Mehta'].map((name, i) => (
                      <tr key={i}>
                        <td>CS2024{String(i + 1).padStart(3, '0')}</td>
                        <td className="font-medium">{name}</td>
                        <td>{92 - i * 3}%</td>
                        <td>{[90, 85, 78, 88, 82][i]}%</td>
                        <td><span className={i < 4 ? 'badge badge-green' : 'badge badge-yellow'}>{i < 4 ? 'Present' : 'Late'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'live' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="font-semibold font-[Outfit] mb-4">📷 Camera Feed</h3>
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center relative">
                  <div className="absolute top-3 left-4 flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" /><div className="w-3 h-3 rounded-full bg-yellow-500/80" /><div className="w-3 h-3 rounded-full bg-green-500/80" /></div>
                  <div className="text-center"><div className="text-white text-2xl mb-1">👤</div><div className="text-white font-medium">28 Students Detected</div><div className="text-emerald-400 text-sm mt-1">Face Recognition Active</div></div>
                </div>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold font-[Outfit] mb-4">⚡ Live Gesture Feed</h3>
                <div className="space-y-4">
                  {[
                    { g: '👍', s: 'Aarav', m: 'Understood' },
                    { g: '✋', s: 'Priya', m: 'Doubt' },
                    { g: '👍', s: 'Rahul', m: 'Understood' },
                    { g: '👌', s: 'Sneha', m: 'Confirm' },
                    { g: '✋', s: 'Vikas', m: 'Doubt' },
                  ].map((g, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50">
                      <div className="text-2xl">{g.g}</div>
                      <div><div className="font-medium text-sm">{g.s}</div><div className="text-xs text-gray-500">{g.m} • just now</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'reports' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="font-semibold font-[Outfit] mb-4">📊 Engagement Trend</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={weeklyData}>
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                    <Line type="monotone" dataKey="engagement" stroke="#6366F1" strokeWidth={2} dot={{ fill: '#6366F1', r: 4 }} name="Engagement" />
                    <Line type="monotone" dataKey="attendance" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 4 }} name="Attendance" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold font-[Outfit] mb-4">📋 Download Reports</h3>
                <div className="space-y-3">
                  {[
                    { t: '📊', n: 'Weekly Attendance Report' },
                    { t: '😊', n: 'Monthly Engagement Report' },
                    { t: '👋', n: 'Gesture Summary Report' },
                    { t: '📋', n: 'Individual Student Report' },
                    { t: '📑', n: 'Full Class Analytics PDF' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 cursor-pointer transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-sm">{r.t}</div>
                        <span className="text-sm font-medium">{r.n}</span>
                      </div>
                      <span className="text-xs text-[#6366F1] font-medium">Download →</span>
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