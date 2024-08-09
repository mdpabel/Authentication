import RegisterForm from '@/components/auth/register-form';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/register')({
  component: Page,
});

function Page() {
  return (
    <div className='flex flex-col justify-center items-center pt-10'>
      <div className='space-y-5 shadow p-10 w-[90%] max-w-[450px]'>
        <h2 className='font-medium text-2xl'>Get started with us</h2>
        <RegisterForm />
        <p className='self-start'>
          Already have an account?{' '}
          <Link className='font-medium' to='/login'>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
