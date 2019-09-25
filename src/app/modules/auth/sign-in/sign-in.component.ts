import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

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
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    public async login() {
        if (!this.loginForm.valid) {
            return;
        }
        this.showSpinner = true;

        const auth: any = await this.authService
            .signIn(this.loginForm.value)
            .catch(err => {
                this.showMessage(err.error.err);
            });
        if (auth && auth.success) {
            this.authService.toggleLoggedIn(true);
            sessionStorage.setItem('token', auth.token);
            this.router.navigateByUrl('encoder/encode');
            return;
        }
        this.showSpinner = false;
    }

    private showMessage(message) {
        this.snackBar.open(message, 'Ok', {
            duration: 5000
        });
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
