import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(protected http: HttpClient) {}

    public checkSession() {
        const token = sessionStorage.getItem('token');
        const expires = sessionStorage.getItem('expires') || 0;
        return !token || expires < Date.now();
    }

    public signIn(data) {
        return this.http.post('sign-in', data);
    }

    public signUp(data) {
        return this.http.post('sign-up', data);
    }

    public signOut() {
        return this.http.patch('sign-out', {});
    }
}
