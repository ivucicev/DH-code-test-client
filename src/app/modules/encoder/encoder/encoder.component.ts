import { Component, OnInit } from '@angular/core';
import { EncodeService } from 'src/app/core/services/encode.service';

@Component({
    selector: 'app-encoder',
    templateUrl: './encoder.component.html',
    styleUrls: ['./encoder.component.scss']
})
export class EncoderComponent implements OnInit {
    public sequence;

    constructor(private encoderService: EncodeService) {}

    public encode() {}

    ngOnInit() {}
}
