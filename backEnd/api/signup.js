/**
 * Created by kbhanush on 11/28/2014.
 */

var express = require('express');
var jwt = require('jwt-simple');
var app = express();
app.use(require('body-parser').json());
//var lodash = require('lodash')
var User = require('../models/user');

var secrectKey = 'supersecretkey';

module.exports = function(app) {
    app.post('/signup', function (req, res) {

        /* create hash using crypto */
        var crypto = require('crypto')
            , key = 'supersecretkey';

        var hash = crypto.createHmac('sha1', key).update(req.body.password).digest('hex');

        /*save username and hashed pw in mongo */

        var user = new User();
        user.username = req.body.username;
        user.password = hash;
        user.save(function (err) {
            if (err) {
                throw next(err)
            }
            res.sendStatus(201)
        })

    })
};