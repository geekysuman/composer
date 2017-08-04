// import { web3, lms } from '../helpers/web3.helper'
// import request from 'request'
// import config from '../config'
import User from '../models/user.model'
// import LMSKeyMap from '../models/lms-key-map.model'
import { HashHelper } from '../helpers/hash.helper'
let hash = new HashHelper();

export class AuthController {
    findOrCreateUser (profile, done) {
        User.findOne({ oauthID: profile.id }, function(err, user) {
            if(err) {
                console.log(err);  // handle errors!
            }
            if (!err && user !== null) {
                // console.log('user in controller ', user);
                if(!user.hashId){
                     hash.getHashId(user,function(hashId){
                        if(!hashId){
                            hash.createHashId(user,function(newHashId){
                                if(newHashId){
                                    user.hashId = newHashId
                                    user.save(function(err) {
                                        if(err) {
                                            console.log(err);  // handle errors!
                                        } else {
                                            console.log("saving user hashId ...");
                                            done(null, user);
                                        }
                                    })
                                }else{
                                    done(null,false);
                                }
                            })
                        }else{
                            console.log('old hash id', hashId);
                            user.hashId = hashId
                            user.save(function(err) {
                                if(err) {
                                    console.log(err);  // handle errors!
                                } else {
                                    console.log("saving user hashId ...");
                                    done(null, user);
                                }
                            })
                            done(null, user);
                        }
                    }) 
                }else{
                    done(null, user);
                } 
                done(null, user);
            } else {
                user = new User({
                    oauthID: profile.id,
                    name: profile.displayName,
                    email: profile.email,
                    created: Date.now()
                });
                hash.getHashId(user,function(hashId){
                    if(!hashId){
                        hash.createHashId(user,function(newHashId){
                            if(newHashId){
                                user.hashId = newHashId
                                user.save(function(err) {
                                    if(err) {
                                        console.log(err);  // handle errors!
                                    } else {
                                        console.log("saving user hashId ...");
                                        done(null, user);
                                    }
                                })
                            }else{
                                done(null,false);
                            }
                        })
                    }else{
                        console.log('old hash id', hashId);
                        user.hashId = hashId
                        user.save(function(err) {
                            if(err) {
                                console.log(err);  // handle errors!
                            } else {
                                console.log("saving user with hashId ...");
                                done(null, user);
                            }
                        })
                        done(null, user);
                    }
                })
                /* user.save(function(err) {
                    if(err) {
                        console.log(err);  // handle errors!
                    } else {
                        console.log("saving user ...");
                        done(null, user);
                    }
                }); */
            }
        });
    }
    /* hasHashId(user){
        if(user.hashId != '')
            return true;
        return false
    } */
}