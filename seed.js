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
 
    const seedProducts=[
        {
            work:'Water plants',
            time:'2pm'
        },
        {
            work:'Study',
            time:'3pm'
        },
        {
            work:'Dance Practice',
            time:'6pm'
        }
    ]
    const ins=async()=>{
    await Task.deleteMany({})
    await Task.insertMany(seedProducts)
    mongoose.connection.close();
    }
    ins();
    // .then(r=>console.log(r))
    // .catch(e=>console.log(e))