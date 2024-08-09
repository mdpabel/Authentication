import { AuthProvider } from '@/context/auth-context';
import { FetchProvider } from '@/context/fetch-context';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <FetchProvider>{children}</FetchProvider>
    </AuthProvider>
  );
};

export default Providers;
