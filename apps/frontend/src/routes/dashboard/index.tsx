import { useAuth } from '@/context/auth-context';
import { routeGuard } from '@/lib/route-guard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: routeGuard,
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();

  const name = user?.firstName + ' ' + user?.lastName;

  return (
    <div className='py-10'>
      Welcome <span className='font-semibold'>{name}</span>
    </div>
  );
}
