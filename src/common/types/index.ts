import { AxiosError } from "axios";
export type TMetaItem = {
  code: number;
  status: string;
  message: string;
};
export type TMetaErrorResponse = AxiosError<TMetaItem>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type TCommonResponse<T> = {
  status_code: number;
  version: string;
};

export type TResponse<T> = {
  data: T;
} & TCommonResponse<T>;

type TErrorValdation = {
  key: string;
  value: string;
};
export type TError = {
  error_message: string;
  errors: TErrorValdation[];
  stack_trace: string;
  status_code: number;
  version: string;
};
