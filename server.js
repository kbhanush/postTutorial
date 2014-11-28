/**
 * Created by kbhanush on 11/3/2014.
 */

var Post = require('./backEnd/models/post');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', require('./backEnd/static'));
//var static= __dirname + '\public'
app.use(express.static(__dirname + '/frontEnd'));
app.use(express.static(__dirname + '/frontEnd/images'));
app.use(express.static(__dirname + '/frontEnd/views'));
//app.get('/', function(req,res){res.sendfile('index.html')});

//    app.listen(3000, function() {
//        console.log('Node Server running on port 3000', 3000)});

//------------------------------------------Server-Auth requires()

var jwt = require('jwt-simple');
var User = require('./backEnd/models/user');
var crypto = require('crypto');

//----------------------------------------------server-auth.js imported here------------------------------------------------


 //   ------------------------------------------------End server-auth.js -------------------------------------------------














//require('./static')(app);
var server = app.listen(process.env.PORT || 3000, function () {
    console.log('server listening on %d', server.address().port)
});
require('./websocket').connect(server);
require('./backEnd/api/sms')(app);
require('./backEnd/api/posts')(app);





