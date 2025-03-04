import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  // requist --- send headers
  // don't work direct get clone

  if (localStorage.getItem('userToken')) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('userToken')!,
      },
    });
  }

  return next(req);
};
