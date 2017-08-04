var rp = require('request-promise');
import config from '../config'

export class HashHelper {
    getHashId(user,callback){
        console.log('user in hashHelper', user);
        var options = {
            method: 'GET',
            uri: config.publisher_user_url+'?email='+user.email,
            json: true // Automatically stringifies the body to JSON 
        };
        rp(options)
        .then(function (result) {
            // Process html...
            console.log("result", result);
            if(result.length)
                callback(result[0].id);
            else 
                callback(false);
        })
        .catch(function (err) {
            // Crawling failed... 
            console.log(err);
        });
    }
    createHashId(user,callback){
        var options = {
            method: 'POST',
            uri: config.publisher_user_url,
            body: {
            "is_active": true,
            "first_name": user.name,
            "email": user.email
            },
            json: true // Automatically stringifies the body to JSON 
        };
        rp(options)
        .then(function (result) {
            // Process html...
            console.log('after create hash', result);
            if(result)
                callback(result.id);
            else 
                callback(false);
        })
        .catch(function (err) {
            // Crawling failed... 
            console.log("errror in create hash id",err);
            callback(false);
        });
    }
}