var mongoose = require('mongoose');

var todoDB = new mongoose.Schema({
    name:{
        type: String,
        required: 'Cannot be Blank!'
    },
    completed:{
        type: Boolean,
        default: false
    },
    created_date:{
        type: Date,
        default: Date.now
    }
});

var Todo = mongoose.model('Todo', todoDB);

module.exports = Todo;