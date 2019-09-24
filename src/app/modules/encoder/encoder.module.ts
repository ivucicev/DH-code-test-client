import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncoderComponent } from './encoder/encoder.component';
import { RouterModule } from '@angular/router';

const routes = [
    {
        path: 'encode',
        component: EncoderComponent
    }
];

@NgModule({
    declarations: [EncoderComponent],
    imports: [RouterModule.forChild(routes), CommonModule]
})
export class EncoderModule {}
