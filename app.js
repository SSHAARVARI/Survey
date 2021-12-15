const express=require('express');
const path=require('path')
const app=express();
const mysql=require('mysql');
// const { Agent } = require('http');

// app.use(express.static('client'))
// app.use(express.urlencoded({extended:false}));
// app.use(express.json());

// app.get('/',(req,res)=>{
    
//     res.sendFile(path.join(__dirname,'client/index.html'))
    
// })

// app.post('/auth',(req,res)=>{
//     console.log(req.body);
//     console.log(req.ip);
//     console.log( req.headers['user-agent']);
//     res.send({'status':200})
// })

app.get('/',(req,res)=>{
    res.send("ITs working");
})

app.listen(80,console.log("Running on 3131"))