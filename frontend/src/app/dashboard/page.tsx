'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) { router.push('/login'); return; }
    try {
      const user = JSON.parse(userStr);
      const role = user.role || 'student';
      router.push(`/dashboard/${role}`);
    } catch { router.push('/login'); }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5]">
      <div className="w-12 h-12 border-4 border-[#6366F1]/20 border-t-[#6366F1] rounded-full animate-spin" />
    </div>
  );
}