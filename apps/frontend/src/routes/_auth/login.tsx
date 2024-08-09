import LoginForm from '@/components/auth/login-form';
import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/login')({
  component: Page,
});

function Page() {
  return (
    <div className='flex flex-col justify-center items-center pt-10'>
      <div className='space-y-5 shadow p-10 w-[90%] max-w-[450px]'>
        <h2 className='font-medium text-2xl'>Login into account</h2>
        <LoginForm />
        <p className='self-start'>
          Don't have an account?{' '}
          <Link className='font-medium' to='/register'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
