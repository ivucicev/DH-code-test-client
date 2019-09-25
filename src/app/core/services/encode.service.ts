import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EncodeService {
    constructor(protected http: HttpClient) {}

    public encode(sequence: string) {
        return this.http.post('encode', { sequence }).toPromise();
    }
}
