import { ResponseInterceptorFunction } from 'ts-retrofit';

export const ResponseInterceptor: ResponseInterceptorFunction = (response) => {
  console.log('After receiving response from server.');
  console.log(' status => ', response.status);
  console.log(' status text => ', response.statusText);
  return response;
};
