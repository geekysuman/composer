import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export default class AuthHelper {

  private accountStatusUrl = BASE_URL+'/account'; 
  
  constructor(private http: Http) {}
  
  isAuthenticate() {
    // this.storeUserAccount()
    if(this.getPresentUser()){
      console.log("User logged in");
      return true
    }
    console.log("Need to log.");
    return false
  }
  
  // Handle present user in session-storage
  storePresentUser(user){
    if(user){
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
  deletePresentUser(){
    sessionStorage.removeItem("user");
  }

  // Handle token
  getUserToken(){
    return sessionStorage.getItem("userToken");
  }
  storeToken(token=''){
    if(token != '')
      sessionStorage.setItem("userToken", token);
  }
  deleteToken(){
    sessionStorage.removeItem("userToken");
  }

  // Fetch and store user account
  fetchUserAccount(){
    return this.http.get(this.accountStatusUrl)
              .map((res:Response) => {
                const result = res.json();
                console.log("user account details", result);
                if(result.auth_status){
                  const token = result.token;
                  const user = {
                    name : result.profileObj.name,
                    email : result.profileObj.email,
                    hash : result.profileObj.hashId
                  };
                  const userAccount = {
                    user: user,
                    token
                  };
                    return userAccount;
                }
                  return false
                }).toPromise()
              // .catch((error:any) => Observable.throw(error.json().error || 'Server error: Not getting user account details'))
  }
  storeUserAccount(){
    this.fetchUserAccount()
    .then((userAccount)=>{
      // console.log('User Account session',userAccount.user)
      if(userAccount){
        this.storePresentUser(userAccount.user)
        this.storeToken(userAccount.token)
      }
      else
        this.deleteUserAccount();
    })
  }
  deleteUserAccount(){
    console.log("deleting user..");
    this.deletePresentUser();
    this.deleteEndPoint();
    this.deleteToken();
  }
  
  // Set api end point
  setEndPoint(endPoint){
    if(endPoint != '')
      sessionStorage.setItem("EndPoint", endPoint);
  }
  getEndPoint(){
    return sessionStorage.getItem("EndPoint");
  }
  deleteEndPoint(){
    console.log("deleting endPoint..");
    sessionStorage.removeItem("EndPoint")
  }
}