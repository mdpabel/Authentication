import React, { createContext, useEffect, useState } from 'react';
import { publicFetch } from '@/lib/fetch';
import { ApiResponse, AuthResponse, Login, User } from '@packages/schema';
import { toastMessage } from '@/lib/utils';
import { flushSync } from 'react-dom';
import {
  clearAuthStateFromLocalStorage,
  getAuthStateFromLocalStorage,
  saveAuthStateToLocalStorage,
} from './utils/authUtils';

type ErrorState<T> = {
  [K in keyof T]?: string;
};

export type AuthContextType = {
  user: AuthResponse['user'] | null;
  token: AuthResponse['token'] | null;
  expiresAt: AuthResponse['expiresAt'] | null;
  error?: ErrorState<User>;
  signup: (userData: User) => Promise<void>;
  login: (userData: Login) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | null;
  isAuthenticated: () => boolean;
  refreshToken: (failedRequest: any) => Promise<void>;
  getToken: () => string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState<ErrorState<User>>();
  const [status, setStatus] = useState<'IDL' | 'PENDING' | 'SUCCESS' | 'ERROR'>(
    'IDL',
  );
  const [authState, setAuthState] = useState<{
    token: AuthResponse['token'] | null;
    expiresAt: AuthResponse['expiresAt'] | null;
    user: AuthResponse['user'] | null;
  }>({
    token: null,
    expiresAt: null,
    user: null,
  });

  useEffect(() => {
    const { expiresAt, token, user } = getAuthStateFromLocalStorage();
    setAuthState({
      token,
      expiresAt: expiresAt ? +expiresAt : null,
      user,
    });
  }, []);

  const signup = async (userData: User) => {
    setStatus('PENDING');
    try {
      const res = await publicFetch.post<ApiResponse<any>>(
        '/auth/signup',
        userData,
      );

      if (res.data) {
        setMessage(res.data?.message!);
      }

      toastMessage({
        message: res.data?.message!,
        success: res.data?.success,
      });

      setStatus('SUCCESS');
    } catch (error: any) {
      console.error(error);
      const data = error.response.data;
      setStatus('ERROR');
      setMessage(data.message);

      toastMessage({
        message: data.message,
        success: false,
      });

      setError({
        ...data.error,
      });
    }
  };

  const login = async (userData: Login) => {
    setStatus('PENDING');
    try {
      const res = await publicFetch.post<ApiResponse<AuthResponse>>(
        '/auth/login',
        userData,
      );

      if (res.data) {
        const user = {
          email: res.data?.data?.user?.email!,
          firstName: res.data?.data?.user?.firstName!,
          lastName: res.data?.data?.user?.lastName!,
          id: res.data?.data?.user?.id!,
        };

        flushSync(() =>
          setAuthState({
            user,
            token: res.data?.data?.token!,
            expiresAt: res.data?.data?.expiresAt!,
          }),
        );
        setMessage(res.data?.message!);

        toastMessage({
          message: res.data?.message!,
          success: res.data?.success,
        });

        saveAuthStateToLocalStorage(
          res.data?.data?.token!,
          res.data?.data?.expiresAt!,
          user,
        );
      }

      setStatus('SUCCESS');
      setTimeout(() => {
        setMessage('');
      }, 700);
    } catch (error: any) {
      let errorMessage = 'An unknown error occurred';
      if (error.response) {
        errorMessage = error.response.data.message || 'Server error occurred';
      } else if (error.request) {
        errorMessage = 'Network error: No response received';
      } else {
        errorMessage = error.message;
      }
      console.error('Login error:', error);
      const data = error.response.data;
      setMessage(errorMessage);
      toastMessage({
        message: data.message,
        success: false,
      });
      setStatus('ERROR');
      setError({
        ...data.error,
      });
    }
  };

  const logout = () => {
    clearAuthStateFromLocalStorage();

    setAuthState({
      expiresAt: null,
      token: null,
      user: null,
    });
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    // const expiresAt = localStorage.getItem('expiresAt');

    if (!token) {
      return false;
    }

    return true;
    // return new Date().getTime() / 1000 < +expiresAt;
  };

  const refreshToken = async (failedRequest: any) => {
    const { data } = await publicFetch.post<
      ApiResponse<{
        accessToken: string;
        expiresAt: number;
      }>
    >('/auth/refresh-token');

    const token = data?.data?.accessToken!;
    const expiresAt = data?.data?.expiresAt;

    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + token;

    setAuthState({
      ...authState,
      token,
      expiresAt,
    });
    saveAuthStateToLocalStorage(token, expiresAt!, authState.user!);

    return Promise.resolve();
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const values = {
    signup,
    login,
    logout,
    isAuthenticated,
    user: authState.user,
    token: authState.token,
    expiresAt: authState.expiresAt,
    isLoading: status === 'PENDING',
    isError: status === 'ERROR',
    isSuccess: status === 'SUCCESS',
    message,
    error,
    refreshToken,
    getToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
