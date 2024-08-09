import Navbar from '@/components/layout/navbar';
import { AuthContextType } from '@/context/auth-context';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type RouterContext = {
  auth: AuthContextType;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-[100dvh]'>
      <header className='mx-auto container'>
        <Navbar />
      </header>

      <main className='mx-auto container'>
        <Outlet />
        <ToastContainer />
        {/* <TanStackRouterDevtools /> */}
      </main>

      <footer>Footer</footer>
    </div>
  ),
});
