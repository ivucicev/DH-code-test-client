import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(protected http: HttpClient) {}

    public signIn(data) {
        return this.http.post('sign-in', data).toPromise();
    }
}
