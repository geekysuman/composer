const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const base_url = process.env.BASE_URL || 'http://'+host+':'+port;

module.exports = {
  name : 'Composer-Playgorund',
  version : '0.0.1',
  env : process.env.NODE_ENV || 'development',
  port : process.env.PORT || port,
  host : host,
  base_url : base_url,
  mongo_url : process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/cpdb',
  google: {
    clientID: 'google_auth_client_id',
    clientSecret: 'google_auth_client_secret', 
    callbackURL: base_url+'/auth/google/callback'
  }
};
