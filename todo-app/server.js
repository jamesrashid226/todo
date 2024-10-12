const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
mongoose.connect('mongodb://localhost:27017/todo');
const taskSchema = new mongoose.Schema({
    task: String,

})
const Task = mongoose.model('Task', taskSchema);

app.use(cors())
app.use(bodyParser.json())

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
})

app.post('/tasks', async (req, res) => {
    const newTask = new Task({ task:req.body.task})
    await newTask.save();
    res.json(newTask);
})

app.listen(PORT, () => {
    console.log(`server opened at http://localport:${PORT}`);
})