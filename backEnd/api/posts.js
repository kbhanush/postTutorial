

var Post = require('../models/post');
var websocket = require('../../websocket')

module.exports = function(app) {
    app.get('/api/posts', function (req, res, next) {

//    Post.find()
//        .sort('-date')
//        .exec(function(err,posts) {
//            if (err) {return next(err)}
//                res.json(posts)
//        })
//})

        Post.find(function (err, posts) {
            if (err) {
                return next(err)
            }
            res.json(posts)
        })
    });



    app.post('/api/posts', function (req, res, next) {
        var post = new Post({
            username: req.body.username,
            body: req.body.body
        });
        post.save(function (err, post) {
            if (err) {
                return next(err)
            }

            websocket.broadcast('new_post', post)
            res.status(201).json(post)


        })

    })

}