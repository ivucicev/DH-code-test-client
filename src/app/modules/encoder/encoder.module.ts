import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncoderComponent } from './encoder/encoder.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { EncodedResultDialogComponent } from './encoder/encoded-result-dialog/encoded-result-dialog.component';

const routes = [
    {
        path: 'encode',
        component: EncoderComponent
    }
];

@NgModule({
    declarations: [EncoderComponent, EncodedResultDialogComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        FormsModule
    ],
    entryComponents: [EncodedResultDialogComponent]
})
export class EncoderModule {}
