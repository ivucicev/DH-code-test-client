import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './core/interceptors/http-interceptor.service';
import { AuthGuard } from './core/guards/auth.guard';

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
        loadChildren: './modules/encoder/encoder.module#EncoderModule',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/auth'
    }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
