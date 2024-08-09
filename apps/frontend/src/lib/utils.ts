import { type ClassValue, clsx } from 'clsx';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toastMessage = ({
  success,
  message,
}: {
  success: boolean;
  message: string;
}) => {
  if (success) {
    toast(message, {
      type: 'success',
    });
  } else {
    toast(message, {
      type: 'error',
    });
  }
};
