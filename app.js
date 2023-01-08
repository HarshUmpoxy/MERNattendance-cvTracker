const dotenv=require('dotenv');
// const mongoose=require('mongoose');
const express =require('express');
const cors=require('cors');
const cookieParser = require('cookie-parser');

const app=express();
app.use(cors());
app.use(cookieParser());


dotenv.config({path:'./config.env'});
require('./db/conn');
//const user=require('./model/userShema');
app.use(express.json());

// app.use(express.json({ limit: 2 }));

app.use(require('./router/auth'));

const PORT=process.env.PORT || 5000;


//to check that login is done before user requesting about page, invalid demand..//
// const middleware=(req, res, next)=>{
//     console.log(`Hello my Middleware`);
//     next();
// };


app.get('/',(req,res)=>{
    res.send(`hello world from the home app js`);
});

// app.get('/about',(req,res)=>{
//     res.send(`hello world from the about`);
// });

// app.get('/contact',(req,res)=>{
//     res.send(`hello world from the contact`);
// });

app.get('/signin',(req,res)=>{
    res.send(`hello world from the login`);
});

app.get('/signup',(req,res)=>{
    res.send(`hello world from the signup`);
});
// app.get('/attendance',(req,res)=>{
//     res.send(`hello world from the attendance`);
// });
//heroku step 3
if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
    const path=require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})
console.log(`Hello console, updated`);

