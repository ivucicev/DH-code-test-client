import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpResponse,
    HttpUserEvent,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private router: Router, private snackBar: MatSnackBar) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<
        | HttpSentEvent
        | HttpHeaderResponse
        | HttpProgressEvent
        | HttpResponse<any>
        | HttpUserEvent<any>
        | any
    > {
        return next
            .handle(
                this.addTokenToRequest(request, sessionStorage.getItem('token'))
            )
            .pipe(
                catchError(err => {
                    if (err instanceof HttpErrorResponse) {
                        switch ((err as HttpErrorResponse).status) {
                            case 401:
                                this.snackBar.open(
                                    'Not authenticated...',
                                    'Ok',
                                    {
                                        duration: 2000
                                    }
                                );
                                this.router.navigateByUrl('/auth/sign-in');
                                return throwError(err);
                            case 400:
                                return throwError(err);
                        }
                    } else {
                        this.snackBar.open(
                            'Something went wrong! Please try again...',
                            'Ok',
                            {
                                duration: 2000
                            }
                        );
                        return throwError(err);
                    }
                })
            );
    }

    private addTokenToRequest(
        request: HttpRequest<any>,
        token: string
    ): HttpRequest<any> {
        return request.clone({
            url: `${environment.api}${request.url}`,
            setHeaders: {
                Authorization: `${token}`,
                'Content-Type': 'application/json'
            }
        });
    }
}
