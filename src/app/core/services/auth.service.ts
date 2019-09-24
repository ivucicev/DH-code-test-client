import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedIn = new Subject();

    public isLoggedIn$ = this.isLoggedIn.asObservable();

    constructor(protected http: HttpClient) {}

    public toggleLoggedIn(isLogged: boolean) {
        this.isLoggedIn.next(isLogged);
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
