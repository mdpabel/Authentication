import { ReactNode } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Logo from './logo';
import { SerializedError } from '@reduxjs/toolkit';

const Error = ({
  error,
  children,
}: {
  error: FetchBaseQueryError | SerializedError;
  children?: ReactNode;
}) => {
  let message = 'An unexpected error occurred.';
  let status = '';

  if (
    'data' in error &&
    error.data &&
    typeof error.data === 'object' &&
    'message' in error.data
  ) {
    message = (error.data as { message: string }).message || message;
  } else if ('message' in error) {
    message = error.message || message;
  }

  if ('status' in error) {
    status = error.status.toString();
  }

  return (
    <div className='flex h-[100dvh]'>
      <div className='flex flex-col justify-center items-start gap-2 bg-indigo-400 px-5 md:px-20 w-full md:w-3/5'>
        <Logo className='mb-5 w-14 h-14 text-white' />
        <h2 className='text-white text-xl md:text-2xl'>
          Oh no! Something went wrong.
        </h2>
        <p className='font-semibold text-base text-white md:text-xl'>
          {message}
        </p>
        {children && <div>{children}</div>}
      </div>
      <div className='md:flex justify-center items-center hidden bg-indigo-100 w-2/5'>
        <div className='flex justify-center items-center bg-indigo-400 rounded-full w-60 h-60'>
          <div className='flex flex-col justify-center items-center bg-indigo-100 w-40 h-40'>
            <p className='font-semibold text-indigo-600 text-xl'>HTTP</p>
            <p className='font-bold text-4xl text-indigo-600'>{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
