var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true,
    },
    fatherName:{
        type: String,
    },
    comeTime: {
        type: String,
    },
    goTime: {
        type: String
    },
    gender:{
        type: String
    },
    male:{
        type: String,
        require: true
    }
}, {
    timestamps: true
});
var Workers = mongoose.model('Worker', workerSchema);

module.exports = Workers;