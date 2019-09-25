import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable, of } from 'rxjs';
import {
    AuthActionTypes,
    LogIn,
    LogInSuccess,
    LogInFailure,
    SignUp,
    SignUpSuccess,
    SignUpFailure
} from '../actions/auth.actions';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    @Effect()
    LogIn: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action: LogIn) => action.payload),
        switchMap(payload => {
            return this.authService.signIn(payload).pipe(
                map((res: any) => {
                    return new LogInSuccess({
                        token: res.token,
                        email: payload.email,
                        expires: res.expires
                    });
                }),
                catchError(error => {
                    this.snackBar.open(error.error.err, 'Ok', {
                        duration: 5000
                    });
                    return of(new LogInFailure({ error }));
                })
            );
        })
    );

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap(res => {
            sessionStorage.setItem('token', res.payload.token);
            sessionStorage.setItem('expires', res.payload.expires);
            return this.router.navigateByUrl('/encoder/encode');
        })
    );

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect()
    SignUp: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP),
        map((action: SignUp) => action.payload),
        switchMap(payload => {
            return this.authService.signUp(payload).pipe(
                map((res: any) => {
                    return new SignUpSuccess({
                        token: res.token,
                        email: payload.email
                    });
                }),
                catchError(error => {
                    this.snackBar.open(error.error.err, 'Ok', {
                        duration: 5000
                    });
                    return of(new SignUpFailure({ error }));
                })
            );
        })
    );

    @Effect({ dispatch: false })
    SignUpSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_SUCCESS),
        tap(user => {
            this.snackBar.open('You can now login with your account.', 'Ok', {
                duration: 5000
            });
            this.router.navigateByUrl('auth/sign-in');
        })
    );

    @Effect({ dispatch: false })
    SignUpFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_FAILURE)
    );

    @Effect({ dispatch: false })
    public LogOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap(user => {
            sessionStorage.clear();
        })
    );
}
