import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { routeGuard } from '@/lib/route-guard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/token')({
  beforeLoad: routeGuard,
  component: Token,
});

function Token() {
  const { token, refreshToken } = useAuth();

  const tokens = token?.split('.')!;

  return (
    <div className='space-y-4'>
      <h2>Access Token</h2>
      <div className='text-green-800'>{tokens?.[0]}</div>
      <div className='rounded w-full max-w-md text-red-500 break-words whitespace-pre-wrap'>
        {tokens?.[1]}
      </div>
      <div className='text-indigo-600'>{tokens?.[2]}</div>
    </div>
  );
}
