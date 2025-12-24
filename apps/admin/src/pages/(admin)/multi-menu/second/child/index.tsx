import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/multi-menu/second/child/')({
  beforeLoad: () => {
    throw redirect({ to: '/multi-menu/second/child/home' });
  }
});
