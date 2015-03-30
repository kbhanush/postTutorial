/**
 * Created by kbhanush on 11/24/2014.
 */

var Post = require('../models/post');
var twilio = require('twilio');
var websocket = require('../../websocket')

module.exports = function(app) {
    app.post('/api/posts/sms', function (req, res) {
            // if (twilio.validateExpressRequest(req, 'e57ce77ccf4d2d49fbe053dc161c1430')) {

            // var restClient = new twilio.RestClient('ACfe1d55aa2594ce1f83317305800d1c98', 'e57ce77ccf4d2d49fbe053dc161c1430')
            client = twilio('ACfe1d55aa2594ce1f83317305800d1c98', 'e57ce77ccf4d2d49fbe053dc161c1430');


            // var resp = new twilio.TwimlResponse();
            // if (req.body.Body.trim().toLowerCase() === 'jai mataji') {

            var fromNumber = req.body.From;
            var smsMessage = req.body.Body.trim();
            if (req.body.From.trim() === '+19254879949') {

                client.sendMessage({ to: '19254879949', from: '19253041391', body: 'Raj, you are so smart!' }, function (err, data) {
                })

            }

            // resp.message('Hi, Thanks for posting!!');
            //}

            client.sendMessage({ to: '19258950395', from: '19253041391', body: 'Msg recd!' }, function (err, data) {
            });


            var post = new Post({
                username: fromNumber,
                body: smsMessage
            });
            post.save(function (err, post) {
                if (err) {
                    return next(err)
                }
                websocket.broadcast('new_post', post)
                //res.json(201, post)
            });

//        var resp = new twilio.TwimlResponse();
//        resp.message('Thanks for posting!');
//        res.writeHead(200, {
//            'Content-Type':'text/xml'
//        });
//        res.end(resp.toString());

            //   }
        }
    )
}