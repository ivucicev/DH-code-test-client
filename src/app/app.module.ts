import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule'
    },
    {
        path: 'encoder',
        loadChildren: './modules/encoder/encoder.module#EncoderModule'
    },
    {
        path: '**',
        redirectTo: '/auth'
    }
];

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
