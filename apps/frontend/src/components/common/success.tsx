import { CheckIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';

type Props = {
  title: string;
  subtitle: string;
  btnText: string;
  btnHref: string;
};

const Success = ({ title, subtitle, btnText, btnHref }: Props) => {
  return (
    <div className='flex flex-col justify-center items-center space-y-5 h-[100dvh]'>
      <div className='flex justify-center items-center bg-indigo-400 rounded-full w-20 h-20'>
        <CheckIcon className='w-10 h-10 font-bold text-indigo-50' />
      </div>
      <h2 className='font-semibold text-3xl'>{title}</h2>
      <p>{subtitle}</p>
      <Button
        asChild
        className='bg-indigo-400 hover:bg-indigo-500 text-indigo-50 transition duration-300'>
        <Link to={btnHref}>{btnText}</Link>
      </Button>
    </div>
  );
};

export default Success;
