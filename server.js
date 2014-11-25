/**
 * Created by kbhanush on 11/3/2014.
 */

var Post = require('./models/post');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/', function(req,res){res.sendfile('post.html')});

//    app.listen(3000, function() {
//        console.log('Node Server running on port 3000', 3000)});



var server = app.listen(process.env.PORT || 3000, function () {
    console.log('server listening on %d', server.address().port)
});
require('./websocket').connect(server);
require('./controllers/api/sms')(app);
require('./controllers/api/posts')(app);





