const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const base_url = process.env.BASE_URL || 'http://'+host+':'+port;
const publisher_port = process.env.PUBLISHER_PORT || 8888;
module.exports = {
  name : 'Composer-Playgorund',
  version : '0.0.1',
  env : process.env.NODE_ENV || 'development',
  port : process.env.PORT || port,
  host : host,
  base_url : base_url,
  mongo_url : process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/cpdb',
  secretKey : 'MY_SECRET_KEY',
  publisher_user_url : 'http://'+host+':'+publisher_port+'/api/v1/user/',
  google: {
    clientID: 'google_auth_client_id',
    clientSecret: 'google_auth_client_secret', 
    callbackURL: 'http://composer-playground.pramati.com:3000/auth/google/callback'
  },
  facebook: {
    clientID: 'facebook_auth_client_id',
    clientSecret: 'facebook_auth_client_secret',
    callbackURL: base_url+'/auth/facebook/callback'
  },
  twitter: {
    clientID: 'twitter_auth_client_id',
    clientSecret: 'twitter_auth_client_secret',
    callbackURL: base_url+'/auth/twitter/callback'
  },
  github: {
    clientID: 'github_auth_client_id',
    clientSecret: 'github_auth_client_secret',  
    callbackURL: base_url+'/auth/github/callback'
  }      
};
