import { zodResolver } from '@hookform/resolvers/zod';
import { Login, loginSchema } from '@packages/schema';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import PasswordInputField from './password-field';
import Spinner from '../common/spinner';
import { useAuth } from '@/context/auth-context';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: Login) => {
    await login(values);
    await navigate({
      to: '/dashboard',
    });
  };

  useEffect(() => {
    if (error) {
      Object.keys(error).forEach((field) => {
        form.setError(field as keyof Login, {
          type: 'server',
          message: error[field as keyof Login],
        });
      });
    }
  }, [error]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder='Email' />
              </FormControl>
              <FormMessage className='font-normal text-[0.8rem] text-left' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInputField field={field} />
              </FormControl>
              <FormMessage className='font-normal text-[0.8rem] text-left' />
            </FormItem>
          )}
        />
        <div className='flex'>
          <Button type='submit'>
            Login
            {isLoading && <Spinner />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
function login(values: { email: string; password: string }) {
  throw new Error('Function not implemented.');
}
