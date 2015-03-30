/**
 * Created by kbhanush on 11/13/2014.
 */

/* router is express middleware...here we create an instance of router and tell it to serve static html from /assets folder */

var express = require('express')
var router = express.Router()
router.get('/', function (req, res) {
    res.sendFile('/nodejs/Projects/fromScratch/frontEnd/index.html')
})

module.exports = router

//module.exports = function(app) {
//    app.get('/', function (req, res) {
//        res.sendfile('index.html')
//    })
//}
