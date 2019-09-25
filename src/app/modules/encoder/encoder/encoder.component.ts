import { Component, OnInit } from '@angular/core';
import { EncodeService } from 'src/app/core/services/encode.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EncodedResultDialogComponent } from './encoded-result-dialog/encoded-result-dialog.component';

@Component({
    selector: 'app-encoder',
    templateUrl: './encoder.component.html',
    styleUrls: ['./encoder.component.scss']
})
export class EncoderComponent implements OnInit {
    public sequence;
    public showSpinner = false;
    constructor(
        private encoderService: EncodeService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {}

    public async encode() {
        if (!this.sequence) {
            return;
        }
        this.showSpinner = true;
        const encoded:
            | any
            | {
                  success: boolean;
                  encoded: string;
              } = await this.encoderService
            .encode(this.sequence)
            .catch(err => this.showMessage(err.error.err || err.error));
        if (encoded && encoded.success) {
            this.openDialog(encoded.encoded);
        }
        this.showSpinner = false;
    }

    private openDialog(encoded: string): void {
        const dialogRef = this.dialog.open(EncodedResultDialogComponent, {
            width: '250px',
            data: { encoded }
        });
    }

    private showMessage(message) {
        this.snackBar.open(message, 'Ok', {
            duration: 5000
        });
    }

    ngOnInit() {}
}
