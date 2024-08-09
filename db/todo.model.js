const mongoose = require('mongoose')
const { Schema } = require('mongoose') 

const todoModel = new Schema({
    todo: {
        type: String,
        require: true
    },
    completed: Boolean
})

module.exports = mongoose.model('todo', todoModel)