import { cn } from '@/lib/utils';
import { LockIcon } from 'lucide-react';

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <div>
      <LockIcon className={cn(className)} />
    </div>
  );
};

export default Logo;
