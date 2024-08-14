import { User } from './user';

export type AuthResponse = {
  user: Omit<User, 'password'> & { id: number }; // Omit password from the User type
  token: string | undefined;
  expiresAt: number | undefined;
};
