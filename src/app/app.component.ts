import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.states';
import { LogOut, LogInSuccess } from './store/actions/auth.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public title = 'DH-code-test-client';
    public state$;

    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<AppState>
    ) {
        this.checkSession();
    }

    public signOut() {
        this.store.dispatch(new LogOut());
    }

    public checkSession() {
        if (this.authService.checkSession()) {
            this.store.dispatch(new LogOut());
        } else {
            this.store.dispatch(
                new LogInSuccess({
                    email: sessionStorage.getItem('email'),
                    token: sessionStorage.getItem('token')
                })
            );
        }
    }

    ngOnInit() {
        this.state$ = this.store;
    }
}
