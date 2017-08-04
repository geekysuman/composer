import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GitHubStrategy } from 'passport-github2';
import config from '../config'
import User from '../models/user.model';
import { AuthController } from '../controllers/auth.controller';

const AuthCtrl = new AuthController();

const passportStrategy = (passport) => {
    // serialize and deserialize
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user){
            if(!err) done(null, user);
            else done(err, null);
        });
    });
    passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
        },
        function(request, accessToken, refreshToken, profile, done) {
            AuthCtrl.findOrCreateUser(profile, done);
        }
    ));
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
        },
        function(request, accessToken, refreshToken, profile, done) {
            AuthCtrl.findOrCreateUser(profile, done);
        }
    )); 
    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.clientID,
        consumerSecret: config.twitter.clientSecret,
        callbackURL: config.twitter.callbackURL
        },
        function(request, accessToken, refreshToken, profile, done) {
            AuthCtrl.findOrCreateUser(profile, done);
        }
    ));        
    passport.use(new GitHubStrategy({
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL
        },
        function(request, accessToken, refreshToken, profile, done) {
            console.log("Github Profile", profile)
            // AuthCtrl.findOrCreateUser(profile, done);
        }
    ));            
}

export default passportStrategy