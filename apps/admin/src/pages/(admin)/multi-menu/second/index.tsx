import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/multi-menu/second/')({
  beforeLoad: () => {
    throw redirect({ to: '/multi-menu/second/child' });
  }
});
