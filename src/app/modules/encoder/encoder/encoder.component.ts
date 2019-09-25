import { Component, OnInit } from '@angular/core';
import { EncodeService } from 'src/app/core/services/encode.service';
import { MatSnackBar } from '@angular/material';

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
        private snackBar: MatSnackBar
    ) {}

    public async encode() {
        if (!this.sequence) {
            return;
        }
        this.showSpinner = true;
        const encoded = await this.encoderService
            .encode(this.sequence)
            .catch(err => this.showMessage(err.error.err));
        console.log(encoded);
        this.showSpinner = false;
    }

    private showMessage(message) {
        this.snackBar.open(message, 'Ok', {
            duration: 5000
        });
    }

    ngOnInit() {}
}
