import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public title = 'DH-code-test-client';
    public isLoggedIn;

    constructor(private authService: AuthService, private router: Router) {
        this.checkSession();
    }

    public async signOut() {
        try {
            await this.authService.signOut();
            sessionStorage.clear();
        } catch (err) {}
        this.router.navigateByUrl('auth/sign-in');
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
