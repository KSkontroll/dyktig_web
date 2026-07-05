import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminDashboard } from '@/components/admin/admin-dashboard';

export const metadata: Metadata = {
  title: 'Admin — Dyktig Regnskapsfører AS',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminDashboard />
    </Suspense>
  );
}
