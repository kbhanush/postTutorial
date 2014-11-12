/**
 * Created by kbhanush on 11/3/2014.
 */

var Post = require('./models/post');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var twilio = require('twilio');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/posts', function (req, res, next) {

//    Post.find()
//        .sort('-date')
//        .exec(function(err,posts) {
//            if (err) {return next(err)}
//                res.json(posts)
//        })
//})

    Post.find(function(err,posts) {
    if (err) {return next(err)}
            res.json(posts)
    })});



app.post('/api/posts/sms', function(req, res) {
   // if (twilio.validateExpressRequest(req, 'e57ce77ccf4d2d49fbe053dc161c1430')) {

       // var restClient = new twilio.RestClient('ACfe1d55aa2594ce1f83317305800d1c98', 'e57ce77ccf4d2d49fbe053dc161c1430')
        client = twilio('ACfe1d55aa2594ce1f83317305800d1c98', 'e57ce77ccf4d2d49fbe053dc161c1430');
        var resp = new twilio.TwimlResponse();
       // if (req.body.Body.trim().toLowerCase() === 'jai mataji') {

            var fromNumber = req.body.From;
            var smsMessage = req.body.Body.trim();
            if ( req.body.From.trim() ==='+19254879949') {

                client.sendMessage( { to:'19254879949', from:'19253041391', body:'Raj, you are so smart!' }, function( err, data ) {})

            }

           resp.message('Hi, Thanks for posting!!');
        //}

    client.sendMessage( { to:'19258950395', from:'19253041391', body:'Raj, you are so smart!' }, function( err, data ) {});


        var post = new Post({
            username: fromNumber,
            body: smsMessage
        });
        post.save(function (err, post) {
            if (err) {
                return next(err)
            }
            res.json(201, post)
        });

//        var resp = new twilio.TwimlResponse();
//        resp.message('Thanks for posting!');
//        res.writeHead(200, {
//            'Content-Type':'text/xml'
//        });
//        res.end(resp.toString());

        //   }
    }
);

//


    app.post('/api/posts', function (req, res, next) {
        var post = new Post({
            username: req.body.username,
            body: req.body.body
        });
        post.save(function (err, post) {
            if (err) { return next(err) }
            res.json(201, post)
        })
    });

app.get('/', function(req,res){res.sendfile('index.html')});

    app.listen(3000, function() {
        console.log('Node Server running on port 3000', 3000)});






