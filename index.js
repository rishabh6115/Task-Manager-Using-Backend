const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const Task = require('./task');
const appError = require('./Errors/appError')
const wrapAsync = require('./Errors/wrapAsync')



mongoose.connect('mongodb://localhost:27017/taskManager', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
    res.redirect('/task')
})


app.get('/task', wrapAsync(async (req, res, next) => {
    const task = await Task.find({})
    res.render('home.ejs', { task })
}))


app.get('/task/new', (req, res) => {

    res.render('new.ejs')
})
app.post('/task', wrapAsync(async (req, res, next) => {

    const newTask = new Task(req.body)
    await newTask.save()
    res.redirect('/task')

}))

app.get('/task/:id/edit', wrapAsync(async (req, res) => {

    const { id } = req.params
    const foundtask = await Task.findById(id)
    res.render('edit.ejs', { foundtask })

}))
app.put('/task/:id/', wrapAsync(async (req, res) => {
    const { id } = req.params
    await Task.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect('/task')
}))

app.delete('/task/:id/', wrapAsync(async (req, res) => {
    const { id } = req.params
    await Task.findByIdAndDelete(id)
    res.redirect('/task')
}))


app.all('*', (req, res, next) => {
    throw new appError('Page not Found', 404)
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;

    res.status(status).render('error', { message })
})


app.listen(4000, () => {
    console.log('On port 4000')
})