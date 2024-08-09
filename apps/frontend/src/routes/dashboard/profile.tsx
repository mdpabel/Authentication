import { useFetch } from '@/context/fetch-context';
import { routeGuard } from '@/lib/route-guard';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/dashboard/profile')({
  beforeLoad: routeGuard,
  component: Profile,
});

function Profile() {
  const [profile, setProfile] = useState('');
  const { authAxios } = useFetch();

  useEffect(() => {
    const getProfile = async () => {
      const res = await authAxios.get('/user/get-profile');
      setProfile(JSON.stringify(res));
    };
    getProfile();
  }, []);

  return (
    <div>
      {profile && (
        <pre className='max-w-md text-wrap overflow-scroll'>{profile}</pre>
      )}
    </div>
  );
}
