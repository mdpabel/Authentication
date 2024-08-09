import { redirect } from '@tanstack/react-router';

export const routeGuard = async ({ context, location }: any) => {
  const {
    auth: { isAuthenticated },
  } = context;

  console.log(isAuthenticated());

  if (!isAuthenticated()) {
    throw redirect({
      to: '/login',
      search: {
        redirect: location.href,
      },
    });
  }
};
