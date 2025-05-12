const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const TodoModel = require('./Models/Todo')

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.REACT_APP_BACKEND_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.post('/add',(req,res)=>{
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})
app.get('/get', (req,res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findById(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.done = !todo.done;
    const updatedTodo = await todo.save();

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully', todo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3100,() => {
    console.log('Server is Running');
})