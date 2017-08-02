import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'auth-login',
    templateUrl: './auth-login.component.html',
    styleUrls: ['./auth-login.component.scss'.toString()]
})
export class AuthLoginComponent {
    @Input() confirm;

    constructor(public activeModal: NgbActiveModal) {
    }

    navigate(target) {
        var host = window.location.protocol + "//" + window.location.host;
        switch(target){
            case "google":
                window.location.href =  host +  "/auth/google";
                break;

            case "twitter":
                window.location.href = "http://localhost:3000/auth/twitter";

            case "github":
                window.location.href = "http://localhost:3000/auth/github";

            case "facebook":
                window.location.href = "http://localhost:3000/auth/facebook";

            default:
                window.location.href = "http://localhost:3000/auth/google";
        }
    }
}
