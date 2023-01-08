const jwt=require('jsonwebtoken');
const express=require('express');
const bcrypt=require('bcryptjs');
const router=express.Router();
const authenticate=require("../middleware/authenticate");
// var cookieParser = require('cookie-parser')
// router.use(cookieParser());

require('../db/conn');
const User=require("../model/userShema");

router.get('/',(req,res)=>{
    res.send(`hello world from the home router js`);
});

//asyn await method
router.post('/register', async (req, res)=>{

    const {name, email, phone, work, password, cpassword}=req.body;
    if(!name || !email|| !phone||!work||!password|| !cpassword){
        return res.status(422).json({ error: "Fill all the required fields."});
    }
     
    try{
        const userExist= await User.findOne({ email:email});
        if(userExist){
            return res.status(422).json({error: "Email already registered."});
        }
        else if(password!=cpassword){
            return res.status(422).json({error:"Password & Confirmation Password not matching"});
        }
        else{
            const user=new User({ name, email, phone, work, password, cpassword});
            //hashing thing here...
            const userRegister= await user.save();

            console.log(`${user.name} user Registered Successfully`);
            //console.log(userRegister);

            if(userRegister){
                res.status(201).json({message:"Registration Successful"});
            }else{
                res.status(500).json({error: "Registration Failed"});
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

router.post('/signin', async (req, res)=>{
    try{
        let token;
        const {email, password}=req.body;
        if(!email||!password){
            return res.status(400).json({error:"Fill the Credentials."})
        }

        const userLogin= await User.findOne({email:email});
        if(userLogin){
            const isMatch=await bcrypt.compare(password, userLogin.password); 

            
            // console.log(userLogin);
            if(!isMatch){
                res.status(400).json({error:"Invalid Credentials."});
            }else{
                //generate token and store cookie only after password match
                token= await userLogin.generateAuthToken();//jwt part
                console.log(token);
                console.log("Before Inside cookie//auth");

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now()+25892000000),
                    secure:false,
                    httpOnly:true
                });
                console.log("After Inside cookie//auth");
                res.json({message:"Login Successful from auth.js"});
                }  
        }
        else{
            res.status(400).json({error:"Missing Credentials."});
        }      

    }catch(err){
        console.log(err);
    }
});


router.get('/about',authenticate,(req,res)=>{
    console.log('Hello my About');
    res.send(req.rootUser);
});

//getting user data for contact us and home page
router.get('/getdata', authenticate, (req, res)=>{
    console.log('Hello my data');
    res.send(req.rootUser);
})

//contact us page
router.post('/contact',authenticate, async (req,res)=>{
    try {

        const { name, email, phone, message } = req.body;
        
        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "plzz filled the contact form " });
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({ message: "user Contact successfully" });

        }
        
    } catch (error) {
        console.log(error);
    }
});

//Attendance ka page
router.post('/attendance',authenticate, async (req,res)=>{
    console.log('Hello my Attendance');
    try {

        const { name, email, attendance } = req.body;
        
        if (!name || !email || !attendance) {
            console.log("error in attendance register");
            return res.json({ error: "plzz filled the attendance form " });
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            
            const userMessage = await userContact.addAttendance(name, email, attendance);

            await userContact.save();

            res.status(201).json({ message: "user Attendance successfull" });

        }
        
    } catch (error) {
        console.log(error);
    }
});

//logout ka page
router.get('/logout', (req, res) => {
    console.log(`Hello my Logout Page`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User logout');
});

//this method using promises
// router.post('/register',(req,res)=>{
//     const { name, email, phone, work, password, cpassword}=req.body;

//     if(!name|| !email|| !phone|| !work|| !password|| !cpassword)
//     {
//         return res.status(422).json({error:"Fill the required details."});
//     }

//     User.findOne({email: email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json( {error: "User already exists."});
//         }

//         const user=new User({name, email, phone, work, password, cpassword});

//         user.save().then(()=>{
//             res.status(201).json({message:"Registration Successful"});
//         }).catch((err)=>res.status(500).json({error:"Failed to Register"}));
//     }).catch(err=> {console.log(err);});
//     // console.log(req.body);
//     // console.log(name);
//     // console.log(email);
//     // res.json({message:req.body});
// });



module.exports=router;