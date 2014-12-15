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
app.use(express.static(__dirname + '/frontEnd/css'));
app.use(express.static(__dirname + '/frontEnd/images'));
app.use(express.static(__dirname + '/frontEnd/views'));
//app.get('/', function(req,res){res.sendfile('index.html')});

//    app.listen(3000, function() {
//        console.log('Node Server running on port 3000', 3000)});

//------------------------------------------Server-Auth requires()

var jwt = require('jwt-simple');
var User = require('./backEnd/models/user');
var crypto = require('crypto');
var secrectKey = 'supersecretkey';

//----------------------------------------------server-auth.js imported here------------------------------------------------
app.post('/register', function(req,res) {

    /* create hash using crypto */
    var crypto = require('crypto')
        , key = 'supersecretkey';

    var hash = crypto.createHmac('sha1', key).update(req.body.password).digest('hex');

    /*save username and hashed pw in mongo */

    var user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.cellphone = req.body.cellphone;
    user.username = req.body.username;
    user.password = hash;
    user.save(function (err) {
        if (err) { throw next(err)}
        res.sendStatus(201)
    })

});

app.post('/login', function(req,res, next) {

    User.findOne({username: req.body.username}, function(err, user) {

        if (err) {return next(err)}
        if (!user) {return res.sendStatus(401)}

        var crypto = require('crypto');
        var key = 'supersecretkey';
        var hash = crypto.createHmac('sha1', key).update(req.body.password).digest('hex');
        if (hash === user.password) {
            var token = jwt.encode({username: req.body.username}, secrectKey);
            res.json({"username":user.username, "token":token})
        }
        else {res.json({"serverMessage": "Invalid username or password!"})}

    })

});

 //   ------------------------------------------------End server-auth.js -------------------------------------------------





//require('./static')(app);
var server = app.listen(process.env.PORT || 3000, function () {
    console.log('server listening on %d', server.address().port)
});
require('./websocket').connect(server);
require('./backEnd/api/sms')(app);
require('./backEnd/api/posts')(app);





