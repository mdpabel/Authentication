export type ApiResponse<T = unknown> = {
  data?: T;
  success: boolean;
  error?: { message: string; code: number };
  message?: string;
};
