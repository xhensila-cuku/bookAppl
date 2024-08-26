// import { HTTP_INTERCEPTORS, HttpInterceptorFn } from '@angular/common/http';
// import { catchError, throwError } from 'rxjs';

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('token', token);
    request = request.clone({
      withCredentials: false,
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(request);
};

// export const httpInterceptorProviders = [
// { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
// ];

// @Injectable()
// export class HttpRequestInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService, private router: Router) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('token');

//     if (token) {
//       request = request.clone({
//         withCredentials: false,
//         setHeaders: {
//           Authorization: token,
//         },
//       });
//     }

//     return next.handle(request).pipe(
//       catchError((err) => {
//         return throwError(() => {
//           new Error(err);
//           if (err.status === 401) {
//             // this.router.navigate(['']);
//           }
//         });
//       })
//     );
//   }
// }
