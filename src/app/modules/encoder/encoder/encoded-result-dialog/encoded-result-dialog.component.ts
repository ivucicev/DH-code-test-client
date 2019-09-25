import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-encoded-result-dialog',
    templateUrl: './encoded-result-dialog.component.html',
    styleUrls: ['./encoded-result-dialog.component.scss']
})
export class EncodedResultDialogComponent implements OnInit {
    public encoded = '';

    constructor(
        public dialogRef: MatDialogRef<EncodedResultDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { encoded: string }
    ) {
        this.encoded = data.encoded;
    }

    close(): void {
        this.dialogRef.close();
    }
}
