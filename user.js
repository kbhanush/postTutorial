/**
 * Created by kbhanush on 11/11/2014.
 */


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/auth_demo');

var user = mongoose.Schema({username: String, password: String});

module.exports = mongoose.model('User', user);


