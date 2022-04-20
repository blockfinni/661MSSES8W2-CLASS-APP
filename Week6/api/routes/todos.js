var express = require('express');
var router = express.Router();
var db = require("../Models")

//find
router.get('/', function(req, res){
    db.Todo.find()
        .then(function(todos){
            res.status(201).json(todos);
        })
        .catch(function(err){
            res.send(err);
    })
});

//create
router.post('/', function(req,res){
    db.Todo.create(req.body)
        .then(function (newTodo){
            res.json(newTodo);
        })
        .catch(function (err){
            res.send(err);
        })
});

//find by id
router.get('/:todoId',function (req,res){
    db.Todo.findById(req.params.todoId)
        .then(function(foundTodo){
            res.json(foundTodo)
        })
        .catch(function (err){
            res.send(err)
        })
})

//update
router.put('/:todoId', function (req,res){
    db.Todo.findOneAndUpdate({_id:req.params.todoId}, req.body, {new: true})
        .then(function (todo){
            res.json(todo);
        })
        .catch(function (err){
            res.send(err);
        })
})

//delete an item
router.delete('/:todoid', function(req, res){
    db.Todo.remove({_id: req.params.todoId})
        .then(function(){
            res.json({message: 'Deleted.'});
        })
        .catch(function (err){
           res.send(err);
    })
})


module.exports = router;