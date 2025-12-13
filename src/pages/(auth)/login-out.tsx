import { createFileRoute } from '@tanstack/react-router';

const LoginOut = () => {
  return null;
};

export const Route = createFileRoute('/(auth)/login-out')({
  component: LoginOut
});
