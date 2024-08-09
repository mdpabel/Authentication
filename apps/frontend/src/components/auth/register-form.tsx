import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User, userSchema } from '@packages/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from '../common/spinner';
import PasswordInputField from './password-field';
import { useAuth } from '@/context/auth-context';
import AuthAlert from './auth-alert';
import { useEffect } from 'react';

const RegisterForm = () => {
  const { signup, isLoading, isSuccess, message, error } = useAuth();
  // const [register, { isLoading }] = useRegisterMutation();
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: User) => {
    await signup(values);
    try {
    } catch (error: any) {
      if (error && error.data && error.data.error) {
        const serverErrors = error.data.error;
        Object.keys(serverErrors).forEach((field) => {
          form.setError(field as keyof User, {
            type: 'server',
            message: serverErrors[field],
          });
        });
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  useEffect(() => {
    if (error) {
      Object.keys(error).forEach((field) => {
        form.setError(field as keyof User, {
          type: 'server',
          message: error[field as keyof User],
        });
      });
    }
  }, [error]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder='First Name' />
                </FormControl>
                <FormMessage className='font-normal text-[0.8rem] text-left' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder='Last Name' />
                </FormControl>
                <FormMessage className='font-normal text-[0.8rem] text-left' />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type='email' placeholder='Email' />
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
            Register
            {isLoading && <Spinner />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
