import { useAuth } from '@/context/auth-context';
import { Link } from '@tanstack/react-router';
import Logout from './logout';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const authenticated = isAuthenticated();

  return (
    <nav className='flex justify-between items-center py-4 w-full'>
      <div className='flex items-center space-x-5'>
        <Link to='/'>Home</Link>
        {!authenticated && (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
        {authenticated && <Link to='/dashboard'>Dashboard</Link>}
        {authenticated && <Link to='/dashboard/profile'>Profile</Link>}
        {authenticated && <Link to='/dashboard/token'>Token</Link>}
      </div>

      <Logout />
    </nav>
  );
};

export default Navbar;
