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
                window.location.href =  BASE_URL +  "/auth/google";
                break;
            case "twitter":
                window.location.href = BASE_URL + "/auth/twitter";
                break;
            case "github":
                window.location.href = BASE_URL + "/auth/github";
                break;
            case "facebook":
                window.location.href = BASE_URL + "/auth/facebook";
                break;
        }
    }
}
