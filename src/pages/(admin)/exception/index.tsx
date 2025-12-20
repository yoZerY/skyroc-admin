import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/exception/')({
  beforeLoad: () => {
    throw redirect({ to: '/exception/404' });
  }
});
