var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var WorkersRouter = express.Router();
var Workers = require('../models/workers');

WorkersRouter.use(bodyParser.json());

WorkersRouter.route('/')
.get(function (req, res, next) {
    var projection = {updateAt: 0}
    Workers.find({}, projection, function (err, worker) {
        if (err) throw err;
        res.json(worker);
    });
})
.post(function (req, res, next) {
    Workers.create(req.body, function (err, worker) {
        if (err) throw err;
        console.log('Worker added!');
        res.end('Added a new worker' + worker);
    });
});

WorkersRouter.route('/:workerId')
.put(function (req, res, next) {
    console.log(req.body);
    Workers.findByIdAndUpdate(req.params.workerId, {
        $set: req.body
    }, {
        new: true
    }, function (err, worker) {
        if (err) throw err;
        console.log("Worker changed");
        res.json(worker);
    });
})

.delete(function (req, res, next) {
    Workers.findByIdAndRemove(req.params.workerId, function (err, resp) {        
        if (err) throw err;
        console.log("Worker deleted");
        res.json(resp);
    });
});


module.exports = WorkersRouter;
