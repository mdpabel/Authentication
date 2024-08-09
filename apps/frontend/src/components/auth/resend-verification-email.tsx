import { useResendEmailVerificationMutation } from '@/services/auth/auth-api-slice';
import { Button } from '../ui/button';
import Spinner from '../common/spinner';

const ResendVerificationEmail = ({ token }: { token: string }) => {
  const [resendEmailVerification, { isLoading }] =
    useResendEmailVerificationMutation();

  return (
    <Button
      onClick={() => {
        resendEmailVerification({ token });
      }}
      className='bg-indigo-100 hover:bg-indigo-100 text-indigo-400'>
      Resend verification link {isLoading && <Spinner />}
    </Button>
  );
};

export default ResendVerificationEmail;
