import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { LogIn } from 'src/app/store/actions/auth.actions';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    public showSpinner = false;
    public loginForm;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>
    ) {}

    public login() {
        if (!this.loginForm.valid) {
            return;
        }
        this.showSpinner = true;
        this.store.dispatch(new LogIn(this.loginForm.value));
        this.showSpinner = false;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern(
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    )
                ]
            ],
            password: [
                '',
                [Validators.required, Validators.pattern(/^(?=.*\d).{6,}$/)]
            ]
        });
    }
}
