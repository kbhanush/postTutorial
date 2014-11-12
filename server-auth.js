/**
 * Created by kbhanush on 11/11/2014.
 */
var express = require('express');
var jwt = require('jwt-simple');
var app = express();
app.use(require('body-parser').json());
//var lodash = require('lodash')
var User = require('./user');

var secrectKey = 'supersecretkey';




/* Route for creating new user accounts & saving in mongodb

 */
app.post('/user', function(req,res) {

/* create hash using crypto */
    var crypto = require('crypto')
        , key = 'supersecretkey';

    var hash = crypto.createHmac('sha1', key).update(req.body.password).digest('hex');

    /*save username and hashed pw in mongo */

    var user = new User();
    user.username = req.body.username;
    user.password = hash;
    user.save(function (err) {
        if (err) { throw next(err)}
        res.sendStatus(201)
    })

});


/* user Login Route - look for username in database, if found check hashed pw, create token and return */

app.post('/login', function(req,res, next) {

 User.findOne({username: req.body.username}, function(err, user) {

     if (err) {return next(err)}
     if (!user) {return res.sendStatus(401)}

     var crypto = require('crypto');
     var key = 'supersecretkey';
     var hash = crypto.createHmac('sha1', key).update(req.body.password).digest('hex');
     if (hash === user.password) {
         var token = jwt.encode({username: req.body.username}, secrectKey);
         res.json({"token":token})
     }
        else {res.json({"serverMessage": "Invalid username or password!"})}

 })

});

/* Just to decode received username. Not used */

app.get('/user', function(req,res) {
    var token = res.headers('x-auth');
    var user = jwt.decode(token, secrectKey);
    res.json(user)
});

app.listen(3001);
console.log('server-auth running on port 3001');