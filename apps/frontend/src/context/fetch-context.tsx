import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { createContext, ReactNode, useContext } from 'react';
import { useAuth } from './auth-context';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

type FetchContextType = {
  authAxios: AxiosInstance;
};

const FetchContext = createContext<FetchContextType | undefined>(undefined);

export const FetchProvider = ({ children }: { children: ReactNode }) => {
  const { getToken, refreshToken } = useAuth();

  const authAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  authAxios.interceptors.request.use(
    (config) => {
      config.headers.setAuthorization(`Bearer ${getToken()}`);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  createAuthRefreshInterceptor(authAxios, refreshToken, {
    pauseInstanceWhileRefreshing: true,
  });

  authAxios.defaults.withCredentials = true;

  const values = {
    authAxios,
  };

  return (
    <FetchContext.Provider value={values}>{children}</FetchContext.Provider>
  );
};

export const useFetch = () => {
  const context = useContext(FetchContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
