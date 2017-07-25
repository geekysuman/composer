module.exports = {
  name : 'Composer-Playgorund',
  version : '0.0.1',
  env : process.env.NODE_ENV || 'development',
  port : process.env.PORT || 3001,
  base_url : process.env.BASE_URL || 'http://localhost:3001',
  // lms_url : process.env.LMS_URL || 'http://localhost:8545',
  mongo_url : process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/cpdb',
  google: {
    clientID: 'google_auth_client_id',
    clientSecret: 'google_auth_client_secret',
    callbackURL: 'http://localhost:3001/auth/google/callback'
  }
};
