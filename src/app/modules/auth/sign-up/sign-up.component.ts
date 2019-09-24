import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

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
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    public async register() {
        if (!this.registerForm.valid) {
            return;
        }
        const register: any = await this.authService
            .signUp(this.registerForm.value)
            .catch(err => {
                this.showMessage(err.message);
            });
        if (register && register.success) {
            this.router.navigateByUrl('auth/sign-in');
        }
    }

    public showMessage(message) {
        this.snackBar.open(message, 'Ok', {
            duration: 5000
        });
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
            ]
        });
    }
}
