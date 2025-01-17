const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TaskManagerModel = require('./Models/TaskManager');

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://syedarhamasad2000:arham123@cluster0.a3y2z.mongodb.net/')

app.get('/get', (req, res) => {

    TaskManagerModel.find()
    .then(result => res.json(result))
    .catch(error => res.json(error))
});

app.post('/add', (req, res) => {

    const task = req.body.task;

    TaskManagerModel.create({
        task: task,
    }).then(result => res.json(result))
    .catch(error => res.json(error))
});

app.put('/update/:id', (req, res) => {

    const {id} = req.params;
    const {task} = req.body;
    TaskManagerModel.findByIdAndUpdate(id, {task}, {done: true})
    .then(result => res.json(result))
    .catch(error => console.log(error))
});

app.delete('/delete/:id', (req, res) => {

    const {id} = req.params;
    TaskManagerModel.findByIdAndDelete({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(error => console.log(error))
});

app.listen(3001, () => {
    console.log('Server is Running');
    console.log('MongoDB is Connected');
});
