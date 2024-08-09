import { useAuth } from '@/context/auth-context';
import { useNavigate } from '@tanstack/react-router';

const Logout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate({
      to: '/login',
    });
  };

  return (
    <div>
      {isAuthenticated() && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default Logout;
