import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.states';
import { LogOut } from './store/actions/auth.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public title = 'DH-code-test-client';
    public isLoggedIn;

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
            this.authService.toggleLoggedIn(false);
            this.router.navigateByUrl('/auth/sign-in');
        } else {
            this.authService.toggleLoggedIn(true);
            this.router.navigateByUrl('/encoder/encode');
        }
    }

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn$;
    }
}
