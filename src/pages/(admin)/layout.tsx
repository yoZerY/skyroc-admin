import { createFileRoute } from '@tanstack/react-router';

import AdminLayoutComponent from '@/layouts/admin-layout/AdminLayout';

export const Route = createFileRoute('/(admin)')({
  component: AdminLayout,
  staticData: {
    title: 'admin'
  }
});

function AdminLayout() {
  return <AdminLayoutComponent />;
}
