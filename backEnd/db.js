/**
 * Created by kbhanush on 11/6/2014.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/social', function () {
    console.log('Connected to Mongo')
});
module.exports = mongoose;