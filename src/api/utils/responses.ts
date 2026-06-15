import type { Response } from 'express';
import type { ApiErrorResponse } from '../types/api-response.types';
import { ApiErrorCode } from '../types/api-response.types';

export const sendError = (
  res: Response<ApiErrorResponse>,
  status: number,
  code: ApiErrorCode,
  message: string,
): void => {
  res.status(status).json({ error: { code, message } });
};

export const notFound = (res: Response<ApiErrorResponse>, message = 'Product not found'): void =>
  sendError(res, 404, ApiErrorCode.ProductNotFound, message);