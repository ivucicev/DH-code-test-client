import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncoderComponent } from './encoder/encoder.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes = [
    {
        path: 'encode',
        component: EncoderComponent
    }
];

@NgModule({
    declarations: [EncoderComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        FormsModule
    ]
})
export class EncoderModule {}
