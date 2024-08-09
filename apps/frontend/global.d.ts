import { ApiResponse } from '@packages/schema';

export type ApiSuccessResponse<T> = {
  data: ApiResponse<T>;
  error?: undefined;
  status: number;
};
export type ApiErrorResponse = {
  data?: undefined;
  error: {
    data: ApiResponse<unknown>;
    status: number;
  };
};

export type ApiResult<T> = ApiSuccessResponse<T> | ApiErrorResponse;
