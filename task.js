const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    work: {
        type: String,
        required: true,
        minlength: 4

    },
    time: {
        type: String,
        required: true,
        minlength: 2
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;