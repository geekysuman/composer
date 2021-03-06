import User from '../models/user.model';
import ensureAuthenticated from '../helpers/user.auth';
import config from '../config.js';
import { PlaygroundController } from '../controllers/playground-api.controller';
const PCtrl = new PlaygroundController();

const UserAuthRoute = (app, passport, jwt) => {

    app.get('/usernotfound/', function (req, res) {
        res.json({ 
            title: "Social Authentication",
            auth_status: false
            // status: req.session.passport ? req.session.passport.user || 'Logged out' : 'Not logged in'
         });
    });

    app.get('/account', ensureAuthenticated, function (req, res) {
        User.findById(req.session.passport.user, function (err, user) {
            if (err) {
                console.log(err);  // handle errors
            } else {
                res.json({ 
                    profileObj: user,
                    auth_status: true,
                    token: jwt.sign(user.email, config.secretKey)
                });
            }
        });
    });

    app.get('/verifyToken/:token', function (req, res) {
        console.log('token', req.params.token);
        jwt.verify(req.params.token, config.secretKey, function(err, data){
            if(err){
                res.json({
                    status: false
                });
            } else {
                   res.json({
                      email : data,
                      status : true
                   });
            }
        });
    });

    app.get('/auth/google',
        passport.authenticate('google', {
            scope: [
                'profile',
                'email'
            ]
        }
        ));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        function (req, res) {            
            res.redirect('/playground/editor');
        });

    app.get('/auth/facebook',
        passport.authenticate('facebook', {
            scope: [
                'profile',
                'email'
            ]
        }
        ));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/playground/editor');
        });

    app.get('/auth/twitter',
        passport.authenticate('twitter', {
            scope: [
                'profile',
                'email'
            ]
        }
        ));

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/playground/editor');
        });

    app.get('/auth/github',
        passport.authenticate('github', {
            scope: [ 'user:email' ]
        }
        ));

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/playground/editor');
        });

    app.get('/logout', function (req, res) {
        req.logout();
        /* res.json({
            status: true
        }) */
        res.redirect('/playground/editor');
    });
    
    // Api to import .bna file
    app.get('/api/downloadbna', PCtrl.downloadBna);

}

export default UserAuthRoute;