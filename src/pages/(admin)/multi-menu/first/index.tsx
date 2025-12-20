import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/multi-menu/first/')({
  beforeLoad: () => {
    throw redirect({ to: '/multi-menu/first/child' });
  }
});
