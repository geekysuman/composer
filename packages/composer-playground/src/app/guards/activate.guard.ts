import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export default class ActivateGuard implements CanActivate {

  private can: boolean = true;

  constructor(private http: Http) {}

  canActivate() {
    console.log('ActivateGuard#canActivate called, can: ', this.can);
    if (!this.can) {
      console.log('User is not Authenticated');
      return false;
    }
    return true;
  }

  // setCanActivate(can) {
  //   this.can = can;
  // }
}
