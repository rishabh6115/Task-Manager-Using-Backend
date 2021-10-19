const express = require('express')
const app=express()
const path=require('path')
const methodOverride= require('method-override')
const { v4: uuid } = require('uuid');

let task=[
    {
        id:uuid(),
        work:'Water plants',
        time:'2pm'
    },
    {
        id:uuid(),
        work:'Study',
        time:'3pm'
    },
    {
        id:uuid(),
        work:'Dance Practice',
        time:'6pm'
    }


]





app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.set('views',path.join(__dirname,'/views'))
app.use(express.static(path.join(__dirname,'/public')))

app.get('/',(req,res)=>{
    res.redirect('/task')
})


app.get('/task',(req,res)=>{
    res.render('home.ejs',{task})
})
app.get('/task/new',(req,res)=>{
    res.render('new.ejs')
})
app.post('/task',(req,res)=>{
    const{work,time}=req.body
    task.push({work,time,id:uuid()})
    res.redirect('/task')
})

app.get('/task/:id/edit',(req,res)=>{
    const {id}=req.params
    const foundtask=task.find(c=>c.id===id)
    res.render('edit.ejs',{foundtask})
})
app.patch('/task/:id/',(req,res)=>{
    const {id}=req.params
    const foundtask=task.find(c=>c.id===id)
    const newtask=req.body.work
    const newtime=req.body.time
    foundtask.time=newtime
    foundtask.work=newtask
    res.redirect('/task')
})

app.delete('/task/:id/',(req,res)=>{
    const {id}=req.params
  task= task.filter(c=>c.id !== id)
   res.redirect('/task')
})

app.listen(3000,()=>{
    console.log('On port 3000')
})