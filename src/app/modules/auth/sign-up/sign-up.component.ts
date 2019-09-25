import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { SignUp } from 'src/app/store/actions/auth.actions';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    public registerForm: FormGroup;
    public showSpinner: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>
    ) {}

    public register() {
        if (
            !this.registerForm.valid ||
            this.registerForm.value.password !==
                this.registerForm.value.passwordRepeat
        ) {
            return;
        }
        this.showSpinner = true;
        this.store.dispatch(new SignUp(this.registerForm.value));
        this.showSpinner = false;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            fullname: ['', Validators.required],
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
            ],
            passwordRepeat: [
                '',
                [Validators.required, Validators.pattern(/^(?=.*\d).{6,}$/)]
            ]
        });
    }
}
