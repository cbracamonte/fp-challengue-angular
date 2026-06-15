export enum ApiErrorCode {
  ProductNotFound = 'PRODUCT_NOT_FOUND',
  CartEmpty = 'CART_EMPTY',
}

export interface ApiError {
  code: string;
  message: string;
}

export interface ApiResponse<TData, TMeta = undefined> {
  data: TData;
  meta?: TMeta;
}

export interface ApiErrorResponse {
  error: ApiError;
}

export interface ListMeta {
  total: number;
}