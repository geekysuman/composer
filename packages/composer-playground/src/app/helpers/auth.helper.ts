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
    if(this.getPresentUser().email){
      console.log("User logged in");
      return true
    }
    console.log("Need to log.");
    return false
  }
  
  // Handle present user in session-storage
  storePresentUser(user){
    if(user){
    console.log('inside store present', user);
      sessionStorage.setItem("user",  JSON.stringify(user));
    }
  }
  getPresentUser(){
    let user;
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
    return user;
  }

  // Handle token
  getUserToken(){
    return sessionStorage.getItem("userToken");
  }
  storeToken(token=''){
    if(token != '')
      sessionStorage.setItem("userToken", token);
  }

  // Fetch and store user account
  fetchUserAccount(){
    return this.http.get(this.accountStatusUrl)
              .map((res:Response) => {
                const result = res.json();
                console.log('inside map');
                console.log("user account details", result);
                // const token = result.profileObj.token;
                const user = {
                  name : result.profileObj.name,
                  email : result.profileObj.email
                };
                const userAccount = {
                  user: user
                };
                  return userAccount;
                }).toPromise()
              // .catch((error:any) => Observable.throw(error.json().error || 'Server error: Not getting user account details'))
  }
  storeUserAccount(){
    this.fetchUserAccount()
    .then((userAccount)=>{
      this.storePresentUser(userAccount.user)
    })
  }

}