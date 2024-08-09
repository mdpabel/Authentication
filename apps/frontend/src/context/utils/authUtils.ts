export const getAuthStateFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('expiresAt');
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');

  return {
    token,
    expiresAt: expiresAt ? +expiresAt : null,
    user,
  };
};

type User = {
  email: string;
  firstName: string;
  lastName: string;
  id: number;
};

export const saveAuthStateToLocalStorage = (
  token: string,
  expiresAt: number,
  user: User,
) => {
  localStorage.setItem('token', token);
  localStorage.setItem('expiresAt', expiresAt.toString());
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearAuthStateFromLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('expiresAt');
};
