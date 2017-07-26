// import { web3, lms } from '../helpers/web3.helper'
// import request from 'request'
// import config from '../config'
import User from '../models/user.model'
// import LMSKeyMap from '../models/lms-key-map.model'
// import { getRandomNumber } from '../helpers/function.helper'

export class AuthController {
    findOrCreateUser (profile, done) {
        User.findOne({ oauthID: profile.id }, function(err, user) {
            if(err) {
                console.log(err);  // handle errors!
            }
            if (!err && user !== null) {
                done(null, user);
            } else {
                user = new User({
                    oauthID: profile.id,
                    name: profile.displayName,
                    email: profile.email,
                    created: Date.now()
                });
                user.save(function(err) {
                    if(err) {
                        console.log(err);  // handle errors!
                    } else {
                        console.log("saving user ...");
                        done(null, user);
                    }
                });
            }
        });
    }
}