import { Component, OnInit, trigger, style, transition, animate } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
    selector: 'publish',
    templateUrl: './publish-progress.component.html',
    styleUrls: ['./publish-progress.component.scss'.toString()],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({opacity: 0}),
                animate('1s ease-in', style({opacity: 1}))
            ]),
            transition(':leave', [
                style({opacity: 1}),
                animate('1s ease-out', style({opacity: 0}))
            ])
        ])
    ]
})
export class PublishProgressComponent implements OnInit {

    messages: Array<any> = [];
    events = [];

    constructor(private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.alertService.publishStatus$.subscribe((message) => {
            if (message !== undefined) {
                this.messages.push(message);
            } else {
              this.messages = [];
            }
        });
    }

    close(index) {
        this.messages.splice(index, 1);
    }
}
