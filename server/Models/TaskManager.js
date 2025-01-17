const mongoose = require('mongoose');

const TaskManagerSchema = new mongoose.Schema({
    task:String,
    done: {
        type: Boolean,
        default: false
    }
});

const TaskManagerModel = mongoose.model("Tasks", TaskManagerSchema);
module.exports = TaskManagerModel;