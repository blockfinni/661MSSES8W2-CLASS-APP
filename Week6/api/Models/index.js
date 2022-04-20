var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/week6api');

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");