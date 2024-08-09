import { cn } from '@/lib/utils';
import { Alert } from '../ui/alert';

const AuthAlert = ({
  message,
  isSuccess,
}: {
  message: string | null;
  isSuccess: boolean;
}) => {
  return (
    <>
      {message && (
        <Alert
          className={cn(
            'py-2',
            isSuccess
              ? 'text-indigo-500 border-indigo-500'
              : 'text-red-500 border-red-500',
          )}
          variant={isSuccess ? 'default' : 'destructive'}>
          {message}
        </Alert>
      )}
    </>
  );
};

export default AuthAlert;
