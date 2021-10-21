const express = require('express')
const app=express()
const path=require('path')
const methodOverride= require('method-override')
const mongoose = require('mongoose');
const Task = require('./task');


mongoose.connect('mongodb://localhost:27017/taskManager', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

    
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.set('views',path.join(__dirname,'/views'))
app.use(express.static(path.join(__dirname,'/public')))

app.get('/',(req,res)=>{
    res.redirect('/task')
})


app.get('/task',async(req,res)=>{
    const task= await Task.find({})
    res.render('home.ejs',{task})
})
app.get('/task/new',(req,res)=>{
    res.render('new.ejs')
})
app.post('/task',async(req,res)=>{
    const newTask=new Task(req.body)
    await newTask.save()
    res.redirect('/task')
})

app.get('/task/:id/edit',async(req,res)=>{
    const {id}=req.params
    const foundtask=await Task.findById(id)
    res.render('edit.ejs',{foundtask})
})
app.put('/task/:id/',async(req,res)=>{
    const {id}=req.params 
    const foundtask=await Task.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    res.redirect('/task')
})

app.delete('/task/:id/',async (req,res)=>{
    const {id}=req.params
    const foundtask=await Task.findByIdAndDelete(id)
    res.redirect('/task')
})

app.listen(3000,()=>{
    console.log('On port 3000')
})