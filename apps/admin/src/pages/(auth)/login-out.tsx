import { createFileRoute, redirect } from '@tanstack/react-router';

const LoginOut = () => {
  return null;
};

export const Route = createFileRoute('/(auth)/login-out')({
  component: LoginOut,
  staticData: {
    title: 'login-out',
    i18nKey: 'route.login-out'
  },
  beforeLoad: () => {
    throw redirect({ to: '/login' });
  }
});
