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

    constructor(private authService: AuthService, private router: Router) {}

    public async signOut() {
        try {
            await this.authService.signOut();
            sessionStorage.clear();
        } catch (err) {}
        this.router.navigateByUrl('auth/sign-in');
    }

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn$;
    }
}
