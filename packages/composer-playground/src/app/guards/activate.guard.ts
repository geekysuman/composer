import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export default class ActivateGuard implements CanActivate {

  private can: boolean = true;
  private accountStatusUrl = 'http://localhost:3001/account'; 

  constructor(private http: Http) {}
  
  canActivate() {
    console.log('ActivateGuard#canActivate called, can: ', this.can);
    if (!this.can) {
      console.log('Activation blocked');
      return false;
    }
    this.http.get(this.accountStatusUrl)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
              .subscribe(result => {
                console.log("Result",result)
              })
    /* this.http.get(this.accountStatusUrl).subscribe((result) => {
      console.log("result",result);
    }) */
    return true;
  }

  /* setCanActivate(can=false) {
    this.can = can;
  } */
}