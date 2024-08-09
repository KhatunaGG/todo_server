const express = require('express')
const app = express()
const dbConnect = require('./db/db')
const todoModel = require('./db/todo.model')
const cors = require('cors')

dbConnect()

app.use(express.json())
app.use(cors())


app.get('/todo', async (req, res) => {
    const { filterKeyword } = req.query;
    try {
        let todoes;
        if (filterKeyword) {
            if (filterKeyword === 'active') {
                todoes = await todoModel.find({ completed: false });
            } else if (filterKeyword === 'completed') {
                todoes = await todoModel.find({ completed: true });
            } else if (filterKeyword === 'all') {
                todoes = await todoModel.find({});
            }
        } else {
            todoes = await todoModel.find({});
        }
        res.json(todoes);
    } catch (err) {
        console.error(err);
    }
});


app.post('/todo', async (req, res) => {
    try {
        const { todo, completed } = req.body
        if (!todo) return res.json('Todo is required')
        const newTodo = await todoModel.create({ todo, completed })
        res.json(newTodo)
    } catch (err) {
        console.log(err)
    }
})


app.delete('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!id) throw new Error('Not found')
        const deletedTodo = await todoModel.findByIdAndDelete(id)
        res.json(deletedTodo)
    } catch (err) {
        console.log(err)
    }
})


app.delete('/todo', async (req, res) => {
    try {
        await todoModel.deleteMany({ completed: true });
        res.status(200).json('Completed todos deleted');
    } catch (err) {
        console.log(err);
    }
});


app.put('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!id) throw new Error('Not found')
        const { completed } = req.body
        const updatedTodo = await todoModel.findByIdAndUpdate(id, { completed }, { new: true })
        res.json(updatedTodo)
    } catch (err) {
        console.log(err)
    }
})



app.listen(3003, () => {
    console.log('Server is running on port https://todo-app-front-back.onrender.com')
})