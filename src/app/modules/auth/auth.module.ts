import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';

const routes = [
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    }
];

@NgModule({
    declarations: [SignInComponent, SignUpComponent],
    imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AuthModule {}
