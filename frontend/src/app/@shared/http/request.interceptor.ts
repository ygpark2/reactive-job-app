import { RequestInterceptorFunction } from 'ts-retrofit';

export const RequestInterceptor: RequestInterceptorFunction = (config) => {
  console.log('Before sending request to server.');
  return config;
};
