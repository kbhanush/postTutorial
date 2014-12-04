/**
 * Created by kbhanush on 11/11/2014.
 */

//var db = require('../db');
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/auth_demo');
//
//var user = mongoose.Schema({username: String, password: String});
//
//module.exports = mongoose.model('User', user);


var db = require('../db');
var user = db.model('user', {
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        cellphone: {type: Number, require: false},
        username: {type: String, required: true },
        password: {type: String, required: true}


    }

);
module.exports = user;