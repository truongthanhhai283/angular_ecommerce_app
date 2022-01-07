import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

// this interceptor service need custom injection
@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if ([401, 403].indexOf(err.status) !== -1) {
          this.authService.userLogout();
        } else if (err.status === 404) {
          this.router.navigate(['/notFoundResource', err.status], {
            queryParams: {
              'Error-Status': err.status,
            },
          });
        } else {
          this.router.navigate(['/applicationError', err.status], {
            queryParams: {
              'Error-Status': err.status,
            },
          });
        }
        const error = err.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
