import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedIn = new BehaviorSubject(false);

    public isLoggedIn$ = this.isLoggedIn.asObservable();

    constructor(protected http: HttpClient) {}

    public toggleLoggedIn(isLogged: boolean) {
        this.isLoggedIn.next(isLogged);
    }

    public checkSession() {
        const token = sessionStorage.getItem('token');
        const expires = sessionStorage.getItem('expires') || 0;
        return !token || expires < Date.now();
    }

    public signIn(data) {
        return this.http.post('sign-in', data).toPromise();
    }

    public signUp(data) {
        return this.http.post('sign-up', data).toPromise();
    }

    public signOut() {
        this.toggleLoggedIn(false);
        return this.http.patch('sign-out', {}).toPromise();
    }
}
