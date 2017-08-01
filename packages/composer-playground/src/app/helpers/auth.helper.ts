import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export default class AuthHelper {

  private accountStatusUrl = 'http://localhost:3000/account'; 
  
  constructor(private http: Http) {}
  
  isAuthenticate() { 
    return this.http.get(this.accountStatusUrl)
              .map((res:Response) => {
                // console.log("inside into map",res);
                const result = res.json()
                return result.auth_status ? true : false
              }).toPromise()
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
               /* .subscribe(result => {
                return result.auth_status ? true : false
              }) */
  }

}