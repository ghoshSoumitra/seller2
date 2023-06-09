const express=require('express');
const app=express();
const port=3000;
const db= require('./config/mongoose')


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


// app.get('/',(req,res)=>{
//     res.send("Hello Soumitra")
// })
app.get('/signup',(req,res)=>{
    res.render('Sign-up')
})
app.get('/',(req,res)=>{
    res.render('login')
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})
app.get('/inventory',(req,res)=>{
    res.render('inventory')
})


app.use('/', require('./routes/routes'));
app.listen(port,(req,res)=>{
    console.log("port is running on",port);
})