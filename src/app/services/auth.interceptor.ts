// import { HTTP_INTERCEPTORS, HttpInterceptorFn } from '@angular/common/http';
// import { catchError, throwError } from 'rxjs';

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

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
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Unauthorized - possibly invalid token');
      } 
      return throwError(() => error);
    })
  );
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
